import { useState } from 'react';

export default function ComponentWithState() {
  const [value, setValue] = useState('Peter');
  return (
    <div>
      <h2>Component with state</h2>
      <label>
        name: <input value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
    </div>
  );
}
