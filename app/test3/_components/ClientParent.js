'use client';

import ServerChild from './ServerChild';

export default function ClientParent() {
  console.log('Rendering ClientParent');
  return (
    <div>
      <h1>ClientParent</h1>
      <ServerChild />
    </div>
  );
}
