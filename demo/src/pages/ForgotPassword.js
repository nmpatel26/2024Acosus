import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import axios from "axios";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onLoginButtonContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("If you have registered with us you will receive a reset link shortly, click confirm to continue. ");
    if (confirmation) {
      try {
        const response = await axios.post('http://localhost:5000/ForgotPassword', {
          email
        });

        if (response.data.status === 'ok') {
          setMessage('Email with reset password link sent successfully.');
          setError('');
        } else {
          setError('Something went wrong. Please try again.');
          setMessage('');
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        setError('Failed to send request. Please check your network connection and try again.');
        setMessage('');
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginChild}/>
      <div className={styles.loginInner} />
      <img className={styles.neiuLogoIcon} alt="NEIU Logo" src="newlogo.png" /> {/* Add this line for the image */}
      <div className={styles.neiu} style={{ left: '90px' }}> AI-driven Counseling System for Transfer Students </div>

      <div className={styles.image1} />
      <img className={styles.image2} alt="NEIU" src="forgot.png" /> {/* Add this line for the image */}

      <div className={styles.loginItem}>
      <div className={styles.loginGroupChild}>
      <div className={styles.content}>

      {/* <div className={styles.forgotpasswordChild} />
      <div className={styles.forgotpasswordItem} />
      <div className={styles.forgotpasswordInner} /> */}

      
      <div className={styles.form}>
      <div className={styles.passwordReset}>Password Reset</div>
      <div className={styles.fontemail}> Email: </div>
        <div className={styles.email}> <input
          id="email"
          type="email"
          className={styles.emailInput}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /></div>
      </div>
      <button className={styles.btn1} onClick={handleForgotPassword}>
        Reset Password

      </button>
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      
    </div>
    <button className={styles.btn2} onClick={onLoginButtonContainerClick}>  Return to Login  </button>
    </div>
    </div>
    </div>

 
  );
};

export default ForgotPassword;