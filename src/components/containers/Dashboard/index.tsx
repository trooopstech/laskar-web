import useAuth from "hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4">
      <h1>Halo {user?.email}</h1>
    </div>
  );
};

export default Dashboard;
