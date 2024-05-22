import { useLocation, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToLogin = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <button onClick={goToLogin}>Login</button>
    </div>
  );
};
