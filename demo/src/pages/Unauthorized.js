import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { serverSideLogout } from "../utils/serversidelogout";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleOnLogout = () => {
    serverSideLogout();
    navigate("/login", { replace: true });
  };

  // useEffect(() => {
  //   handleOnLogout();
  // }, []);

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <button onClick={handleOnLogout}>Logout</button>
      <button onClick={goToDashboard}>dashboard</button>
    </div>
  );
};

export default Unauthorized;
