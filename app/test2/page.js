'use client'
import Link from 'next/link';
import { useLocale } from '../Provider';


export default function Test2(props) {
  console.log(props, '?page')
  
  const locale = useLocale();
  console.log(locale, '?l')
  return (
    <div>
      <h1>Test 2</h1>
      <ul>
        <li>
          <Link href='/test2/static/server'>/test2/static/server</Link>
        </li>
        <li>
          <Link href='/test2/static/client'>/test2/static/client</Link>
        </li>
        <li>
          <Link href='/test2/dynamic/server'>/test2/dynamic/server</Link>
        </li>
        <li>
          <Link href='/test2/dynamic/client'>/test2/dynamic/client</Link>
        </li>
      </ul>
    </div>
  );
}
