export default function ComponentSSR({ user }) {
  console.log('Rendering ComponentSSR');
  return (
    <div>
      <h2>Server-side rendering</h2>
      <div>user: {user?.name}</div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  return {
    props: {
      user: user,
    },
  };
};
