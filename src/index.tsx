import { Hono } from 'hono'
import { v4 } from "uuid"
import { z } from "zod"
import { PageLayout } from './pages/page-layout';
import { ContactsPage } from './pages/contacts/contacts-page';
import { NewContactPage } from './pages/contacts/new-contact/new-contact-page';

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

app.use(async (c, next) => {
  c.setRenderer((content) => {
    return c.html(<PageLayout>{content}</PageLayout>)
  })
  await next()
})

const contacts: Contact[] = [
  {
    id: v4(),
    firstName: "Javier",
    lastName: "Garcia",
    phone: "637856919",
    email: "javi46018@gmail.com",
  },
]

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

app.post("/contacts/new", async (c) => {
  const formData = await c.req.formData()

  const firstName = formData.get("first-name")?.valueOf()
  const lastName = formData.get("last-name")?.valueOf()
  const phone = formData.get("phone")?.valueOf()
  const email = formData.get("email")?.valueOf()

  console.log(formData)

  const newContact = contactSchema.safeParse({
    id: v4(),
    firstName,
    lastName,
    phone,
    email,
  })

  if (newContact.error?.issues.length) {
    // TODO: Pass form data back to the page to better UX
    return c.render(<NewContactPage errors={newContact.error?.issues.map(issue => issue.message)} />)
  }

  contacts.push(newContact.data!)

  return c.redirect("/contacts")
})

app.get("/contacts/:contactId", (c) => {
  return c.render("Page por seeing the contact details")
})

app.get("/contacts/:contactId/edit", (c) => {
  return c.render("Page for editing existing contact")
})

export default app
