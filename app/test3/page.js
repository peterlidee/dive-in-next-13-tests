import Link from 'next/link';

export default function Test3() {
  return (
    <div>
      <h1>Test 3</h1>
      <h3>Static</h3>
      <ul>
        <li>
          <Link href='test3/static/clientInServer'>
            static route / client in server
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverInClient'>
            static route / server in client
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverInClientAsChildren'>
            static route / server in client as children
          </Link>
        </li>
      </ul>
      <h3>Dynamic</h3>
      <ul>
        <li>
          <Link href='test3/dynamic/clientInServer'>
            dynamic route / client in server
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverInClient'>
            dynamic route / server in client
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverInClientAsChildren'>
            dynamic route / server in client as children
          </Link>
        </li>
      </ul>
    </div>
  );
}
