import Link from 'next/link';

export default function Test1() {
  return (
    <div>
      <h1>Test 1</h1>
      <ul>
        <li>
          <Link href='/test1/static'>Component 1</Link>
        </li>
        <li>
          <Link href='/test1/staticWithState'>Component with state</Link>
        </li>
        <li>
          <Link href='/test1/ssg'>Component SSG</Link>
        </li>
        <li>
          <Link href='/test1/ssr'>Component SSR</Link>
        </li>
      </ul>
      <div>
        <Link href='/'>Back to home</Link>
      </div>
    </div>
  );
}
