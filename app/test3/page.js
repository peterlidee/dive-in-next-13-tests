import Link from 'next/link';

export default function Test3() {
  return (
    <div>
      <h1>Test 3</h1>
      <ul>
        <li>
          <Link href='test3/static/clientInServer'>
            test3/static/clientInServer
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverInClient'>
            test3/static/serverInClient
          </Link>
        </li>
        <li>
          <Link href='test3/static/serverInClientAsChildren'>
            test3/static/serverInClientAsChildren
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href='test3/dynamic/clientInServer'>
            test3/dynamic/clientInServer
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverInClient'>
            test3/dynamic/serverInClient
          </Link>
        </li>
        <li>
          <Link href='test3/dynamic/serverInClientAsChildren'>
            test3/dynamic/serverInClientAsChildren
          </Link>
        </li>
      </ul>
    </div>
  );
}
