import { Contact } from "../../.."
import { BackIcon } from "../../../components/back-icon"
import { buttonVariants } from "../../../components/button"
import { EditIcon } from "../../../components/edit-icon"
import { cn } from "../../../lib/utils"

interface ViewContactProps {
  contactId: string
  contact?: Contact
}

export const ViewContact = ({ contactId, contact }: ViewContactProps) => {
  return <div>
    <div>
      <p>First name: {contact?.firstName}</p>
      <p>Last name: {contact?.lastName}</p>
      <p>Phone: {contact?.phone}</p>
      <p>Email: {contact?.email}</p>
    </div>

    <div class="h-8" />

    <a href={`/contacts/${contactId}/edit`} class={cn([buttonVariants({ variant: "default" }), "flex gap-2"])}><EditIcon />Edit</a>
    <div class="h-4" />
    <a href={`/contacts`} class={cn([buttonVariants({ variant: "secondary" }), "flex gap-2"])}><BackIcon />Back</a>
  </div >
}
