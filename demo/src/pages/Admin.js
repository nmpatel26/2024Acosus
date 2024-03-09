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

import React, { useEffect, useState } from "react";

import UserHome from "./LandingPage";
import AdminHome from "./AdminHome";
import Instructor from "./Instructor";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [advisor, setAdvisor] = useState(false);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType === "Admin") {
      setAdmin(true);
    } else if (storedUserType === "Advisor") {
      setAdvisor(true);
    }
  }, []);

  return (
    admin ? <AdminHome /> : (advisor ? <Instructor /> : <UserHome userData={userData} />)
  );
}
