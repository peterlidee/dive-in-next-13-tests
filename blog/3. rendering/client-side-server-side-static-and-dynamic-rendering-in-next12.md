# Client and server components and static and dynamic rendering prior to Next 13

We just talked about static and dynamic rendering and server and client components. But a lot of these concepts are not new but already existed prior to `Next 13`. Let's take a good look at this.

`Next` says all component in older versions of `Next` were client components. But that is a confusing statement. Let's take a look at some examples.

We are going to write these tests in `create-next-app` with the latest version of `Next` (13.4.7 at the time of writing). But we are not using the app folder but the old pages folder. `Next` behavior in this folder is the same as it was in `Next 12`.

To group all test, we made a route `/test1`. Each example then gets a subroute `/test1/example`, `/test1/anotherExample`. Finally, the root of route `/test1` links to all these subroutes.

_Note_: at the time of writing this, there is a bug in `Next`. Although `Next` guarantees that you can use both `app router` and `pages router` in the same project, there is a [bug](https://github.com/netlify/next-runtime/issues/2089) that causes a full page reload when you browse from an `app route` to a `pages route` or vice versa. This is unfortunate but does not influence our tests.

## Static (no initial props)

We first add a simple component in the components folder:

```jsx
// components/Component1.js

export default function Component1() {
  return (Component1
    <div>
      <h1>Component1</h1>
    </div>
  );
}
```

And then load that into the route `test1/static`

```jsx
// pages/test1/static.js

import Component1 from '@/components/Component1';

export default function Static() {
  return <Component1 />;
}
```

Then we run `next build`. The `next build` command is used to compile and optimize the Next.js project for production deployment, generating a highly optimized and static version of the application. (ChatGPT)

We are testing here and are specifically interested in 2 things `next build` provides us:

1. Cli output
2. Prerendered files

### Cli ouput

This is the cli output for our build:

```
// cli (edited)

Route (pages)
└ ○ /test1/static

○  (Static)  automatically rendered as static HTML (uses no initial props)
```

We build the `/test1/static` route in the `pages router`. Our route is prepended with the symbol `○`. The legend tells us that this route statically rendered:

```
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

But what does this mean? A static page route means that the route (all the components that make up a page) was prerendered server-side at build time. It is server-side because we didn't use the browser in this process. Build time means that this process happened when we used the `next build` command. Before we've actually ran our project on the server (using `next start`).

The implication here is that our `<Component1 />`, a client side component, was rendered server-side. In other words, in `Next`, client side components aren't really client-side components.

This is a `Next` thing. In pure `React`, client component are purely client-side. Why does `Next` do this? For performance. Prerendering the HTML on the server:

- Is faster.
- Puts less work on the shoulders of the client (the browser).
- Requires less Javascript for the client to download.

This is great but it also means that in `Next`, client components aren't purely client components. Which can be confusing.

A quick note here. Having prerendered HTML does not mean that this component is ready to go. It still needs to be rendered on the client and hydrated (adding event listeners and state). There are subtleties in these processes that I don't full understand. But that doesn't really matter. Just remember, client components does not equal pure client rendering in `Next`.

### Prerendered files

On top of cli output, running `next build` also gives us access to the prerendered files. `Next` places prerendered files in the `.next/` folder in the root of your project. `Pages router` files go into the `.next/server/pages` folder (and `app router` files in the `.next/server/app` folder). Let's take a look, we are interested only in the prerendered `.html` files.

So, inside `.next/server/pages/test1` we find our prerendered route `static.html`. Open it up and it's a complete mess:

<!-- prettier-ignore -->
```html
<!-- .next/server/pages/test1/static.html -->
<!DOCTYPE html><html><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width"/><meta name="next-head-count" content="2"/><noscript data-n-css=""></noscript><script defer="" nomodule="" src="/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js"></script><script src="/_next/static/chunks/webpack-bf1a64d1eafd2816.js" defer=""></script><script src="/_next/static/chunks/framework-cb5d924716374e49.js" defer=""></script><script src="/_next/static/chunks/main-1613ed95faa5e755.js" defer=""></script><script src="/_next/static/chunks/pages/_app-998b8fceeadee23e.js" defer=""></script><script src="/_next/static/chunks/pages/test1/static-33af6876e33d9390.js" defer=""></script><script src="/_next/static/VUTEKdKTY682PR1J59WjE/_buildManifest.js" defer=""></script><script src="/_next/static/VUTEKdKTY682PR1J59WjE/_ssgManifest.js" defer=""></script></head><body><div id="__next"><div>Component1</div></div><script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{}},"page":"/test1/static","query":{},"buildId":"VUTEKdKTY682PR1J59WjE","nextExport":true,"autoExport":true,"isFallback":false,"scriptLoader":[]}</script></body></html>
```

Remember, this isn't meant to be human readable. It's optimized server code. We are taking a look at this to better understand prerendering. By the way, do not mess with or edit this code and expect your app to still work! Let's clean it up.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- some meta tags -->
    <!-- a lot of scripts -->
  </head>
  <body>
    <div id="__next"><div>Component1</div></div>
    <!-- some json -->
  </body>
</html>
```

I'm showing this to give you a more concrete concept of what prerendering is.

### Example with state

Prerendering works fine in components with state too. Here is a quick example:

```jsx
// components/ComponentWithState.js

import { useState } from 'react';

export default function ComponentWithState() {
  const [value, setValue] = useState('Peter');
  return (
    <label>
      name: <input value={value} onChange={(e) => setValue(e.target.value)} />
    </label>
  );
}
```

And we load it in a new route:

```jsx
// pages/test1/staticWithState.js

import ComponentWithState from '@/components/ComponentWithState';

export default function b() {
  return <ComponentWithState />;
}
```

When we run our build, `next cli` tells us this route was rendering static (symbol `○`):

```
// cli (edited)

└ ○ /test1/staticWithState
```

And this is our prerendered HTML:

```html
<!-- .next/server/pages/test1/staticWithState.html -->
<!-- edited -->

<body>
  <div id="__next">
    <label>name: <input value="Peter" /></label>
  </div>
</body>
```

What this learn us, is that `Next` is able to prerender a route even if there is `React state` in it. It just renders the initial state. Remember this, having interactive components does not mean they can't be prerendered.

## Static Site Generation

Our first case was static rendering without `getStaticProps`. Now we look into static rendering with `getStaticProps` AKA static site generation (SSG).

We make a new route `test1/ssg` that fetches a user from the[jsonplaceholder API](https://jsonplaceholder.typicode.com/) and run build.

```jsx
// pages/test1/ssg.js

export default function ComponentSSG({ user }) {
  return (
    <div>
      <h1>Static Site Generation</h1>
      <div>user: {user?.name}</div>
    </div>
  );
}

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  return {
    props: {
      user: user,
    },
  };
};
```

`Next cli` gives us a new output:

```
// cli (edited)

├ ● /test1/ssg

●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

And the prerendered HTML looks like this:

```html
<!-- .next/server/pages/test1/ssg.html -->
<!-- edited -->

<body>
  <div id="__next">
    <div>
      <h1>Static Site Generation</h1>
      <div>
        user:
        <!-- -->Leanne Graham
      </div>
    </div>
  </div>
</body>
```

There is also an sibling `ssg.json` that contains the data from the fetch. `Next` uses this to hydrate somehow. The details are not important.

I'm not here to learn you about SSG. The point was showing you another example of a client-side component (all components are client-side prior to `Next 13`) getting rendered server-side at build time and giving you a better feel how `Next` prerenders.

## Server-side rendering (SSR)

Our last example covers server-side rendering (SSR). We will use the previous SSG example with `getInitialProps` replaced by `getServerSideProps`:

```jsx
// pages/test1/ssr.js

export default function ComponentSSR({ user }) {
  return (
    <div>
      <h1>Server-side rendering</h1>
      <div>user: {user?.name}</div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  return {
    props: {
      user: user,
    },
  };
};
```

This time, things worked differently. The cli gives the expected output:

```
// cli edited

├ λ /test1/ssr

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
```

But what does this mean? Firstly, there is no prerendered html. `.next/server/pages/test1/ssr.html` does NOT exist. `Next` runs `getServerSideProps` on the server at request time, not at build time.
`Next` also prerenders the HTML server-side at request time but this HTML is not cached.

So what we are seeing here is that a client-side component (all components are client-side prior to `Next 13`) is prerendered server-side. Not at build time this time but at request time.

Are these server components then like we know them from `Next 13`? NO. Server components do not exist in `pages router`. But, more importantly, all of the above component test will still run partly on the client.

Again, I'm not sure exactly how the process works but we can verify this by adding a simple log statement to the above SSR example.

```jsx
export default function ComponentSSR({ user }) {
  console.log('Rendering ComponentSSR');
  return (
    <div>
      <h1>Server-side rendering</h1>
      <div>user: {user?.name}</div>
    </div>
  );
}
```

If we run this route either in development or production mode we will see the line 'Rendering ComponentSSR' in our browser console. This will never happen with server components. They are guaranteed to only run on the server. (Later more on this)

## Conclusion

We just tested and proved that client-side components aren't purely client-side rendered in `Next 12`. They get prerendered server-side at build or request time. `Next` does this to improve performance of our application but it does cause some confusion: _client-side components can be prerendered server-side._

However, this does not mean that these component are server components because they are still somehow (not sure how) rendered in the client. This also means that true server components is something new that only `Next 13` brings. Client components is something we are already familiar with though `Next 13` changes the definition of what a client component is (Event listener, state or lifecycle hooks, custom hooks that use state or lifecycle hooks, browser-only API or class components).

As far as rendering goes, older versions of `Next` already knew static and dynamic rendering. But again, `Next 13` changed their definition in the `app router`. (Dynamic fetches or functions cause dynamic rendering).
