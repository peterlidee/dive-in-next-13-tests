# Dynamically and statically rendering client and server components

Here's a quick recap.

**Client components** are components that:

1. Use interactivity or event listeners.
2. Use lifecycle or state hooks.
3. Use custom hooks that use lifecycle of state hooks.
4. Use browser only API's.
5. Are Class components.
6. Start with the 'use client' directive.
7. Are children of other client components.

All other components are by default **server components**.

**Dynamic rendering** means that routes are prerendered on the server at request time, not at build time. `Next` dynamically renders routes when it encounters a dynamic fetch or dynamic functions:

1. `headers()` or `cookies()`
2. `useSearchParams` hook
3. `searchParams` page prop

All other routes are statically rendered. That means that they are prerendered at build time (`next build`).

It's time to combine these concepts.

## Static routes

A route is statically rendered when there are no dynamic functions or dynamic fetches in the route.

We can test if a route was statically rendered by running `next build`. `Next` cli will output how the route was rendered and we can also check the `.next/server` folder for prerendered HTML.

But, how do we test if a component was client-side or server-side rendered. We know how to make a component render client-side ('use client') but what does this actually do?

Let's make 2 examples: (note we are using `app router` now)

```jsx
// app/test2/static/server/page.js

export default function StaticServer() {
  return (
    <div>
      <h2>Server component in a static route</h2>
    </div>
  );
}
```

```jsx
// app/test2/static/client/page.js
'use client';

export default function StaticClient() {
  return (
    <div>
      <h2>Client component in a static route</h2>
    </div>
  );
}
```

Running `next build` yields the expected result. Both routes were statically rendered:

```
(Next cli)

Route (app)
○ /test2/staticServer
○ /test2/staticClient
```

And the prerendered HTML contains:

```html
<!-- .next/server/app/test2/staticServer.html -->
<!-- edited -->
<div>
  <h2>Server component in a static route</h2>
</div>
```

```html
<!-- .next/server/app/test2/staticClient.html -->
<!-- edited -->
<div>
  <h2>Client component in a static route</h2>
</div>
```

The scripts in the prerendered HTML files are illegible. This leaves us with the same problem. How do we **know** if a component was rendered client-side or server-side.

### Back to the docs

The `Next` docs are a bit confusing. They explicitly mention static rendering works differently for client and server components. Both are prerendered and cached. But:

