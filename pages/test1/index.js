import Link from 'next/link';

export default function Test1() {
  return (
    <div>
      <h1>Test 1</h1>
      <ul>
        <li>
          <Link href='/test1/static'>/test1/static</Link>
        </li>
        <li>
          <Link href='/test1/staticWithState'>/test1/staticWithState</Link>
        </li>
        <li>
          <Link href='/test1/ssg'>/test1/ssg</Link>
        </li>
        <li>
          <Link href='/test1/ssr'>/test1/ssr</Link>
        </li>
      </ul>
      <div>
        <Link href='/'>home</Link>
      </div>
    </div>
  );
}
