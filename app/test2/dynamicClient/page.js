'use client';

export default function DynamicClient({ searchParams }) {
  console.log('Test 2: rendering DynamicClient');
  const foobar = searchParams?.foobar;
  return <div>Client component in a dynamic route</div>;
}
