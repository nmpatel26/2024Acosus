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
import isAuthorized from "./utils/auth";

import { useEffect } from "react";

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
        path="/Admin"
        element={
          <isAuthorized>
            <Admin />
          </isAuthorized>
        }
      />

      <Route
        path="/TraingHome"
        element={
          <isAuthorized>
            <TraingHome />
          </isAuthorized>
        }
      />

      <Route
        path="/Instructor"
        element={
          <isAuthorized>
            <Instructor />
          </isAuthorized>
        }
      />

      <Route
        path="/Inquestionare"
        element={
          <isAuthorized>
            <Inquestionare />
          </isAuthorized>
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
