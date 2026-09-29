import { Contact } from "../.."
import { Button, Input } from "../../components"
import { buttonVariants } from "../../components/button"
import { ContactArticle } from "./components/contact-article"
import { cn } from "../../lib/utils";
import { ContactsList } from "../../components/contacts-list";

interface ContactsPageProps {
  contacts: Contact[]
  currentSearch?: string
}


export function ContactsPage({ contacts = [], currentSearch }: ContactsPageProps) {
  return (
    <>
      <form hx-get="/contacts/list" hx-target="#contacts-list">
        <div class="flex gap-4 items-end">
          <Input
            id="search-contact"
            name="q"
            type="search"
            placeholder="Search by..."
            value={currentSearch}
            label="Find a Contact"
          />
          <Button type="submit">Search</Button>
        </div >
      </form >
      <div class="h-4 " />
      <section>
        <div class="bg-white w-full p-8 rounded-md flex flex-col gap-3 items-end">
          <div class="flex justify-between w-full items-center">
            <h2 class="text-lg font-semibold">Contacts</h2>
            <a href="contacts/new" class={cn(buttonVariants({ variant: "secondary" }))}>Add Contact</a>
          </div>
          <div id="contacts-list" class="w-full">
            <ContactsList contacts={contacts} />
          </div>
        </div>
      </section >
    </>
  )
}
