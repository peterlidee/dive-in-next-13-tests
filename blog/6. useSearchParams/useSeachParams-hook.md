# The useSearchParams hook and it's influence on client and server components & dynamic and static rendering

The `useSearchParams` hook is a bit of a hot mess because it combines server and client-side rendering in a way no other function does. It took me a while to understand this hook but I will try to explain it as clearly as I can.

## Refresher

`useSearchParams` is a hook that returns the search parameters from a url. It returns a read-only version of the [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) interface.

We've talked about the `useSearchParams` hook before. Firstly it got mentioned in context of dynamic rendering. `Next` renders a route dynamically when it encounters a dynamic fetch or dynamic functions. As one of those functions we mentioned the `useSearchParams` hook with a note: it's complicated.

The second mention of this hook was in the context of client components. `useSearchParams` is one of the hooks that requires a client component.

So, we will be using `useSearchParams` in client components in both static and dynamic routes. Also, `useSearchParams` can influence the behavior of other server and client components and it can also cause client-side rendering. As I said, it's complicated.

## The essence

The thing that makes `useSearchParams` very special is that it can be used in dynamic routes but also in a hybrid static/client-side route. This sets it apart from the other dynamic functions (`cookies`, `headers` and `searchParams` props) that will force the page / route into dynamic rendering.

Let's cover `useSearchParams` in dynamic rendering first and then talk about this hybrid rendering.

## Dynamic rendering

Dynamic rendering means that the route will be prerendered server-side at request time (not at build time).

In itself, the `useSearchParams` will not opt the route into dynamic rendering. That means that there needs to be another dynamic function or a dynamic fetch to get a dynamic render.

A practical example of this could be a user purchase history page on a webshop, sorted by price. Obviously you can't statically render the purchase history of all your users because there are too many of them and the page itself would be quickly outdated.

So, `Next` offers you dynamic fetching that doesn't cache fetch results. Using dynamic fetching means you turned this route into dynamic rendering. On top of that, you sorted all your purchases by price, instead of the default sort by date. (just an example)

The webshop stored this sort option in the url: `webshop.com/account/purchases?sortBy=price`. To recover the searchParam `sortBy` you use the `useSearchParams` hook.

So, this scenario had a dynamic fetch causing the route to render dynamically. Our `useSearchParams` hook would then be used in a dynamic render.

### Test

We will use another, more simple example for our tests. the goal is to get a better feel for `useSearchParams` in a dynamic render.

This is our root file for route `/test4/dynamic`:

```jsx
// app/test4/dynamic/page.js

import Navbar from '../_components/Navbar';

export default function Dynamic({ searchParams }) {
  // trigger a dynamic rendering
  const foobar = searchParams?.foobar;
  return (
    <div>
      <h2>useSearchParams in a dynamic route</h2>
      <Navbar />
    </div>
  );
}
```

We use the `searchParams` page prop to force a dynamic render. Note, there is a [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) that enables you to force f.e. dynamic rendering. But I want to keep things as simple as possible. Just know this exists.

We are using a `<NavBar />` component with 'some links' and a `<Search />` component. This `<Search />` component is where we call `useSearchParams`. Note how we use `<Search />` as a client component leaf at the end of our route.

```jsx
// app/test4/_components/NavBar.js
import Search from './Search';

export default function Navbar() {
  console.log('Test 4: Rendering NavBar');
  return (
    <nav>
      <h3>Navbar</h3>
      <span>some links</span>
      {' / '}
      <Search />
    </nav>
  );
}
```

In `<Search />` we use the `useSearchParams` hook, check for a 'search' searchParam and render it in the component.

```jsx
// app/test4/_components/Search.js

'use client';

import { useSearchParams } from 'next/navigation';

export default function Search() {
  console.log('Test 4: Rendering Search');

  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  console.log('Search parameter', search);

  return <span>search: {search}</span>;
}
```

So we have 2 components: `<NavBar />` and `<Search />`. Let's first figure out how we expect them to run. We expect dynamic rendering, because our `page` triggers a dynamic render of the entire route.

- `<NavBar />`: server component (also no client component parent)
- `<Search />`: `use client` so client component

Running the test on route `test4/dynamic?search=hello` confirms that all components correctly run as client or server components and that the route renders dynamically. 'hello' logs in the terminal and the browser console.

