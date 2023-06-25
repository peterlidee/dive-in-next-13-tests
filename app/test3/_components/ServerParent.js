import ClientChild from './ClientChild';

export default function ServerParent() {
  console.log('Test 3: Rendering ServerParent');
  return (
    <div>
      <h2>ServerParent</h2>
      <ClientChild />
    </div>
  );
}
