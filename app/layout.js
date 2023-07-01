import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <nav>
          <h3>Nav</h3>
          <ul>
            <li>
              <Link href='/'>home</Link>
            </li>
            <li>
              <Link href='/test1'>/test1</Link>
            </li>
            <li>
              <Link href='/test2'>/test2</Link>
            </li>
            <li>
              <Link href='/test3'>/test3</Link>
            </li>
            <li>
              <Link href='/test4'>/test4</Link>
            </li>
          </ul>
        </nav>
      </body>
    </html>
  );
}
