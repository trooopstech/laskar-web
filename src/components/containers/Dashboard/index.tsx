import useClass from "hooks/useClasses";
import { useEffect } from "react";

const Dashboard = () => {
  const { join } = useClass();

  useEffect(() => {
    if (window.localStorage.getItem("class")) {
      join(window.localStorage.getItem("class") as string);
      window.localStorage.removeItem("class");
    }
  }, []);

  return (
    <div className="container p-4">
      <h1>Ini Dashboard</h1>
    </div>
  );
};

export default Dashboard;
