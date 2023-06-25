import Link from 'next/link';

export default function Test2() {
  return (
    <div>
      <h1>Test 2</h1>
      <p>(Refresh page for reliable results.)</p>
      <ul>
        <li>
          <Link href='/test2/static/server'>staticServer</Link>
        </li>
        <li>
          <Link href='/test2/static/client'>staticClient</Link>
        </li>
        <li>
          <Link href='/test2/dynamic/server'>dynamicServer</Link>
        </li>
        <li>
          <Link href='/test2/dynamic/client'>dynamicClient</Link>
        </li>
      </ul>
    </div>
  );
}
