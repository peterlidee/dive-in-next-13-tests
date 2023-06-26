import { useState } from 'react';

export default function ComponentWithState() {
  const [value, setValue] = useState('Peter');
  return (
    <div>
      <h1>Component with state</h1>
      <label>
        name: <input value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
    </div>
  );
}
