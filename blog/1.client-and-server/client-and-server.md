# Client and server components in Next 13

It's all about performance. `React` used to be client side only. This meant browsers had to download the entire bundle and then `React` would render all the components.

`React` and `Next` constantly improved their working by adding things like server-side rendering and data fetching, prerendering and many more. Server components are the next step in this evolution. Why? Better performance.

## Client components

Client components are components that:

1. Add interactivity and event listeners (`onChange`, `onClick`, ...)
2. Use hooks:

   - State or lifecycle hooks (`useState`, `useEffect`, ...)
   - Custom hooks that use state or lifecycle hooks.
   - The `useSearchParams` hook. (later chapter on this)

3. Use browser-only APIs (`localStorage`, `GeoLocation`,...)
4. Use Class components.

### How do you use a client component?

A component becomes a client component when it uses the `use client` directive:

```jsx
'use client';

export default function MyComponent() {
  return <>hello</>;
}
```

We mentioned above that you have to use client components when your components needs interactivity or event listeners, certain hooks, browser only API's or is a Class component. Writing a component that fulfils these conditions without the `use client` directive makes `Next` throw an error.

But, the `use client` directive is what makes a component a client component, not the use of f.e. event listeners or `useState()`. These only require you to use the `use client directive`. This means that you can make any component a client component just by using this directive. There is no reason to do this (apart from testing like we will do in this series) but just know this nuance.

There is one other case where a component becomes a client component without using the directive. When you import said component into a client component. More on this later on.

### What a client component is NOT

Client components are used when your component has certain requirements (interactivity and event listeners, certain hooks, browser only API's and class components).

**Client components are not equal to client-side rendered components!!!!** Reread the previous paragraph. When your components have certain requirements, you make them into client components. It does not mention anything about them being client-side rendered.

### Client components in React vs Next

Client components in pure `React` (no `Next`) are client-side rendered. Client components in `Next` on the other hand are mostly rendered server-side ... and a bit on the client. Why, because it improves performance.

If `Next` renders client components server-side, does that mean that they are server components? No!

1. Server components render ONLY on the server, never on the client.
2. The render process of client components is different. How it differs is not relevant but the result is that client components will render mostly on the server and then a bit on the client.

I know, this doesn't fully make sense but we are going to come back to this a lot. For now, just remember:

1. Client component = component that has certain requirements.
2. Client component !== client-side rendered component.
3. Client components will render mostly on the server and a bit on the client.

## Server components

Every component that is not a client component is by default a server component in the new `app router`. If your route is defined in the `/app` folder, then every component in this route is either a server component or a client component. In the old `pages router`, all components are client components. Server components only exist in the `app router`.

Server components are also defined by the fact that they are rendered on the server only. They never render on the client. (Client components run both server and client-side.)

### Why server components

> Server Components allow developers to better leverage server infrastructure. For example, you can move data fetching to the server, closer to your database, and keep large dependencies that previously would impact the client JavaScript bundle size on the server, leading to improved performance. Server Components make writing a React application feel similar to PHP or Ruby on Rails, but with the power and flexibility of React and the components model for templating UI.
>
> With Server Components, the initial page load is faster, and the client-side JavaScript bundle size is reduced. The base client-side runtime is cacheable and predictable in size, and does not increase as your application grows.
>
> ...
>
> [Next docs](https://nextjs.org/docs/getting-started/react-essentials#why-server-components)

A server component is best suited to:

> - Fetch data.
> - Access backend resources (directly)
> - Keep sensitive information on the server (access tokens, API keys, etc)
> - Keep large dependencies on the server / Reduce client-side JavaScript
>
> [Next docs](https://nextjs.org/docs/getting-started/react-essentials#when-to-use-server-and-client-components)

In short, server components are better for performance and that is why `Next` made them the default (in `app router`). Always use server components, except when you have to use client components due to certain requirements (interactivity and event listeners, certain hooks, browser only API's and class components).

## Conclusion

`Next 13` introduced server components. A new way to optimize your projects. Server components are the default in the `app router` and should be used for everything except when your component needs:

1. Interactivity and event listeners.
2. Certain hooks: state and lifecycle hooks, custom hooks that use state of lifecycle hooks and the `useSearchParams` hook.
3. Browser only api's.
4. React class components.

In these cases you use client components.

Client components can be a bit confusing because in `Next` they are rarely client-side rendered. `Next` optimizes all components (client and server) by prerendering them server-side.

- Client components aren't fully server-side rendered. They also render partly client-side.
- Server components never render client-side, only server-side.

This was a theoretic explanation of client and server components. I would love to make this more concrete with examples but we need to look into static and dynamic rendering first as these impact client and server components.
