'use client';

import ServerChild from './ServerChild';

export default function ClientParent() {
  console.log('Rendering ClientParent');
  return (
    <div>
      <h2>ClientParent</h2>
      <ServerChild />
    </div>
  );
}
