export default function ComponentSSG({ user }) {
  return (
    <div>
      <h1>Static Site Generation</h1>
      <div>user: {user?.name}</div>
    </div>
  );
}

export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  return {
    props: {
      user: user,
    },
  };
};
