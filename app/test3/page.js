import Link from 'next/link';

export default function Test3() {
  return (
    <div>
      <h1>Test 3</h1>
      <ul>
        <li>
          <Link href='test3/static/clientinserver'>
            client in server / static route
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/clientinserver'>
            client in server / dynamic route
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverinclient'>
            server in client / static route
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverinclient'>
            server in client / dynamic route
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverinclientaschildren'>
            server in client as children / static route
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverinclientaschildren'>
            server in client as children / dynamic route
          </Link>
        </li>
      </ul>
    </div>
  );
}
