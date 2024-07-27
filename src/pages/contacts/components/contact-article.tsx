import { Contact } from "../../..";
import { EditIcon } from "../../../components/edit-icon";
import { ViewIcon } from "../../../components/view-icon";

function TD({ children }: { children: string | any }) {
	return <td class="border border-slate-300 text-center">{children}</td>
}

export function ContactArticle({ firstName, lastName, phone, email, id }: Contact) {
	return (
		<tr class="py-2">
			<TD>{firstName}</TD>
			<TD>{lastName}</TD>
			<TD>{phone}</TD>
			<TD>{email}</TD>
			<TD>
				<div class="flex gap-3 h-6 items-center justify-center">
					<a href={`/contacts/${id}/edit`}><EditIcon /></a>
					<a href={`/contacts/${id}`}><ViewIcon /></a>
				</div>
			</TD>
		</tr>
	)
}
