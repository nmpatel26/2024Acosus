import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_ROLE,
  ADVISOR_ROLE,
  HOST_URL,
  USER_ROLE,
} from "../utils/constants";
// import { useCheckRole } from "../utils/auth";

import axios from "axios";

const ToCreateAccount = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  // const [userType, setuserType] = useState("");
  // const [adminKey, setadminKey] = useState("");

  const onLoginButtonContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (userType == "Admin" && adminKey != "Nikunj") {
    //   alert("Invalid Admin Key");
    //   return;
    // }

    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(`${HOST_URL}/register`, {
        fname: firstName,
        lname: lastName,
        email: email,
        password,
        userType: "User",
      });

      if (response.data.status === "ok") {
        // navigate("/"); // Navigate on successful registration
        refreshSession(); // Refresh the session to login
      } else {
        alert(response.data.error); // Show error if registration fails
        refreshSession(); // Refresh the session to login
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register. Please try again."); // Handle errors in registration attempt
    }
    // else {
    //   e.preventDefault();

    //   const response = await axios.post(`${HOST_URL}/register`, {
    //     //'http://localhost:5000/register'
    //     fname: firstName,
    //     lname: lastName,
    //     email: email,
    //     password,
    //     userType,
    //   });
    //   if (response.data.status === "ok") {
    //     navigate("/login");
    //   } else {
    //     alert(response.data.error);
    //   }
    // }
  };

  const refreshSession = () => {
    // This will reload the page, thus "refreshing" the session
    window.location.reload();
  };

  return (
    <div className="registerbackground">
      <form
        className="registergroup"
        onSubmit={handleSubmit}
      >
        <div style={{ textAlign: "center", fontSize: "25Px" }}>
          <h1>Create Account</h1>
        </div>

        <div className="form">
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <label class="radio-inline">
              <input
                class="radio-label"
                Type="radio"
                name="UserType"
                value="User"
                onChange={(e) => setuserType(e.target.value)}
                required
              />
              User
            </label>
            <label class="radio-inline">
              <input
                class="radio-label"
                Type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setuserType(e.target.value)}
                required
              />
              Admin
            </label>
          </div> */}

          {/* {userType == "Admin" ? (
            <div className="formgroup">
              <label>Admin Key</label>
              <input
                placeholder="Admin Key"
                type="password"
                value={adminKey}
                onChange={(e) => setadminKey(e.target.value)}
                required
              />
            </div>
          ) : null} */}

          <div className="formgroup121">
            <label htmlFor="firstname">First Name</label>
            <input
              placeholder="First Name"
              type="Text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="formgroup121">
            <label htmlFor="firstname">Last Name</label>
            <input
              placeholder="Last Name"
              type="Text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="formgroup121">
            <label htmlFor="firstname">Email</label>
            <input
              placeholder="Email"
              Type="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formgroup121">
            <label htmlFor="firstname">Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="formgroup121">
            <label htmlFor="firstname">Re-type Password</label>
            <input
              placeholder="Re-type Password"
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </div>

          <div className="formgroup121">
            <button
              className="btn1001"
              type="submit"
            >
              Register
            </button>
            <button
              onClick={refreshSession}
              className="btn1002"
            >
              {" "}
              Login{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const ToForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "If you have registered with us you will receive a reset link shortly, click confirm to continue. "
    );
    if (confirmation) {
      try {
        const response = await axios.post(`${HOST_URL}/ForgotPassword`, {
          //'http://localhost:5000/ForgotPassword'
          email,
        });

        if (response.data.status === "ok") {
          setMessage("Email with reset password link sent successfully.");
          setError("");
        } else {
          setError("Something went wrong. Please try again.");
          setMessage("");
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        setError(
          "Failed to send request. Please check your network connection and try again."
        );
        setMessage("");
      }
    }
  };
  const refreshSession = () => {
    // This will reload the page, thus "refreshing" the session
    window.location.reload();
  };
  return (
    <div className="loginGroupChild">
      <img
        className="imgforgotpassword"
        alt="NEIU"
        src="forgot.png"
      />

      <div className="forgotpasswordform123">
        <div style={{ textAlign: "center" }}>
          <label>Password Reset</label>
        </div>

        <div className="email">
          {" "}
          <input
            id="email"
            type="email"
            className="emailInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {message && <p className="successMessage">{message}</p>}
        {error && <p className="errorMessage">{error}</p>}

        <div className="formgroup121">
          <button
            onClick={handleForgotPassword}
            className="btn1001"
          >
            Reset Password
          </button>
          <button
            onClick={refreshSession}
            className="btn1002"
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const checkLoggedIn = () => {
  //     const email = localStorage.getItem("email");
  //     if (email) {
  //       // Check if email is truthy (not null)
  //       // window.location.href = './landing';
  //       // window.location.href = "./admin";
  //       navigate("/dashboard");
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);
  // const { isAuthorized } = useCheckRole([ADMIN_ROLE, ADVISOR_ROLE, USER_ROLE]);
  // if (isAuthorized) {
  //   navigate("/dashboard");
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Updated state variable name]

  const onCreateAccountTextClick = useCallback(() => {
    navigate("/createaccount");
  }, [navigate]);

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/forgotpassword");
  }, [navigate]);

  const saveFullNameToLocalStorage = (name) => {
    localStorage.setItem("fullName", name);
  };

  const saveEmailToLocalStorage = (email) => {
    localStorage.setItem("email", email);
  };

  const saveuserTypeToLocalStorage = (userType) => {
    localStorage.setItem("userType", userType);
  };

  const retrieveFullNameFromLocalStorage = () => {
    const storedFullName = localStorage.getItem("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }
  };

  useEffect(() => {
    retrieveFullNameFromLocalStorage();
    retrieveEmailFromLocalStorage(); // Add this line to retrieve the email
  }, []);

  const retrieveEmailFromLocalStorage = () => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${HOST_URL}/login-user`, {
      //'http://localhost:5000/login-user'
      email: email,
      password,
    });

    if (response.data.status === "ok") {
      const { fname, lname, email, userType } = response.data.data.user; // Add email extraction
      const fullName = `${fname} ${lname}`;
      setFullName(fullName);
      saveFullNameToLocalStorage(fullName);
      saveuserTypeToLocalStorage(userType);
      saveEmailToLocalStorage(email); // Save the email to localStorage
      const userPackage = { fullName, email, userType }; // Include email in the userPackage
      // navigate("/Landing", {state: {userPackage} });
      // if (userType === "Advisor") {
      //   console.log("inside advisor");
      //   window.location.href = "/Instructor";
      // }
      navigate("/dashboard", { state: { userPackage } });
    } else {
      alert(response.data.error);
    }
  };
  const [menuContent, setMenuContent] = useState("default");

  return (
    <div className="background">
      <div className="loginChild">
        <div className="loginInner">
          <img
            className="neiuLogoIcon"
            alt="NEIU Logo"
            src="newlogo.png"
          />{" "}
          {/* Add this line for the image */}
          <div
            className="neiu"
            style={{ left: "90px" }}
          >
            {" "}
            AI-driven Counseling System for Transfer Students{" "}
          </div>
        </div>
        <div className="loginItem">
          {menuContent === "default" && (
            <div>
              {
                <div className="loginGroupChild">
                  <img
                    className="image2"
                    alt="NEIU"
                    src="Login1.png"
                  />{" "}
                  {/* Add this line for the image */}
                  <form onSubmit={handleSubmit}>
                    <div className="login123">
                      <div style={{ textAlign: "center" }}>
                        <label>Log Into ACOSUS</label>
                      </div>
                      <div className="formGroup121">
                        <input
                          id="email"
                          type="email"
                          className="input121"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="formGroup121">
                        <input
                          className="input121"
                          type="password"
                          name="Password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      {/* 
                      <div className="formgroup121">
                        <button className="btn1001" type="submit">Login</button>
                        <button className="btn1002" onClick={onForgotPasswordTextClick}>Forgot Password</button>
                      </div>
                      <div className="formgroup121">
                        <button className="btn1003" onClick={onCreateAccountTextClick}>Create Account</button>
                      </div> */}

                      <div class="formgroup121">
                        <button
                          onClick={() => setMenuContent("default")}
                          className="btn1001"
                          type="submit"
                        >
                          {" "}
                          Login{" "}
                        </button>

                        <button
                          onClick={() => setMenuContent("ForgotPassword")}
                          className="btn1002"
                        >
                          Forgot Password{" "}
                        </button>
                      </div>
                      <div class="formgroup121">
                        <button
                          onClick={() => setMenuContent("CreateAccount")}
                          className="btn1003"
                        >
                          {" "}
                          Create Account{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              }
            </div>
          )}

          {menuContent === "ForgotPassword" && (
            <div className="formin">{<ToForgotPassword />}</div>
          )}

          {menuContent === "CreateAccount" && (
            <div className="formin">{<ToCreateAccount />}</div>
          )}
        </div>
        {/* </form> */}
      </div>
    </div>
    // </div >
    // </div >
    // </div >
  );
};

export default Login;
