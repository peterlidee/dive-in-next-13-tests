# Nesting

In the previous chapter we combined client and server components with dynamic and static rendering. In this chapter we will look at what the effect is of nesting all these combination inside each other.

## Nesting 'dynamic' and 'static' components

Nesting happens at component level. Static and dynamic rendering happens at route level so nesting does not really apply.

The rules for dynamic rendering are simple. When `Next` encounters a dynamic fetch (what used to be SSR) or dynamic functions (`headers`, `cookies`, `useSearchParams` hook or `searchParams` prop) in any of the components that make up the route, the entire route will be rendered dynamically. That means it will be rendered server-side at request time.

- So, nesting 'dynamic' components (components that have a dynamic fetch or dynamic functions) inside 'static' components will make the route render dynamically.

But, there is an exception to this rule: when using the `useSearchParams` hook. We will look into that later on.

- Nesting 'static' components inside 'dynamic' components will also render the route dynamically.

- For integrality: a route that is entirely made out of nested 'static' components will be statically rendered while all 'dynamic' components will obviously trigger dynamic rendering.

## Nesting client components and server components

Nesting client components in other client components or server components inside other server components does not affect their rendering. This leaves us with 2 more possibilities:

1. Nesting client components inside server components does not affect their rendering.
2. Nesting server components inside client components can affect their rendering but you can avoid this.

### Nesting client components inside server components

Nesting a client component inside of a server component does **not** affect the rendering of either. Do consider the entire route here! Ancestor components should also be counted.

```
server > client > server > client
```

In this route for example, only the first client component is guaranteed not to have been affected. The second client component may have been (because server inside client can affect server).

Here is an example of a client nested in a server component in a static route ( `page > server > client` ):

```jsx
// app/test3/static/clientInServer/page.js
import ServerParent from './_components/ServerParent';

export default function page() {
  return <ServerParent />;
}
```

```jsx
// app/test3/_components/ServerParent.js
import ClientChild from './ClientChild';

export default function ServerParent() {
  console.log('Test 3: Rendering ServerParent in a static route.');
  return (
    <div>
      <h2>Static Server Parent</h2>
      <ClientChild />
    </div>
  );
}
```

```jsx
// app/test3/_components/ClientChild.js

'use client';

export default function ClientChild() {
  console.log('Test 3: Rendering ClientChild');
  return (
    <div>
      <h3>ClientChild</h3>
    </div>
  );
}
```

Our results are as expected. The route is static.

```
(next cli)

○ /test3/static/clientInServer
```

And there is correct client and server component behavior:

```
(terminal)

Test 3: Rendering ServerParent
Test 3: Rendering ClientChild
```

```
(console)

Test 3: Rendering ClientChild
```

We now test this same example in a dynamic route: `/test3/dynamic/clientInServer`

```jsx
// app/test3/dynamic/clientInServer/page.js
import ServerParent from '../_components/ServerParent';

export default function page({ searchParams }) {
  // trigger dynamic rendering
  const foobar = searchParams.foobar;
  return <ServerParent />;
}
```

And the test works as expected. The route is dynamic and the logs are the same as above. This proves static or dynamic rendering is not affected by nesting client inside server components.

### Nesting client components inside server components

Client components are components that:

- Have interactivity and event listeners.
- Use state or lifecycle hooks
- Use custom hooks that use state of lifecycle hooks.
- Use browser only API's.
- Are class components.

In these case, you need to add the 'use client' directive. If you add the 'use client' directive without using any of the above, the component will also be a client component. This is useless in the wild but useful when testing.

But, there is another case when a component becomes a client component. If a (server) component is imported into a file that uses the `use client` directive, then (server) component becomes a client component.

In below example, `ClientParent` is a client component because of the `use client` directive. `ServerChild`, a server component, becomes a client component because it was imported into a client component.

```jsx
// app/test3/_components/ClientParent.js

'use client';

import ServerChild from './ServerChild';

export default function ClientParent() {
  console.log('Rendering ClientParent');
  return (
    <div>
      <h1>ClientParent</h1>
      <ServerChild />
    </div>
  );
}
```

```jsx
// app/test3/_components/ServerChild.js

export default function ServerChild() {
  console.log('Rendering ServerChild');
  return (ServerChild
    <div>
      <h3>ServerChild</h3>
    </div>
  );
}
```

We load these is a static route and in a dynamic route and run our tests.

```jsx
// app/test3/static/serverInClient/page.js
import ClientParent from '../../_components/ClientParent';

export default function page() {
  return <ClientParent />;
}
```

```jsx
// app/test3/dynamic/serverInClient/page.js

import ClientParent from '../../_components/ClientParent';

export default function page({ searchParams }) {
  // trigger dynamic rendering
  const foobar = searchParams?.foobar;
  return <ClientParent />;
}
```

Our tests confirm the theory: both components become client components (both log in the browser console) while static or dynamic rendering do not influence the outcome.

But, `Next` calls this an 'unsupported' pattern. Not because it doesn't work but because if fails to run `ServerChild` as a server component. When we write a server component, we want it to be a server component. But this did not happen. Hence, it is an unsupported pattern.

Luckily, there is are 2 ways around this:

1. using composition.
2. Optimizing your project structure.

### Composition

Composition just means that we pass components as props. It is best know as the children props pattern, even though you can use any prop. So let's rewrite our `ClientParent` with the children prop.

```jsx
// app\test3\_components\ClientParentWithChildren.js

'use client';

export default function ClientParentWithChildren({ children }) {
  console.log('Rendering ClientParent with children prop');
  return (
    <div>
      <h2>ClientParent with children prop</h2>
      {children}
    </div>
  );
}
```

We use the same `ServerChild` from before, make static and dynamic routes and test this pattern out.

```jsx
// app/test3/static/serverInClientAsChildren/page.js

import ClientParentWithChildren from '../../_components/ClientParentWithChildren';
import ServerChild from '../../_components/ServerChild';

export default function page() {
  return (
    <ClientParentWithChildren>
      <ServerChild />
    </ClientParentWithChildren>
  );
}
```

Success! 'Rendering ServerChild' not longer prints in the browser console. So, we nested a server component inside a client component without making this server component render as a client component. Again, static or dynamic rendering has no influence.

Let's run this down again. Importing a server component into a client component will make this server component into a client component. We can avoid this by passing the server component as a prop (props.children) to the client component. This pattern ensures that our server component remains a server component (and benefits from better performance).

## Optimizing your project structure.

Aside from using the children props pattern we can also avoid this problem altogether by not nesting server components inside client components. Don't `duh` me. I know, you will have to sometimes. But just try to avoid it.

`Next` advocates a server first approach. Your project should be mostly server components, sprinkled with dots of client components. As nesting server components inside client component can affect the first, try to push your client components to the end of routes. `Next` calls this making client components leafs (as in the end of a tree).

```
server > server > server > client (leaf)
```

Server components are new in `Next 13`. To make the most of them, you may want to look into your coding habits and project structure.

## Conclusion

Nesting can alter components behavior. When you bring a 'dynamic component' into a route, the route - that is all components (also the 'static') - will render dynamically. There is one exception/cross over: the `useSearchParams` hook that we will cover in the next chapter.

In regards to nesting client and server components, we discovered that:

1. Dynamic or static rendering do not influence the nesting behavior of client and server components.
2. Nesting client components as leafs inside server components is a recommended pattern.
3. Nesting server components inside client components by importing them works but hurts performance because the server components become client components.
4. Therefor, nesting server components inside client components should be done using the composition pattern or should be avoided when possible.
