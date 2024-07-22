import { Contact } from "../../..";

export function ContactArticle({ firstName, lastName, phone, email, id }: Contact) {
	return (
		<tr>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{phone}</td>
			<td>{email}</td>
			<td>
				<a href={`/contacts/${id}/edit`}>Edit</a>
				<a href={`/contacts/${id}`}>View</a>
			</td>
		</tr>
	)
}
