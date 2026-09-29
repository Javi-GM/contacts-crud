import { Contact } from ".."
import { ContactArticle } from "../pages/contacts/components/contact-article"

interface ContactsListProps {
  contacts: Contact[]
}

function TH({ children }: { children?: string | any }) {
  return <th class="border border-slate-300 font-medium">{children}</th>
}

export function ContactsList({ contacts }: ContactsListProps) {
  return <>
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
  </>
}
