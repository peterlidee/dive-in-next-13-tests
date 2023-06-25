import ClientParentWithChildren from '../_components/ClientParentWithChildren';
import ServerChild from '../_components/ServerChild';

export default function page({ searchParams }) {
  // trigger dynamic rendering
  const foobar = searchParams?.foobar;
  return (
    <ClientParentWithChildren>
      <ServerChild />
    </ClientParentWithChildren>
  );
}
