import Link from 'next/link';

export default function Test3() {
  return (
    <div>
      <h1>Test 3</h1>
      <h3>Static</h3>
      <ul>
        <li>
          <Link href='test3/static/clientInServer'>
            client in server / static route
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverInClient'>
            server in client / static route
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverInClientAsChildren'>
            server in client as children / static route
          </Link>
        </li>
      </ul>
      <h3>Dynamic</h3>
      <ul>
        <li>
          <Link href='test3/dynamic/clientInServer'>
            client in server / dynamic route
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverInClient'>
            server in client / dynamic route
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverInClientAsChildren'>
            server in client as children / dynamic route
          </Link>
        </li>
      </ul>
    </div>
  );
}
