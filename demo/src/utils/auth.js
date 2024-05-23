// import Cookies from "js-cookie";
// const isAuthorized = ({ children }) => {
//   // check if user is logged in and has role of admin or advisor using session cookie
//   const role = localStorage.get("userRole");
//   const email = cookies.get("userEmail");
//   if (role === "admin" || role === "advisor") {
//     return children;
//   }

//   return <Navigate to="/unauthorized" />;
// };

// const IsAuthorized = ({ children }) => {
//   const userRole = Cookies.get("userRole");
//   if (userRole === "admin" || userRole === "Advisor") {
//     return children;
//   } else if (userRole === "User") {
//     return children;
//   } else {
//     return <Navigate to="/unauthorized" />;
//   }
// };
// export { IsAuthorized };

// const IsAuthorized = ({ allowedRoles }) => {
//   const userRole = localStorage.getItem("userRole");

//   // Check if the user's role is in the list of allowed roles
//   if (!userRole) return false;

//   console.log(userRole, allowedRoles);
//   if (allowedRoles.includes(userRole)) {
//     return true;
//   }
// };

// const checkLoggedIn = ({url}) => {
//   const email = localStorage.getItem("email");
//   if (email) {
//     // Check if email is truthy (not null)
//     // window.location.href = './landing';
//     window.location.href = ``;
//   }
// };
// import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// const checkRole = (allowedRoles) => {
//   // const navigate = useNavigate();
//   const email = localStorage.getItem("email");
//   const userRole = localStorage.getItem("userType");
//   console.log("userRole", userRole);
//   console.log("allowedRoles", allowedRoles);
//   if (!email || email === "undefined" || email === "null") {
//     Navigate("/login");
//   }

//   if (!allowedRoles.includes(userRole)) {
//     console.log("Unauthorized");
//     Navigate("/unauthorized");
//   }
// };
// export { checkRole };
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const useCheckRole = (allowedRoles) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const email = localStorage.getItem("email");
//     const userRole = localStorage.getItem("userType");

//     if (!email || email === "undefined" || email === "null") {
//       navigate("/login");
//     } else if (!allowedRoles.includes(userRole)) {
//       console.log("Authorized");
//     } else {
//       console.log("Unauthorized");
//       console.log("userRole", userRole);
//       console.log("allowedRoles: ", allowedRoles);
//       navigate("/unauthorized");
//     }
//   }, [allowedRoles, navigate]); // Dependencies ensure the effect runs when allowedRoles change
// };

// export { useCheckRole };

import { useState, useEffect } from "react";

const useCheckRole = (allowedRoles) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userType");
    const email = localStorage.getItem("email");
    console.log("email", email);
    console.log("userRole", userRole);

    if (email && email !== "undefined" && email !== "null") {
      // setIsLoggedIn(true); // Set to true here if email is valid
      // Check if the user's role is one of the allowed roles
      if (allowedRoles.includes(userRole)) {
        console.log("Authorized");
        setIsAuthorized(true);
      } else {
        console.log("Unauthorized but logged in");
        setIsAuthorized(false); // Ensure this is set to false if not authorized
      }
    } else {
      console.log("Unauthorized and not logged in");
      setIsAuthorized(false);
      // setIsLoggedIn(false);
    }
    // Debug outputs to check state immediately after setting (this won't reflect the new state yet due to the asynchronous nature of setState)
    console.log("isLoggedIn", isLoggedIn);
    console.log("isAuthorized", isAuthorized);
  }, [allowedRoles]);

  return { isAuthorized, isLoggedIn };
};

export { useCheckRole };

// What I am thinking is making a hook for geting the current user and using that hook to get the user role as well, might need to create a new end point for that in the backend just for validation this way we make sure that the user is authorized to view the page.
