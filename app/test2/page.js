import Link from 'next/link';

export default function Test2() {
  return (
    <div>
      <h1>Test 2</h1>
      <p>(Refresh page for reliable results.)</p>
      <ul>
        <li>
          <Link href='/test2/staticServer'>staticServer</Link>
        </li>
        <li>
          <Link href='/test2/staticClient'>staticClient</Link>
        </li>
        <li>
          <Link href='/test2/dynamicServer'>dynamicServer</Link>
        </li>
        <li>
          <Link href='/test2/dynamicClient'>dynamicClient</Link>
        </li>
      </ul>
    </div>
  );
}
