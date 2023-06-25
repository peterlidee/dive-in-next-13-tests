import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <div>
        <Link href='/test3'>Back to: Test 3</Link>
      </div>
    </div>
  );
}
