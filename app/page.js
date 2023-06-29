import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <ul>
        <li>
          <Link href='/test1'>Test 1 (pages router)</Link>
        </li>
        <li>
          <Link href='/test2'>Test 2</Link>
        </li>
        <li>
          <Link href='/test3'>Test 3</Link>
        </li>
        <li>
          <Link href='/test4'>Test 4</Link>
        </li>
      </ul>
    </div>
  );
}
