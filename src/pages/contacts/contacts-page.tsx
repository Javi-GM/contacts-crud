import { Contact } from "../.."
import { Button, Input } from "../../components"
import { buttonVariants } from "../../components/button"
import { ContactArticle } from "./components/contact-article"
import { cn } from "../../lib/utils";

interface ContactsPageProps {
  contacts: Contact[]
  currentSearch?: string
}

function TH({ children }: { children?: string | any }) {
  return <th class="border border-slate-300 font-medium">{children}</th>
}

export function ContactsPage({ contacts = [], currentSearch }: ContactsPageProps) {
  return (
    <>
      <form>
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
        </div>
      </form>
      <div class="h-4 " />
      <section>
        <div class="bg-white w-full p-8 rounded-md flex flex-col gap-3 items-end">
          <div class="flex justify-between w-full items-center">
            <h2 class="text-lg font-semibold">Contacts</h2>
            <a href="contacts/new" class={cn(buttonVariants({ variant: "secondary" }))}>Add Contact</a>
          </div>
          {contacts.length ? (
            <table id="contacts" class="border border-collapse border-slate-400 w-full">
              <thead >
                <tr class="bg-slate-50">
                  <TH>First</TH> <TH>Last</TH> <TH>Phone</TH> <TH>Email</TH> <TH></TH>
                </tr>
              </thead>
              <tbody class="border-y">
                {contacts.map((contact) => (<ContactArticle {...contact} />))}
              </tbody>
            </table >
          ) : (<div>0 elements found. Try to search with another value.</div>)
          }
        </div>
      </section >
    </>
  )
}
