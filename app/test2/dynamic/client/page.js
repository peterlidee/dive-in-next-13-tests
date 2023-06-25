'use client';

export default function DynamicClient({ searchParams }) {
  console.log('Test 2: rendering DynamicClient');
  // trigger dynamic route
  const foobar = searchParams?.foobar;
  return (
    <div>
      <h2>Client component in a dynamic route</h2>
    </div>
  );
}
