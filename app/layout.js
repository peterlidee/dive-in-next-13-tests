import Link from 'next/link';

export const metadata = {
  title: 'TODO Client server static dynamic rendering tests',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <div>
          <Link href='/'>Back to: Home</Link>
        </div>
      </body>
    </html>
  );
}
