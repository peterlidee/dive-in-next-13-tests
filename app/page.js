import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <ul>
        <li>
          <Link href='/test1'>Test 1</Link>
        </li>
      </ul>
    </div>
  );
}
