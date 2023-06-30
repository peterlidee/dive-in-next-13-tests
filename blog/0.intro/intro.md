# Intro

With the stable release of the new `app router` in `Next` I decided it was high time to look into `Next 13`.

Reading the migration guide was slightly confusing but I felt like I broadly understood the concepts. But my confusion grew.

When I tried to think through the combination of client and server components with static and dynamic rendering I completely lost track. Even worse, the more I read about it, the more lost I got. It reminded me of the confusion I felt before I understood the `useStaticProps` and `useServerSide` functions.

So I tried to reset and start over. I soon discovered that I had missed some nuances and misinterpreted certain concepts.

As I was writing I soon to turn this into a series of posts because it had been a while since I posted anything but it also seemed that not a lot had been written on this topic.

## Series breakdown

So, in this series I'm going to share the things I learned. I will make nuances more explicit and use in depth examples to explain things and hopefully save you from the confusion I felt.

In the first 2 chapters we take a more theoretic look at server and client components & static and dynamic rendering.

We then look back to the old `Next`. This helped me a lot. Placing the `new` concepts into a frame I already know clarified a lot of things.

These first parts will have prepared you for some more practical `Next 13`. We finally start combining static and dynamic rendering with client and server components in easy to understand examples.

In part 5 we cover nesting and in the last part, we the `useSearchParams` hook, which is interesting and useful but a bit of a handful.

## Repo

All of the examples I use are available in [github](TODO).

<br />

Let's dive in.
