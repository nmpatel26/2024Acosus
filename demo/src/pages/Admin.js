// import React, { useEffect, useState } from "react";

// import UserHome from "./LandingPage";
// import AdminHome from "./AdminHome";
// import Advisor from "./Instructor"

// export default function UserDetails() {
//   const [userData, setUserData] = useState("");
//   const [admin, setAdmin] = useState(false);

//   useEffect(() => {
//     const storeduserType = localStorage.getItem('userType');
//     if (storeduserType == "Admin") {
//         setAdmin(true);
//     }

// }, []);

//   return (
//     admin ?<AdminHome/> : <UserHome userData={userData} />
//     );
// }

import { useEffect, useState } from "react";

import UserHome from "./LandingPage";
import AdminHome from "./AdminHome";
import Instructor from "./Instructor";
// import { useCheckRole } from "../utils/auth";
import { ADMIN_ROLE, ADVISOR_ROLE, USER_ROLE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

export default function UserDetails() {
  // const [admin, setAdmin] = useState(false);
  // const [advisor, setAdvisor] = useState(false);
  const [userRole, setUserRole] = useState("");
  // const { isLoggedIn } = useCheckRole([ADMIN_ROLE, ADVISOR_ROLE, USER_ROLE]);
  // if (!isLoggedIn) {
  //   navigate("/login");
  // }

  // useEffect(() => {
  //   const storedUserType = localStorage.getItem("userType");
  //   console.log("User type from storage:", storedUserType);
  //   if (storedUserType === "Admin") {
  //     console.log("inside admin effect");
  //     setAdmin(true);
  //     console.log("after setting admin", admin);
  //   } else if (storedUserType === "Advisor") {
  //     console.log("inside advisor effect");
  //     setAdvisor(() => true);
  //     console.log("after setting advisor", advisor);
  //   }
  // }, []);
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");

    console.log("User type from storage:", storedUserType);
    setUserRole(storedUserType);
  }, []);

  // const remountComponent = () => {
  //   setTemp((prevKey) => prevKey + 1);
  // };

  // console.log("admin", admin);
  console.log();
  // console.log("advisor", advisor);
  console.log("userRole", userRole);
  // if (userRole === ADMIN_ROLE) {
  //   console.log("inside admin");
  //   return <AdminHome />;
  // } else if (userRole === USER_ROLE) {
  //   console.log("inside advisor");
  //   // return toInstructor();
  //   return <LandingPage />;
  //   // return null;
  //   // } else if (userRole === "") {
  //   //   remountComponent();
  // } else {
  //   // return <UserHome userData={userData} />;
  //   return <Instructor />;
  // }

  if (userRole === ADVISOR_ROLE) {
    console.log("inside advisor");
    return <Instructor />;
  }
  if (userRole === USER_ROLE) {
    console.log("inside user");
    return <LandingPage />;
  }
  if (userRole === ADMIN_ROLE) {
    return <AdminHome />;
  }

  // return admin ? (
  //   <AdminHome />
  // ) : advisor ? (
  //   <Instructor />
  // ) : (
  //   <UserHome userData={userData} />
  // );
}
