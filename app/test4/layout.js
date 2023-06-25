import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <div>
        <Link href='/test4'>Back to: Test 4</Link>
      </div>
    </div>
  );
}
