import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";


import axios from 'axios';

const Login = () => {

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem('email');
      if (email) { // Check if email is truthy (not null)
        // window.location.href = './landing';
        window.location.href = './admin';
      }
    };

    checkLoggedIn();
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Updated state variable name]

  const onCreateAccountTextClick = useCallback(() => {
    navigate("/createaccount");
  }, [navigate]);

  const onForgotPasswordTextClick = useCallback(() => {
    navigate("/forgotpassword");
  }, [navigate]);

  const saveFullNameToLocalStorage = (name) => {
    localStorage.setItem('fullName', name);
  };

  const saveEmailToLocalStorage = (email) => {
    localStorage.setItem('email', email);
  };


  const saveuserTypeToLocalStorage = (userType) => {
    localStorage.setItem('userType', userType);
  };


  const retrieveFullNameFromLocalStorage = () => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  };

  useEffect(() => {
    retrieveFullNameFromLocalStorage();
    retrieveEmailFromLocalStorage(); // Add this line to retrieve the email
  }, []);

  const retrieveEmailFromLocalStorage = () => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/login-user', {
      email: email,
      password
    });

    if (response.data.status === 'ok') {
      const { fname, lname, email, userType } = response.data.data.user; // Add email extraction
      const fullName = `${fname} ${lname}`;
      setFullName(fullName);
      saveFullNameToLocalStorage(fullName);
      saveuserTypeToLocalStorage(userType);
      saveEmailToLocalStorage(email); // Save the email to localStorage
      const userPackage = { fullName, email }; // Include email in the userPackage
      // navigate("/Landing", { state: { userPackage } });
      navigate("/admin", { state: { userPackage } });
    } else {
      alert(response.data.error);
    }
  };


  return (

    <div className="background">
      <div className="loginChild">

        <div className="loginInner">
          <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" /> {/* Add this line for the image */}
          <div className="neiu" style={{ left: '90px' }}> AI-driven Counseling System for Transfer Students </div>
        </div>


        <div className="loginItem">


          <div className="loginGroupChild">

            <div >
              <div className="image1" />
              <img className="image2" alt="NEIU" src="Login1.png" /> {/* Add this line for the image */}


              <form onSubmit={handleSubmit}>

                <div className="form">
                  <div  style={{ textAlign: 'center' }}>
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
                      className="input121" type="password" name="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="formgroup121">
                    <button className="btn1001" type="submit">Login</button>
                    <button className="btn1002" onClick={onForgotPasswordTextClick}>Forgot Password</button>
                  </div>
                  <div className="formgroup121">
                    <button className="btn1003" onClick={onCreateAccountTextClick}>Create Account</button>
                  </div>





                  {/* <div className="fontemail"> Email: </div>
                <input className="email" type="text" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <div className="fontpassword"> Password: </div>
                <input className="password" type="password" name="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /> */}
                  {/* <button className="btn1" type="submit"> Login</button>

                  <div className="createAccountText" onClick={onCreateAccountTextClick}>
                    <div className="createAccountTextChild" />
                    <button className="btn2" type="submit">Create Account</button>

                  </div>
                  <div className="forgotPasswordText" onClick={onForgotPasswordTextClick}>
                    <div className="forgotPasswordTextChild" />
                    <button className="btn3" type="submit">Forgot password</button>

                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >


  );
};


export default Login;
