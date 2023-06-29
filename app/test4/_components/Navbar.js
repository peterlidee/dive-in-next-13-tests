// server component
// dynamic (cause parent)

import Search from './Search';

export default function Navbar() {
  console.log('Test 4: Rendering NavBar');
  return (
    <nav>
      <h3>Navbar</h3>
      <span>some links</span>
      {' / '}
      <Search />
    </nav>
  );
}
