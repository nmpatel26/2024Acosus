import React, { useState, useEffect, useRef } from "react";
import "./Changepassword.css";
import axios from "axios";






const ChangePassword = () => {
  const demo = () => {

    window.location.href = "../demographic";


  };

  const Landing = () => {

    window.location.href = "../landing";


  };

  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match. Please try again.');
      return;
    }

    const data = {
      email,
      oldPassword,
      newPassword,
    };

    try {
      const res = await axios.post('http://localhost:5000/change-password', data);

      if (res.data.status === 'ok') {
        setMessage('Password changed successfully');
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error('Something went wrong while changing password', error);
    }
  };
  const settings = () => {

    window.location.href = "../Changepassword";


  };


  useEffect(() => {
    const email = localStorage.getItem('email');

    fetch('http://localhost:5000/Personality/' + email)
      .then(response => response.json())
      .then(data => {
        setPersonalityScore(data.personalityScore || '');

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem('email');
      if (email === null) {
        window.location.href = '../login';
        alert("Please login first.")
      }
    };

    checkLoggedIn();
  }, []);








  const logoutTimeoutRef = useRef(null);
  const manuallogOut = () => {
    localStorage.clear();
    window.location.href = "../login";


  };
  const logOut = () => {
    localStorage.clear();
    window.location.href = "../login";
    alert('You have been logged out due to inactivity.');

  };

  useEffect(() => {
    const logoutTimeout = 600000;

    const resetLogoutTimeout = () => {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = setTimeout(logOut, logoutTimeout);
    };

    document.addEventListener("mousemove", resetLogoutTimeout);
    document.addEventListener("keydown", resetLogoutTimeout);

    return () => {
      clearTimeout(logoutTimeoutRef.current);
      document.removeEventListener("mousemove", resetLogoutTimeout);
      document.removeEventListener("keydown", resetLogoutTimeout);
    };
  }, []);


  const [personalityScore, setPersonalityScore] = useState("");

  useEffect(() => {
    const email = localStorage.getItem('email');

    fetch('http://localhost:5000/personality/' + email)
      .then(response => response.json())
      .then(data => {

        setPersonalityScore(data.personalityScore || '');

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  const fullName = localStorage.getItem('fullName');



  const handlePersonalityScoreChange = (event) => {
    setPersonalityScore(event.target.value);
  };






  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/Personality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        fullName: fullName,

        personalityScore: personalityScore,

      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="background">
      <div className="loginChild">
        {/*Page Header */}
        <div className="loginInner">
          <div className="neiu" style={{ left: '90px' }}>
newlogoLanding            Settings page
          </div>
          <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
        </div>
        {/* Body */}
        <div className="loginItem">
          {/* Side panel */}
          {/* <div className={styles.menusidebar}></div> */}
          <div className="Slidebar">
            <div>
              <div >
                <button onClick={Landing} className="btnhome" > Home </button>
              </div>
              <div className="form-group">
                <button onClick={demo} className="btnprofile" > Profile </button>
              </div>
              <div className="form-group">
                <button onClick={manuallogOut} className="btnlog" > Logout </button>
              </div>

            </div>
          </div>

          <div className="centerbar">
            <div className="form">
              <form onSubmit={handleChangePassword} className="sampleForm">
                <div className="questionnaire">
                  <div className="formContainer">

                    <div className="questionnaire">

                      <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </label>
                      <label>
                        Old Password:
                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                      </label>
                      <label>
                        New Password:
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                      </label>
                      <label>
                        Confirm New Password:
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          required
                        />
                      </label>

                      <label>
                        <button className="btnsubmit" type="submit" value="Submit"> Submit</button>
                      </label>
                    </div>
                  </div>

                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>

        </div>
      </div>



    </div>
  );
};

export default ChangePassword;
