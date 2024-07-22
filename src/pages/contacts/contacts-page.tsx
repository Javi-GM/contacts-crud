import { Contact } from "../.."
import { ContactArticle } from "./components/contact-article"

interface ContactsPageProps {
  contacts: Contact[]
  currentSearch?: string
}

export function ContactsPage({ contacts = [], currentSearch }: ContactsPageProps) {
  return (
    <>
      <h1>Contacts</h1>
      <form>
        <label for="search-content">Find a Contact</label>
        <input
          id="search-contact"
          name="q"
          type="search"
          placeholder="Search by..."
          value={currentSearch}
        />
        <button type="submit">Search</button>
      </form>
      <section>
        {contacts.length ? (
          <table id="contacts">
            <thead>
              <tr>
                <th>First</th> <th>Last</th> <th>Phone</th> <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (<ContactArticle {...contact} />))}
            </tbody>
          </table>
        ) : (<div>0 elements found. Try to search with another value.</div>)
        }
      </section>
      <br />
      <p>
        <a href="contacts/new">Add Contact</a>
      </p>
    </>
  )
}
