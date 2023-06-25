import ClientChild from './ClientChild';

export default function ServerParent() {
  console.log('Test 3: Rendering ServerParent');
  return (
    <div>
      <h1>ServerParent</h1>
      <ClientChild />
    </div>
  );
}