So, nothing special here. Everything works as expected.

## Static? render

Let's run the same test in a static route. We remove the 'dynamic' trigger from page and use that in route `test4/hybrid/nosuspense?search=hello`: (ignore hybrid for now, think of this as static)

```jsx
// app/test4/static/nosuspense/page.js

import NavBarWithSuspense from '../../_components/NavBarWithSuspense';

export default function NoSuspense() {
  return (
    <div>
      <h2>useSearchParams in a hybrid route</h2>
      <NavBarWithSuspense />
    </div>
  );
}
```

Again, all tests work as expected. Route is static. All components except `<Search />` are server and we get 'hello' in both terminal and console.

However, strange things have happened in our preprendered HTML. Remember, `Next` prerenders static routes server-side at build time. We can visit these prerenders in the `.next/server/app` folder.

We have ran similar tests before on both client and server components. So what do we expect given our previous experiences? Some HTML code, yes? Look back at the components. This is what I expected:

```html
<!-- brain render, not real -->

<div>
  <h2>useSearchParams in a hybrid route</h2>
  <div>
    <h3>Navbar</h3>
    <span>some links</span>
    /
    <span>
      search:
      <!-- empty spot here?? -->
    </span>
  </div>
</div>
```

Yet the result was very different. There was an HTML file: `.next/server/app/test4/hybrid/nosuspense.html` so it was statically rendered. But, the `body` tag contains no HTML at all (we ignore the nav from `app/layout.js`). Only scripts.

screenshot-static.html.png

We mentioned before that these prerendered files are optimized server files, not meant to be humanly readable. But, using the search function, we are able to find string containing our elements, deeply nested inside arrays and objects. This snippet f.e. represents `<h3>NavBar<h3>` from our `<NavBar />` element.:

```js
['$', 'h3', null, { children: 'Navbar' }];
```

So, there was some prerendering done. Our JSX was translated to Javascript. On top of that, the `<Search />` component was missing. Our `<Search />` component contains the string 'search' but we did not find it. Meaning, the `<Search />` component was not prerendered!

However, when we run our current test route in development mode and then open the network tab in our browser console: we find the following:

screenshot (todo new screenshot)

The response from the server (dev server) does contain the string 'search'. It was server-side rendering in other words. What happened here is `Next` infamous client-side rendering that actually happens server-side. We looked into this in previous chapters.

One last test. Comment out the `<Search />` component in the `<NavBar />`, run `next build` and take a look at our prerendered file. We get fully prerendered HTML. This means that our `useSearchParams` hook is the culprit causing all these weird variations.

Let me go over this again. When using `useSearchParams` in a static route we found out that:

- The prerendered HTML file was prerendered differently: our components were translated into JS but into HTML.
- The actual component containing the `useSearchParams` was not statically prerendered.
- Said component was client-side rendered which in `Next` means it was rendered a bit on the client and a bit on the server.
- This all was caused because we used `useSearchParams`.

So, we got a route where most of the components where statically rendered yet one component, the one using `useSearchParams`, was client-side rendered.

## Next docs

We just investigated this render process bottom-up. Now, let's go top-down by starting with the theory. Here is what `Next` docs say about rendering `useSearchParams` in a static route:

> If a route is statically rendered, calling useSearchParams() will cause the tree up to the closest Suspense boundary to be client-side rendered.
>
> This allows a part of the page to be statically rendered while the dynamic part that uses searchParams is client-side rendered.
>
> You can reduce the portion of the route that is client-side rendered by wrapping the component that uses useSearchParams in a Suspense boundary.
>
> ([Next docs](https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering))

We haven't used the `suspense` boundary yet but parts of this definition do align with our findings: `useSearchParams` can cause partly static, partly client-side rendering. A hybrid form of rendering. It explains why our route prerendered weirdly.

## Suspense

`suspense` is a `React` component that lets you display a fallback until its children have finished loading.

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

So, while `SomeCompent` is in a loading state, the `<Loading />` component gets rendered. `suspense` is newly implemented in `Next` `app router`.

## Hybrid example

From the docs we learned that while using `useSearchParams` in a static route:

