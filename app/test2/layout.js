import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <div>
        <Link href='/test2'>Back to: Test 2</Link>
      </div>
    </div>
  );
}
