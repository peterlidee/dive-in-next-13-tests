import { Suspense } from 'react';
import Search from './Search';
import Loading from './Loading';

export default function NavBarWithSuspense() {
  console.log('Test 4: Rendering NavBarWithSuspense');
  return (
    <nav>
      <h3>Navbar</h3>
      <span>some links</span>
      {' / '}
      <Suspense fallback={<Loading />}>
        <Search />
      </Suspense>
    </nav>
  );
}