> You can reduce the portion of the route that is client-side rendered by wrapping the component that uses useSearchParams in a Suspense boundary.

So, let's do that. We make a new route `/test4/hybrid/suspense?search=hello`. We rewrite the `/test4/hybrid/nosuspense` example with suspense.

```jsx
// app/test4/hybrid/suspense/page.js

import NavBarWithSuspense from '../../_components/NavBarWithSuspense';

export default function Suspense() {
  return (
    <div>
      <h2>useSearchParams in a hybrid route with suspense</h2>
      <NavBarWithSuspense />
    </div>
  );
}
```

We have a new `NavBarWithSuspense` component that wraps `<Search />` in a suspense component and provides a `<Loading />` fallback.

```jsx
// app/test4/_components/NavBarWithSuspense.js

import { Suspense } from 'react';
import Search from './Search';
import Loading from './Loading';

export default function NavBarWithSuspense() {
  console.log('Test 4: Rendering NavBarWithSuspense');
  return (
    <nav>
      <h3>Navbar</h3>
      <span>some links</span>
      {' / '}
      <Suspense fallback={<Loading />}>
        <Search />
      </Suspense>
    </nav>
  );
}
```

This is our simple loading component:

```jsx
// app/test4/_components/Loading.js

export default function Loading() {
  console.log('Test 4: Rendering Loading');
  return <span>Loading...</span>;
}
```

And finally, our `<Search />` component remained the same:

```jsx
// app/test4/_components/Search.js

'use client';

import { useSearchParams } from 'next/navigation';

export default function Search() {
  console.log('Test 4: Rendering Search');

  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  console.log('Search parameter', search);

  return <span>search: {search}</span>;
}
```

Before we run the tests we determine what we expect to happen:

We expect `page` and `<Navbar />` to have been statically prerendered. `<Search />` will be client-side rendered but in `Next` that means it will be server-side rendered. Not sure what `<Loading />` will do. Run the tests.

## Results

```
(next cli)

○ /test4/hybrid/suspense
```

`Next cli` defined the route as static. Maybe in the future, `Next` will make an update to the cli and add a new name for this specific hybrid rendering.

Our prerendered HTML:

```html
<!-- .next/server/app/test4/hybrid.html -->
<!-- edited -->
<body>
  <div>
    <h2>useSearchParams in a hybrid route with suspense</h2>
    <nav>
      <h3>Navbar</h3>
      <span>some links</span> /
      <!--$!--><template data-dgst="NEXT_DYNAMIC_NO_SSR_CODE"></template
      ><span>Loading...</span
      ><!--/$-->
    </nav>
  </div>
  <!-- a lot of scripts -->
  <!-- our JSX, translated into JS -->
</body>
```

Interesting! We do have prerendered HTML this time. Everything except our `<Search />` component. We still have all of our JSX translated into Javascript. This however does not include `<Search />`. (We searched for 'search' and found nothing) Finally, we have a `<template>` tag and `<Loading />` prerendered into HTML: `<span>Loading...</span>`.

So, our `<Search />` component was replaced with some sort of template. `Suspense` seems to consider this a loading state and therefore rendered our fallback. Everything else was 'normally' prerendered.

Our network tab shows following:

insert image (update with final title and route TODO)

Proving that the component was client-side rendered the `Next` way, server-side. Note that our suspense fallback is gone.

So, all expectations where met and this is great! We can statically prerender this route which is great for performance and still use searchParams because `Next` allows us to render that component only client-side.

The downside is, it's not the easiest pattern to create. Even this simple example required some effort.

## Conclusion

A route gets opted into dynamic rendering when `Next` encounters a dynamic fetch or a dynamic function. One of these dynamic functions is the `useSearchParams` hook. However, `useSearchParams` does by itself not opt a route into dynamic rendering. On top of that, it can by used in static rendering.

In a dynamic route, `useSearchParams` works pretty much as expected. The only 'special' feature here is that `useSearchParams` by itself will not cause a dynamic route render.

Things are more interesting with static rendering. As so often with `Next`, it tries to optimize performance. This time by creating a hybrid server / client-side route, where some components get rendered statically (server-side at build time) and others client-side (Which means also server-side in `Next`). But only when you place a `Suspense` boundary, something you should always do (in static rendering).
