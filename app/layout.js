import Link from 'next/link';
import { headers, cookies } from 'next/headers';
import React, { useContext } from 'react';
import Provider from './Provider'
const getLocale = async (a, b,) => {
  // true, true
  console.log(!!a, !!b)
  return 'en';
}


export default async function RootLayout({ children }) {
  const locale = await getLocale(headers(), cookies());

  return (
    <html lang='en'>
      <body>
        <Provider locale={locale}>
          {children}
        </Provider>
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