> Server and Client Components are rendered differently during Static Rendering:
>
> - Client Components have their HTML and JSON prerendered and cached on the server. The cached result is then sent to the client for hydration.
>
> - Server Components are rendered on the server by React, and their payload is used to generate HTML. The same rendered payload is also used to hydrate the components on the client, resulting in no JavaScript needed on the client.
>
> Source: [`Next` docs](https://nextjs.org/docs/app/building-your-application/rendering#static-rendering)

This explanation did not work for me. It seems to be some technical detail so I kept looking. Eventually, I came across these lines:

> - Components in the Server Component module graph are guaranteed to be only rendered on the server.
> - Components in the Client Component module graph are primarily rendered on the client, but with Next.js, they can also be pre-rendered on the server and hydrated on the client.

So, server components are only rendered on the server, never on the client. Client components, as we also know from the previous chapter, run a bit on the server and a bit on the client. This realization led me to use logs to test, as we also did in the previous chapter.

### Testing client and server components

We update both our components with a `console.log` statement:

```jsx
// app/test2/staticServer/page.js
export default function StaticServer() {
  console.log('Rendering StaticServer');
  return (
    <div>
      <h2>Server component in a static route</h2>
    </div>
  );
}
```

```jsx
// app/test2/staticClient/page.js
'use client';

export default function StaticClient() {
  console.log('Rendering StaticClient');
  return (
    <div>
      <h2>Client component in a static route</h2>
    </div>
  );
}
```

We then run `next dev` and first visit route: `/test2/staticServer` with our browser console opened. Our console does not say `Rendering StaticServer` but our terminal does. Server components are guaranteed to only run on the server and this test confirms this.

Visiting route `/test2/staticClient` also yields the expected result. Both our console and our terminal log `Rendering StaticClient`.

### Test succeeded?

Yes and no. We are now able to test if a component is client-side or server-side. But there are some caveats:

1. The server components:
   - Only log in the terminal the first time they are visited in development mode. The cached result is served on the second visit, hence no second log.
   - Never log in a production build.
2. The client components
   - Always log in the console, both in development and in a production build.
   - Only log in the terminal when the current route is the one that opened the project or on page refresh (reloading project).

**Conclusion**: We can test if a component is client or server by adding a console log statement. But, we can only use this in development mode AND we need to refresh the page to get reliable results. The result are only logs in the terminal for server components and logs in both terminal and console for client component. It's not great but it is all we have.

## Dynamic rendering

A route is rendered dynamically when `Next` detects dynamic fetches or dynamic function in the route. Dynamic functions are: `headers`, `cookies`, `useSearchParams` and the `searchParams` page props.

There are some specifications.

- The `cookies` and `headers` functions are only callable in server components. If you call them in a client component `Next` throws an error.
- The `useSearchParams` hook is only available in client components. Calling it in a server component will cause `Next` to throw an error.
- Finally, the `searchParams` page prop is available in both client and server components but is - obviously - only available for pages (`page.js` in a route root).

Let's make a dynamic server component and run build:

```jsx
// app/test2/dynamicServer/page.js
export default function DynamicServer({ searchParams }) {
  console.log('Test 2: rendering DynamicServer');
  return <div>Server component in a dynamic route</div>;
}
```

`Next cli` unexpectedly reports this route as static:

```
(Next cli)

○ /test2/dynamicServer
```

So, it seems that `Next` is pretty smart about this. It recognizes that the `searchParams` props wasn't used and hence this component will not trigger a dynamic render. Let's try this:

```jsx
// app/test2/dynamicServer/page.js
export default function DynamicServer({ searchParams }) {
  console.log('Test 2: rendering DynamicServer');
  const params = searchParams;
  return <div>Server component in a dynamic route</div>;
}
```

```
(Next cli)

○ /test2/dynamicServer
```

Again, `Next` was pretty smart. There is no need for this component to trigger a dynamic rendering and `Next` recognized this. New update:

```jsx
// app/test2/dynamicServer/page.js
export default function DynamicServer({ searchParams }) {
  console.log('Test 2: rendering DynamicServer');
  const foobar = searchParams?.foobar;
  return <div>Server component in a dynamic route</div>;
}
```

```
Route (app)
...
(Next cli)

λ /test2/dynamicServer

Legend
λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
```

Success, our `DynamicServer` component / page triggered a dynamic route rendering. I took some time to debug this problem so we could learn that these dynamic function won't automatically trigger dynamic rendering and to demonstrate the usefulness of testing.

Lastly, let's create a `DynamicClient` component and run build:

```jsx
// app/test2/dynamicClient/page.js
'use client';

export default function DynamicClient({ searchParams }) {
  console.log('Test 2: rendering DynamicClient');
  const foobar = searchParams?.foobar;
  return <div>Client component in a dynamic route</div>;
}
```

`Next cli` output:

```
(Next cli)

Route (app)
├ λ /test2/dynamicClient
├ λ /test2/dynamicServer
```

Confirming both `dynamicServer` and `dynamicClient` are in a dynamic render route. As an extra test, we look in the build folder: `.next/server/app/test2` and there is no `dynamicServer.html` or `dynamicClient.html` files in there. This is as expected.

Running `next dev` to test client or server component also yields the expected results.

- Route `test2/dynamicServer` (+ page refresh) logged `Test 2: rendering DynamicServer` in the terminal but not in the client.
- Route `test2/dynamicClient` (+ page refresh) logged `Test 2: rendering DynamicClient` in the terminal and in the browser console.

## Conclusion

We spent some of our time in this chapter trying to figure out how to test if a component is a client or a server component. We found a flawed but usable method.

We then made 4 test: a statically rendered client and server component and a dynamically rendered client and server component;

Every chapter till now was pretty much a setup for the following chapters where we will look into more practical thing like nesting and passing props but also _quirky_ details. I will walk you through all of these using examples.
