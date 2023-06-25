import ClientParent from '../_components/ClientParent';

export default function page({ searchParams }) {
  // trigger dynamic rendering
  const foobar = searchParams?.foobar;
  return <ClientParent />;
}
