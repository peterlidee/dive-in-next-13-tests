# Conclusion

`Next 13` is a a big update. It introduced some big changes that have a lot of implications. Be open-minded about this. The framework changed so you should change with it.

In this series I tried to help you with this. I walked you through some new and some old concepts so you could get a better understanding of `Next 13` and feel comfortable using it.

## Speed run

Here is a rundown of everything we learned:

### 1. Client-side rendering

Client-side rendering in `Next` is mostly done server-side. This is great for performance and should no longer confuse you.

### 2. Client components

Client components are used to add:

1. Interactivity and event listeners.
2. Certain hooks:

- State and lifecycle hooks.
- Custom hooks that use state and lifecycle hooks.
- `useSearchParams` hook.

3. Browser-only api's.
4. Class components.

Client components do not equal client-side rendered components. In `Next` they will render mostly on the server and a bit on the client.

A component is a client component when it uses the `use client` directive or when it get's imported into a component that uses the `use client` directive.

### 3. Server components

Any component that is not a client component is by default a server components in the `app router`. Server components are better for performance and only render on the server.

### 4. Dynamic rendering

Dynamic rendering is server-side rendering of a route at request time. `Next` uses dynamic rendering in the `app router` when it encounter a:

1. Dynamic fetch
2. Dynamic function:
   1. `headers` ,`cookies`
   2. `useSearchParams` hook (It's complicated)
   3. `searchParams` page props.

### 5. Static rendering

Static rendering is server-side rendering of a route a build time. It is the default.

### 6. Testing static or dynamic rendering

You can test wether a route was statically or dynamically rendering by:

1. Using `Next cli`.
2. Looking in the `Next` build folder (`/.next`).
3. Using your browser network tab.

### 7. Testing client and server components

A client component will always log in the browser, a server component won't ever log in the browser.

### 8. Nesting

The only nesting issue you have to worry about is nesting a server inside a client component. When imported, the server becomes a client.

- Try to avoid nesting server in client. Put client components as far down the tree as possible.
- Use composition when nesting server in client so server won't become client.

Why worry? Performance.

### 9. useSearchParams hook

The `useSearchParams` hook has some complications. It behaves normally in a dynamic route. Wen using it in a static route, always use `Suspense` so you can profit from the improved performance of hybrid rendering. Everything inside the `Suspense` boundary will be client-side rendered. The rest of the route will be statically rendered.

## What now?

This is not all there is to learn. Read the docs. Here are some interesting pages you may want to start with:

- [React essentials](https://nextjs.org/docs/getting-started/react-essentials)
- [Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [project structure](https://nextjs.org/docs/getting-started/project-structure)

As a final note I would recommend to adopt your workflow. Test that your routes and components render as expected.
