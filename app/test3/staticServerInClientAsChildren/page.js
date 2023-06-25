import ClientParentWithChildren from '../_components/ClientParentWithChildren';
import ServerChild from '../_components/ServerChild';

export default function page() {
  return (
    <ClientParentWithChildren>
      <ServerChild />
    </ClientParentWithChildren>
  );
}
