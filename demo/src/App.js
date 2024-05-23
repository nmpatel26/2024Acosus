import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import TraingHome from "./pages/TraingHome";
import Instructor from "./pages/Instructor";
import Inquestionare from "./pages/Inquestionare";
import Instructorcreateaccount from "./pages/Instructorcreateaccount";
// import isAuthorized from "./utils/auth";
import Unauthorized from "./pages/Unauthorized";

import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
// import { IsAuthorized } from "./utils/auth";
import AdminHome from "./pages/AdminHome";

// const IsAuthorized = ({ children }) => {
//   const userRole = Cookies.get("userRole");
//   if (userRole === "admin" || userRole === "instructor") {
//     return children;
//   } else if (userRole === "User") {
//     return <Navigate to="/" />;
//   } else {
//     return <Navigate to="/unauthorized" />;
//   }
// };

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/newpassword":
        title = "";
        metaDescription = "";
        break;
      case "/personality":
        title = "";
        metaDescription = "";
        break;

      case "/settings":
        title = "";
        metaDescription = "";
        break;
      case "/forgotpassword":
        title = "";
        metaDescription = "";
        break;
      case "/createaccount":
        title = "";
        metaDescription = "";
        break;
      case "/admin":
        title = "";
        metaDescription = "";
        break;
      case "/TraingHome":
        title = "";
        metaDescription = "";
        break;
      case "/ModelFeatures":
        title = "";
        metaDescription = "";
        break;
      case "/Data":
        title = "";
        metaDescription = "";
        break;
      case "/ModelsInfo":
        title = "";
        metaDescription = "";
        break;
      case "/Instructor":
        title = "";
        metaDescription = "";
        break;
      case "/SearchUser":
        title = "";
        metaDescription = "";
        break;
      case "/Instudent":
        title = "";
        metaDescription = "";
        break;

      case "/Inquestionare":
        title = "";
        metaDescription = "";
        break;
      case "/Instructorcreateaccount":
        title = "";
        metaDescription;
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  // get userRole cookie value and check if it is equal to "admin" or "instructor" and return the child component if it is true

  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/admin"
        element={
          // <IsAuthorized allowedRoles={"User"}>
          <AdminHome />
          // </IsAuthorized>
        }
      />

      <Route
        path="/dashboard"
        element={
          // <IsAuthorized allowedRoles={"Admin"}>
          <Admin />
          // </IsAuthorized>
        }
      />
      <Route
        path="/student-home"
        element={<LandingPage />}
      />

      <Route
        path="/TraingHome"
        element={
          //  <IsAuthorized allowedRoles={"Admin"}>
          <TraingHome />
          // </IsAuthorized>
        }
      />

      <Route
        path="/Instructor"
        element={
          //  <IsAuthorized allowedRoles={("Admin", "Advisor")}>
          <Instructor />
          // </IsAuthorized>
        }
      />

      <Route
        path="/Inquestionare"
        element={
          //  <IsAuthorized allowedRoles={("Admin", "Advisor")}>
          <Inquestionare />
          // </IsAuthorized>
        }
      />
      <Route
        path="/Instructorcreateaccount"
        element={
          //  <IsAuthorized allowedRoles={("Admin", "Advisor")}>
          <Instructorcreateaccount />
          // </IsAuthorized>
        }
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />
    </Routes>
  );
}
export default App;
