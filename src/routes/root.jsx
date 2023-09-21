import { Outlet, Link, useLoaderData, Form, redirect } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader() {
	const contacts = await getContacts();
	return { contacts };
}

export default function Root() {
	const { contacts } = useLoaderData();
	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>
					<form role="search" id="search-form">
						<input
							type="search"
							aria-label="Search contacts"
							placeholder="search"
							name="q"
							id="q"
						/>
						<div id="search-spinner" aria-hidden hidden={true}></div>
						<div className="sr-only" aria-live="polite"></div>
					</form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map(({ id, first, last, favorite }) => (
								<li key={id}>
									<Link to={`contacts/${id}`}>
										{first || last ? (
											<>
												{first} {last}
											</>
										) : (
											<i>No Name</i>
										)}{' '}
										{favorite && <span>*</span>}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No Contact</i>
						</p>
					)}
				</nav>
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
