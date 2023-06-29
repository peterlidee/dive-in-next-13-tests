import Link from 'next/link';

export default function Test4() {
  return (
    <div>
      <h1>Test 4</h1>
      <ul>
        <li>
          <Link href='/test4/dynamic?search=hello'>
            /test4/dynamic?search=hello
          </Link>
        </li>
        <li>
          <Link href='/test4/hybrid/nosuspense?search=hello'>
            /test4/hybrid/nosuspense?search=hello
          </Link>
        </li>
        <li>
          <Link href='/test4/hybrid/suspense?search=hello'>
            /test4/hybrid/suspense?search=hello
          </Link>
        </li>
      </ul>
    </div>
  );
}
