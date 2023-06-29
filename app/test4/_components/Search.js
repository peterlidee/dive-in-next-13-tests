'use client';

// client component
// dynamic (cause parent)

import { useSearchParams } from 'next/navigation';

export default function Search() {
  console.log('Test 4: Rendering Search');

  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  console.log('Search parameter', search);

  return <span>search: {search}</span>;
}
