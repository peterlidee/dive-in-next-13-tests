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
