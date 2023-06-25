import ServerParent from '../../_components/ServerParent';

export default function page({ searchParams }) {
  // trigger dynamic rendering
  const foobar = searchParams?.foobar;
  return <ServerParent />;
}
