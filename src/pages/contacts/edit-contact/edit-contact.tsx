import { Button, Input } from "../../../components"
import { BackIcon } from "../../../components/back-icon"
import { buttonVariants } from "../../../components/button"
import { cn } from "../../../lib/utils"
import { InputError } from "../new-contact/new-contact-page"

interface EditContactPageProps {
  contact: {
    id: string
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
  }
  errors?: InputError[]
}

export function EditContactPage({ contact, errors }: EditContactPageProps) {
  const { firstName, lastName, phone, email, id } = contact

  console.log("Edit contact page with contact id : ", id)
  return <div>
    <form action={`/contacts/${id}/edit`} method="POST" class="flex flex-col gap-4">
      <Input label="First name" type="text" id="first-name" name="first-name" required value={firstName}
        error={errors?.find(error => error.field === "firstName")?.message}
      />
      <Input label="Last name" type="text" id="last-name" name="last-name" required value={lastName}
        error={errors?.find(error => error.field === "lastName")?.message}
      />
      <Input label="Phone" type="tel" id="phone" name="phone" required value={phone}
        error={errors?.find(error => error.field === "phone")?.message}
      />
      <Input label="Email" type="email" id="email" name="email" required value={email}
        error={errors?.find(error => error.field === "email")?.message}
      />
      <div class="h-2" />
      <Button type="submit">Save</Button>
    </form>
    <Button
      hx-delete={`/contacts/${id}`}
      variant="destructive"
      hx-target="body"
      hx-push-url="true"
      hx-confirm="Are you sure you want to delete this contact?"
    >
      Delete contact
    </Button>
    <div class="h-4" />
    <a
      hx-boost="false"
      href={`/contacts`}
      class={cn([buttonVariants({ variant: "secondary" }), "flex gap-2"])}
    >
      <BackIcon />
      Back
    </a>
  </div>
}
