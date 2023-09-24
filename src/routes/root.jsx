import {
	Outlet,
	NavLink,
	useLoaderData,
	Form,
	redirect,
	useNavigation,
	useSubmit
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';
import { useEffect } from 'react';

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q') || '';
	const contacts = await getContacts(q);
	return { contacts, q };
}

export default function Root() {
	const { contacts, q } = useLoaderData();
	const navigation = useNavigation();
	const submit = useSubmit();

	useEffect(() => {
		document.getElementById('q').value = q;
	}, [q]);

	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>
					<Form role="search" id="search-form">
						<input
							type="search"
							aria-label="Search contacts"
							placeholder="search"
							name="q"
							id="q"
							defaultValue={q}
							onChange={e => submit(e.currentTarget.form)}
						/>
						<div id="search-spinner" aria-hidden hidden={true}></div>
						<div className="sr-only" aria-live="polite"></div>
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map(({ id, first, last, favorite }) => (
								<li key={id}>
									<NavLink
										to={`contacts/${id}`}
										className={({ isActive, isPending }) =>
											isActive ? 'active' : isPending ? 'pending' : ''
										}
									>
										{first || last ? (
											<>
												{first} {last}
											</>
										) : (
											<i>No Name</i>
										)}{' '}
										{favorite && <span>*</span>}
									</NavLink>
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
			<div
				id="detail"
				className={navigation.state === 'loading' ? 'loading' : ''}
			>
				<Outlet />
			</div>
		</>
	);
}
