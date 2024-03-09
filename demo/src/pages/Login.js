import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

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
      const { fname, lname, email, userType} = response.data.data.user; // Add email extraction
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
      <div className={styles.loginChild} />
      <div className={styles.loginInner} />
      <img className={styles.neiuLogoIcon} alt="NEIU Logo" src="newlogo.png" /> {/* Add this line for the image */}
      <div className={styles.neiu} style={{ left: '90px' }}> AI-driven Counseling System for Transfer Students </div>

      <div className={styles.image1} />
      <img className={styles.image2} alt="NEIU" src="Login1.png" /> {/* Add this line for the image */}

      <div className={styles.loginItem}>


        <div className={styles.loginGroupChild}>

          <div className={styles.content}>

            <form onSubmit={handleSubmit}>

              <div className={styles.form}>


                <div className={styles.fontemail}> Email: </div>
                <input className={styles.email} type="text" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <div className={styles.fontpassword}> Password: </div>
                <input className={styles.password} type="password" name="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className={styles.btn1} type="submit"> Login</button>

                <div className={styles.createAccountText} onClick={onCreateAccountTextClick}>
                  <div className={styles.createAccountTextChild} />
                  <button className={styles.btn2} type="submit">Create Account</button>

                </div>
                <div className={styles.forgotPasswordText} onClick={onForgotPasswordTextClick}>
                  <div className={styles.forgotPasswordTextChild} />
                  <button className={styles.btn3} type="submit">Forgot password</button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


  );
};


export default Login;
