interface NewContactPageProps {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  errors?: string[]
}

export function NewContactPage(props: NewContactPageProps) {
  return (
    <>

      <form action="/contacts/new" method="POST" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label>
          First Name
          <input
            type="text"
            id="first-name"
            name="first-name"
            value={props.firstName}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={props.lastName}
            required
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            id="phone"
            name="phone"
            value={props.phone}
            pattern="^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={props.email}
            required
          />
        </label>
        <button type="submit">Save Contact</button>
      </form>
      {props.errors?.length &&
        <ul>
          {props.errors.map(error => (<li>{error}</li>))}
        </ul>
      }
    </>
  )
}
