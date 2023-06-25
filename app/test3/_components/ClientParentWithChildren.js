'use client';

export default function ClientParentWithChildren({ children }) {
  console.log('Rendering ClientParentWithChildren');
  return (
    <div>
      <h1>ClientParentWithChildren</h1>
      {children}
    </div>
  );
}
