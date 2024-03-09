import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import Demographic from "./pages/Demographic";
import ChangePassword from "./pages/Changepassword";
import Questionare from "./pages/Questionare";
import Personality from "./pages/Personality";
import Admin from "./pages/Admin";
import TraingHome from "./pages/TraingHome";
import ModelFeatures from "./pages/ModelFeatures";
import Data from "./pages/Data";
import ModelsInfo from "./pages/ModelsInfo";
import Instructor from "./pages/Instructor"
import Instudent from "./pages/Instudent"
import SearchUser from "./pages/SearchUser"
import Assesmentresult from "./pages/Assesmentresult"
import Inquestionare from "./pages/Inquestionare";
import Instructorcreateaccount from "./pages/Instructorcreateaccount";

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
      case "/demographic":
        title = "";
        metaDescription = "";
        break;
      case "/questionare":
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
      case "/Assesmentresult":
        title = "";
        metaDescription = "";
        break;
      case "/Inquestionare":
        title = "";
        metaDescription = "";
        break;
      case "/Instructorcreateaccount": title = ""; metaDescription; break;
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
      <Route path="/" element={<Login />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/personality" element={<Personality />} />
      <Route path="/demographic" element={<Demographic />} />
      <Route path="/questionare" element={<Questionare />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/TraingHome" element={<TraingHome />} />
      <Route path="/ModelFeatures" element={<ModelFeatures />} />
      <Route path="/Data" element={<Data />} />
      <Route path="/ModelsInfo" element={<ModelsInfo />} />
      <Route path="/Instructor" element={<Instructor />} />
      <Route path="/Instudent" element={<Instudent />} />
      <Route path="/SearchUser" element={<SearchUser />} />
      <Route path="/Assesmentresult" element={<Assesmentresult />} />
      <Route path="/Inquestionare" element={<Inquestionare />} />
      <Route path="/Instructorcreateaccount" element={<Instructorcreateaccount />} />
    </Routes>

  );
}
export default App;
