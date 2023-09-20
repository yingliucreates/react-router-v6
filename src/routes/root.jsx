import { Outlet } from 'react-router-dom';
export default function Root() {
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
				</div>
				<nav>
					<ul>
						<li>
							<a href={`/contacts/1`}>Your Name</a>
						</li>
						<li>
							<a href={`/contacts/1`}>Your Friend</a>
						</li>
					</ul>
				</nav>
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
