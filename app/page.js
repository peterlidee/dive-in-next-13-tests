import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <ul>
        <li>
          <Link href='/page1'>Test 1</Link>
        </li>
      </ul>
    </div>
  );
}
