import Link from 'next/link';
import { useTranslation } from '../i18n';

export default async function Test2() {
  const { t } = await useTranslation('translation');
  console.log('>>>Server<<<', t('title'))
  return (
    <div>
      <h1>Test 2</h1>
      <p>{t('title')}</p>
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
