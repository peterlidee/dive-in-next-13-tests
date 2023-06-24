export default function DynamicServer({ searchParams }) {
  console.log('Test 2: rendering DynamicServer');
  const foobar = searchParams?.foobar;
  return <div>Server component in a dynamic route</div>;
}
