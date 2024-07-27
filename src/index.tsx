import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { v4 } from "uuid"
import { z } from "zod"
import { PageLayout } from './pages/page-layout';
import { ContactsPage } from './pages/contacts/contacts-page';
import { NewContactPage } from './pages/contacts/new-contact/new-contact-page';
import { ViewContact } from './pages/contacts/view-contact/view-contact';
import { EditContactPage } from './pages/contacts/edit-contact/edit-contact';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const contactSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  email: z.string().email(),
})

export type Contact = z.infer<typeof contactSchema>

const app = new Hono()

const contacts: Contact[] = [
  {
    id: v4(),
    firstName: "Javier",
    lastName: "Garcia",
    phone: "637856919",
    email: "javi46018@gmail.com",
  },
]

app.use(async (c, next) => {
  c.setRenderer((content) => {
    return c.html(<PageLayout>{content}</PageLayout>)
  })
  await next()
})

app.use("/styles/*", serveStatic({ root: "./public" }))

app.get("/", (c) => {
  return c.redirect("/contacts")
})

function findBySearchString(c: Contact, searchBy: string): boolean {
  const meetCondition = c.firstName.includes(searchBy) || c.lastName.includes(searchBy)

  return meetCondition
}

app.get("/contacts", (c) => {
  const searchBy = c.req.query("q")

  let filteredContacts: Contact[] = [...contacts];

  if (searchBy) {
    filteredContacts = contacts.filter(c => findBySearchString(c, searchBy))
  }

  console.log("filtered contacts: ", filteredContacts)

  return c.render(<ContactsPage contacts={filteredContacts} currentSearch={searchBy} />)
})

app.get("/contacts/new", (c) => {
  const firstName = c.req.query("first-name")
  const lastName = c.req.query("last-name")
  const phone = c.req.query("phone")
  const email = c.req.query("email")

  return c.render(
    <NewContactPage
      firstName={firstName}
      lastName={lastName}
      phone={phone}
      email={email}
    />
  )
})

function extractContactDataFromFormData(formData: FormData) {
  const firstName = formData.get("first-name")?.valueOf() as string | undefined
  const lastName = formData.get("last-name")?.valueOf() as string | undefined
  const phone = formData.get("phone")?.valueOf() as string | undefined
  const email = formData.get("email")?.valueOf() as string | undefined

  return { firstName, lastName, phone, email }
}

function validateContact({ id, firstName, lastName, phone, email }: { id: string, firstName?: string, lastName?: string, phone?: string, email?: string }) {
  const newContact = contactSchema.safeParse({
    id,
    firstName,
    lastName,
    phone,
    email,
  })

  return newContact
}

function isError(x: ReturnType<typeof validateContact>) {
  return x.error?.issues.length
}

app.post("/contacts/new", async (c) => {
  const formData = await c.req.formData()
  const contact = extractContactDataFromFormData(formData)
  const newContact = validateContact({ ...contact, id: v4() })

  if (isError(newContact)) {
    // Extract the issues and form data to pass back to the page
    const errors = newContact.error!.issues.map(({ message, path }) => ({
      message,
      field: path.join("."),
    }));

    const { firstName, lastName, phone, email } = contact

    const formData = {
      firstName,
      lastName,
      phone,
      email,
    };

    return c.render(
      <NewContactPage
        errors={errors}
        {...formData}
      />
    );
  }

  contacts.push(newContact.data!);

  return c.redirect("/contacts");
})

app.get("/contacts/:contactId", (c) => {
  const contactId = c.req.param("contactId")
  console.log("On edit contacts page iwth contact id : ", contactId)

  const contact = contacts.find(c => c.id === contactId)
  console.log("contact", contact)

  if (!contact) {
    return c.render(<div>Contact not found</div>)
  }

  return c.render(
    <ViewContact contactId={contactId} contact={contact} />
  )
})

app.get("/contacts/:contactId/edit", (c) => {
  const contact = contacts.find(contact => contact.id === c.req.param("contactId"))

  if (!contact) {
    return c.render(<div>Contact not found</div>)
  }

  return c.render(<EditContactPage contact={contact} />)
})

app.post("/contacts/:contactId/edit", async (c) => {
  const contact = contacts.find(contact => contact.id === c.req.param("contactId"))
  const formData = await c.req.formData()
  const _contact = extractContactDataFromFormData(formData)

  if (!contact) {
    return c.render(<div>Contact not found</div>)
  }

  const newContact = validateContact({ ..._contact, id: contact.id })

  if (isError(newContact)) {
    // Extract the issues and form data to pass back to the page
    const errors = newContact.error!.issues.map(({ message, path }) => ({
      message,
      field: path.join("."),
    }));

    const props = {
      ..._contact,
      id: contact.id,
    }

    return c.render(
      <EditContactPage
        errors={errors}
        contact={props}
      />
    );
  }

  const index = contacts.findIndex(c => c.id === contact.id)
  contacts[index] = newContact.data!

  return c.redirect(`/contacts/${contact.id.trim()}`)
})

app.post("/contacts/:contactId/delete", (c) => {
  const contactId = c.req.param("contactId")
  const index = contacts.findIndex(c => c.id === contactId)

  if (index === -1) {
    return c.render(<div>Contact not found</div>)
  }

  contacts.splice(index, 1)

  return c.redirect("/contacts")
})

export default app
