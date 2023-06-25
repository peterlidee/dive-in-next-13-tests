export default function DynamicServer({ searchParams }) {
  console.log('Test 2: rendering DynamicServer');
  // trigger dynamic route
  const foobar = searchParams?.foobar;
  return (
    <div>
      <h2>Server component in a dynamic route</h2>
    </div>
  );
}
