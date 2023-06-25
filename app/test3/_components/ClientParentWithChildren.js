'use client';

export default function ClientParentWithChildren({ children }) {
  console.log('Rendering ClientParentWithChildren');
  return (
    <div>
      <h2>ClientParentWithChildren</h2>
      {children}
    </div>
  );
}
