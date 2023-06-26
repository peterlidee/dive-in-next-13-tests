import { useState } from 'react';

export default function ComponentWithState() {
  const [value, setValue] = useState('Peter');
  return (
    <label>
      name: <input value={value} onChange={(e) => setValue(e.target.value)} />
    </label>
  );
}
