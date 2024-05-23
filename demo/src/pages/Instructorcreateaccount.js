import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./CreateAccount.css";
import axios from "axios";
import { ADMIN_ROLE, HOST_URL } from "../utils/constants";
// import { useCheckRole } from "../utils/auth";
// import Unauthorized from "./Unauthorized";

const Instructorcreateaccount = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      const userRole = localStorage.getItem("userType");
      // console.log("userRole", userRole);
      if (!email || email === "undefined" || email === "null") {
        navigate("/login");
      }

      if (userRole !== ADMIN_ROLE) {
        navigate("/unauthorized");
        // return <Unauthorized />;
      }
    };

    checkLoggedIn();
  }, []);
  // const { isAuthorized, isLoggedIn } = useCheckRole([ADMIN_ROLE]);
  // if (isLoggedIn === false || isAuthorized === false) {
  //   return <Unauthorized />;
  // }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userType = "Advisor"; // Directly setting userType to Advisor
  // const [adminKey, setadminKey] = useState("");

  const onLoginButtonContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }
    const response = await axios.post(`${HOST_URL}/register`, {
      //'http://localhost:5000/register'
      fname: firstName,
      lname: lastName,
      email: email,
      password,
      userType, // Sending userType directly as Advisor
    });
    if (response.data.status === "ok") {
      navigate("/login");
    } else {
      alert(response.data.error);
    }
  };

  const handleAdminhome = () => {
    navigate("/admin");
  };

  return (
    <div className="background">
      <div className="loginChild">
        <div className="loginInner" />
        <img
          className="neiuLogoIcon"
          alt="NEIU Logo"
          src="newlogo.png"
        />

        <div
          className="neiu"
          style={{ left: "90px" }}
        >
          Create Advisor Account
        </div>

        <div className="loginItem">
          <div className="registerbackground">
            <form
              className="registergroup"
              onSubmit={handleSubmit}
            >
              <div className="header">Advisor</div>
              <a
                className="header"
                onClick={handleAdminhome}
                cursor="pointer"
              >
                Admin Home
              </a>
              <div className="form">
                <div className="formgroup">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    placeholder="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    placeholder="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="Email"
                    Type="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="password">Password</label>
                  <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="password">Re-type Password</label>
                  <input
                    placeholder="Re-type Password"
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                </div>
                <div className="formgroup">
                  <button
                    className="btnregisteradvisor"
                    type="submit"
                  >
                    Create Advisor Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructorcreateaccount;
