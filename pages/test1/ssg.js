export default function ComponentSSG({ user }) {
  return (
    <div>
      <h2>Static Site Generation</h2>
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
