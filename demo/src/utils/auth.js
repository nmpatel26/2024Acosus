import { Navigate } from "react-router-dom";

const isAuthorized = ({ children }) => {
  // check if user is logged in and has role of admin or advisor using session cookie
  const role = cookies.get("userRole");
  const email = cookies.get("userEmail");
  if (role === "admin" || role === "advisor") {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};
export default isAuthorized;
