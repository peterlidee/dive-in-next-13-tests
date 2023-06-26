# Client and server components

## Performance

It's all about performance. `React` used to be client side only. This means browsers had to download the entire bundle and then `React` would render all the components.

`React` and `Next` constantly improved their working by adding things like server-side rendering and data fetching, prerendering and many more. Server components are the next step in this evolution. Why? Better performance.

## Server components

Server component are components that are rendered on the server. Let's focus on 2 advantages of server components:

### Prerendering

(pre)Rendering components server-side means that the server generates some or all of the HTML of the component and send that to the client.

- Server does it faster.
- Client (browser) has one less job.
- Client no longer needs (to download) the js necessary to render HTML.

(pre)Rendering can happens at build time (`next build`) or at request time (after `next start`). Build time rendering is called prerendering. Server-side rendering at request time can be considered a form of prerendering but gets also referred to as just rendering. Both `Next docs` and ChatGPT are a bit confusing about this.

What is sure is that prerendering can only happen on the server.

### Data fetching

A second advantage server components have, is data fetching. The docs give a few examples:

- You can leave access tokens and api keys on the server which makes it more secure.
- You can also leave all your data fetching logic on the server which makes for a cleaner front-end codebase.
- You can prerender data fetching (SSG).

### Server components FTW

Server components are better. Why? Performance, performance, performance! And that is exactly why `Next` made them the default in the new `app router`. (But, we will come back to the `app router` later. TODO)

## Client components

Who needs client component when you have server components? Actually, server components have limitations. There are thing that can only be done client-side. React things.

### When to use client components

Client components can be described as components that require client-side interactivity. The `Next docs` give a clear and short list of when to use client components:

- When you add interactivity and event listeners (`onChange`, `onClick`, ...)
- When using state or lifecycle hooks (`useState`, `useEffect`, ...)
- When using custom hooks that use state or lifecycle hooks.
- When using browser-only APIs (`localStorage`, `GeoLocation`,...)
- When using `React Class components`.

To be very clear, `Next` also mentions specific cases where you should use server components and **not** client components:

- Fetch data.
- Access backend resources (directly).
- Keep sensitive information on the server (access tokens, API keys, etc).
- Keep large dependencies on the server / Reduce client-side JavaScript.

(source: [`Next docs`](https://nextjs.org/docs/getting-started/react-essentials#when-to-use-server-and-client-components))

### How to make a client component

Defining a client component is done by using the directive 'use client'.

```jsx
'use client'

import somestuff

export default function MyComponent(){
  return <>hello</>
}
```

`Next` will throw an error if you forgot this line when you used `useState` for example.

There is a second way that a component becomes a client component. Components that are imported into client components become client components themselves. We will come back to this later.

## Conclusion

`Next 13` introduced server components. It's a new way to optimize your projects. Ideally, your project should be all server components (including for fetching data) with a few dots of client components like buttons or forms.

Client component are only used when your component uses:

1. Interactivity and event listeners
2. State or lifecycle hooks
3. Custom hooks that use state of lifecycle hooks
4. Browser only api's
5. React class components.

This was a theoretic introduction into client and server components. I would love to make this more concrete with practical examples but we need to look into static and dynamic rendering first as these impact client and server components.
