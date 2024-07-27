import { Button, Input } from "../../../components"
import { BackIcon } from "../../../components/back-icon"

export interface InputError {
  field: string
  message: string
}

interface NewContactPageProps {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  errors?: InputError[]
}

export function NewContactPage(props: NewContactPageProps) {
  return (
    <>
      <form action="/contacts/new" method="POST" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Input
          label="First name"
          type="text"
          id="first-name"
          name="first-name"
          value={props.firstName}
          required
          error={props.errors?.find(error => error.field === "firstName")?.message}
        />
        <Input
          label="Last name"
          type="text"
          id="last-name"
          name="last-name"
          value={props.lastName}
          required
          error={props.errors?.find(error => error.field === "lastName")?.message}
        />
        <Input
          id="phone"
          label="Phone"
          type="tel"
          name="phone"
          value={props.phone}
          pattern="^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$"
          required
          error={props.errors?.find(error => error.field === "phone")?.message}
        />
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={props.email}
          required
          error={props.errors?.find(error => error.field === "email")?.message}
        />
        <div class="h-4" />
        <Button type="submit">Save Contact</Button>
        <Button type="submit" icon={<BackIcon />} variant="secondary">Back</Button>
      </form >
      {
        props.errors?.length &&
        <ul>
          {props.errors.map(error => (<li>{error}</li>))}
        </ul>
      }
    </>
  )
}
