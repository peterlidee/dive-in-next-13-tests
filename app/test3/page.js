import Link from 'next/link';

export default function Test3() {
  return (
    <div>
      <h1>Test 3</h1>
      <ul>
        <li>
          <Link href='test3/staticClientInServer'>
            static route, client in server
          </Link>
        </li>
        <li>
          <Link href='test3/dynamicClientInServer'>
            dynamic route, client in server
          </Link>
        </li>
        <li>
          <Link href='test3/staticServerInClient'>
            static route, server in client
          </Link>
        </li>
        <li>
          <Link href='test3/dynamicServerInClient'>
            dynamic route, server in client
          </Link>
        </li>
        <li>
          <Link href='test3/staticServerInClientAsChildren'>
            static route, server in client as children
          </Link>
        </li>
        <li>
          <Link href='test3/dynamicServerInClientAsChildren'>
            dynamic route, server in client as children
          </Link>
        </li>
      </ul>
    </div>
  );
}
