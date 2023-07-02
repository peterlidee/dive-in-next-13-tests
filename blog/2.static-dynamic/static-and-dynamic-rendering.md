# Static and dynamic rendering in Next 13

Static and dynamic rendering are both forms of server-side rendering.

- Static rendering means that components are pre-rendered on the server at **build time** (`next build`). The result of this prerendering is cached and then served.

- Dynamic rendering means that components are rendered on the server at **request time**. The result of this (pre)rendering is not cached.

## When to use dynamic rendering?

Static rendering is the default. It is `Next` that decides which routes will be rendered dynamically. Dynamic rendering happens when `Next` detects either:

1. Dynamic fetches
2. Dynamic functions

### Dynamic fetches

To understand dynamic fetching it's necessary to take a look at how data fetching was reworked in `Next 13`. I will give a quick summary here but all info is in the [docs](https://nextjs.org/docs/app/building-your-application/data-fetching).

`Next` extended the native `fetch api` with caching and revalidating options. This means that you can **cache** fetch results in the `app router` or opt not to at component level.

There are 3 possible fetches:

1/ Static: puts the result of the fetch in the cache indefinitely.

```js
fetch('https://...');
fetch('https://...', { cache: 'force-cache' });
// cache: 'force-cache' is the default, so above two are equal
```

2/ Revalidate data: puts the result of the fetch in the cache but revalidates cache at interval.

```js
fetch('https://...', { next: { revalidate: 10 } });
```

3/ Dynamic fetches: the results of the fetch are never cached.

```js
fetch('https://...', { cache: 'no-store' });
```

Now, let's go back to static and dynamic rendering. As stated above, `Next` will dynamically render when it encounters a dynamic fetch. That also means it will statically render when there is no dynamic fetch (and no dynamic functions).

These new fetch methods align with the `page router` data fetching methods that we already knew:

- Static fetch + static render = SSG (`getStaticProps`)
- Revalidate fetch + static render = ISR (`getStaticProps with revalidate props`)
- Dynamic fetch + dynamic render = SSR (`getServerSideProps`)

Be aware, in the `app router`, `getStaticProps` and `getServerSideProps` no longer exist. You now use the enhanced fetch methods. But, you can still use `getStaticProps` and `getServerSideProps` in your `pages` folder and you can still use the `pages router` alongside the new `app router`.

Also note that fetching is no longer limited to page level. The old `pages router` methods like `getStaticProps` can only be called at page level. In `app router`, using fetch, you can setup server-side fetching in any component.

When `Next` encounters a dynamic fetch, it switches to dynamic rendering. This means that the prerendering will happen server-side not at build time but at request time. This should be clear now. Dynamic rendering happens at request time, not at build time.

### Dynamic functions

The second scenario where `Next` uses dynamic rendering is when it encounters dynamic functions. Dynamic functions are:

- `cookies()`: allows you to read or write cookies. This is obvious, there are no cookies are build time, so it has to happen at request time.
- `header()`: allows you to read request headers. Again, obvious that headers only exist at request time.
- `useSearchParams` is a hook that lets you read the current URL's query string. So using this hook on this page: `https://...?query=hello` will let you retrieve this value: `{ query: 'hello' }`. It is once more quite obvious that there are no search parameters present at build time so this hook can only be used at request time. A big note here. This hook can be rendered static and dynamic. It's complicated and we will spend a chapter on it later.
- `searchParams` prop in pages. In `app router`, each `page.js` file (that is each root route) receives props. One of these props is `searchParams`. So it is similar to the `useSearchParams` hook but it is a prop and only accessible in the special `page.js` file.

So, these dynamic functions: `cookies` and `headers`, `useSearchParams` hook and `searchParams` props will make `Next` render a page dynamically. This means prerendering server-side at request time. The `useSearchParams` hook is complicated and does not automatically lead to dynamic rendering. More on that later.

## Conclusion

If there are no dynamic fetches (no cache) or dynamic functions (`cookies`, `headers`, `useSearchParams` or `searchParams`), `Next` uses static rendering. That means that the route is prerendered server-side at build time and cached. Static rendering makes your project more performant, better, faster.

But static rendering is limited in use. When you need the latest data from a database for example, or when data fetching requires authentication or when you need to display search results from a search query. In these cases, we can't render statically and have to use dynamic rendering.

```
static  : server-side at build time
dynamic : server-side at request time
```

This concludes the theoretic part on static and server rendering. Before we start combining these concepts, we take a look at how older versions of `Next` already applied most of this. This gives us a better base, we learn from what we already know.
