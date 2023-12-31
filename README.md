https://reactrouter.com/en/main/start/tutorial#deleting-records

## OOO

### Root

- create <code>router</code> using <code>createBrowserRouter</code> and pass it into <code>RouterProvider</code> as a prop
- create <code>root.jsx/Root</code> which is essentially a <code>nav</code>
- since we want it to appear on our '/' route, we go back to the router, set the <code>element</code> of path '/' to <code>Root</code> component;
- create an <code>ErrorPage</code> by employing <code>useRouterError</code> hook - error type: "Not Found" when user navigates to routes that don't exist
- set the <code>errorElement</code> of path '/' to <code>ErrorPage</code> component;

### Another Route - in this case, /contacts/:contactId

- create a hard coded component
- add it to the router
  - ```
    [
      ...,
      {
      path: 'contacts/:contactId',
      element:<Contect />
    }
    ]
    ```
- in order to nest the compnent inside the <code>Root</code> layout, we move the '/contacts/:contactId' route to be one of the **_<code>children</code>_** of '/', while
  1. in Root, add an <code>\<Outlet></code> component from react-router in the correct spot in the document
  2. in Root, refactor <code>\<a></code> tage to be <code>\<Link></code> to utilize client side routing

### Load data - configure the loader

- in Main.jsx, add <code>rootLoader</code> - a GET contacts func to router's path '/'
- in Root.jsx, employ <code>useLoaderData</code> hook, to get <code>contacts'</code> state

### Form

Note: **HTML forms actually cause a navigation in the browser, just like clicking a link. The only difference is in the request: links can only change the URL while forms can also change the request method (GET vs POST) and the request body (POST form data).**

React Router uses client side routing, form data is sent to a route <code>'action'</code> as request body of **POST** or URLSearchParams for **GET**, instead of sending it to the (Vite) server.

- change \<form> to <code>\<Form></code>
  - the <code>\<Form></code> takes a prop <code>method</code>
- create an async <code>action</code> func and export it; **import** it into Main's <code>router</code>
- for an 'edit' route, we add <code>{path, element, loader}</code>
- ```javascript
  export async function action({ request, params }) {
  	const formData = await request.formData();
  	const updates = Object.fromEntries(formData);
  	await updateContact(params.contactId, updates);
  	return redirect(`/contacts/${params.contactId}`);
  }
  ```

- to update and submit, we import <code>redirect</code> from React Router, in order to redirect out of "contacts/:contactId/edit" into "contacts/:contactId"

### NavLink - active link styling

- When the user is at the URL in the NavLink, then isActive will be true. When it's about to be active (the data is still loading) then isPending will be true.

  - ```javascript
    <NavLink
    	to={`contacts/${contact.id}`}
    	className={({ isActive, isPending }) =>
    		isActive ? 'active' : isPending ? 'pending' : ''
    	}
    >
    	{/* other code */}
    </NavLink>
    ```

  ```

  ```

### useNavigation - add global pending UI

- ```javascript
  const navigation = useNavigation(); //"idle" | "submitting" | "loading"
  /*existing code*/
  return (
  	/*existing code*/
  	<div id="detail" className={navigation.state === 'loading' ? loading : ''}>
  		<Outlet />
  	</div>

  	/*existing code*/
  );
  ```

### useNavigate

- allow us to do the same thing as the browser's back button
- steps:
  - import useNavigate
  - invoke it
    <code>const naviage = useNavigate()</code>
  - as it as a click handler
    <code>const handleClick=()=>navigate(-1)</code>;

### Index Route - add element <Index />

instead of <code>{path:''}</code>
we say:
<code>
children: [
{ index: true, element: <Index /> }
];
</code>

### trivia

- `<button type='button'></button>`automatically prevents default
