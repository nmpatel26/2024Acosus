import React, { useState, useEffect, useRef } from "react";
import styles from "./Personality.module.css";

const RedirectToTest = () => {



  const handleButtonClick = () => {
    window.open("https://www.16personalities.com/free-personality-test", "_blank");
  };

  return (
    <div className={styles.questionnaire}>
      <label>Not sure about your personality type?</label>
      <label>
        <button onClick={handleButtonClick} className={styles.btnredirect}>
          Take the test
        </button>
      </label>
    </div>
  );
};



const Personality = () => {
  const [submitted, setSubmitted] = useState(false);

  const Questionnarepage = () => {

    window.location.href = "../questionare";


  };
  const Assesmentresult = () => {

    window.location.href = "../Assesmentresult";


  };

  const Landing = () => {

    window.location.href = "../landing";


  };

  const confirmation = () => {

    alert('Form saved sucessfully');

  };

  const demo = () => {

    window.location.href = "../demographic";


  };


  const serverSideLogout = () => {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          // Clear local storage and redirect to login page after successful logout
          localStorage.clear();
          window.location.href = "../login";

        } else {
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const settings = () => {

    window.location.href = "../Changepassword";


  };




  useEffect(() => {
    const email = localStorage.getItem('email');
    const selectedEmail = localStorage.getItem('selectedEmail');
    const apiUrl = selectedEmail ? 'http://localhost:5000/Personality/' + selectedEmail : 'http://localhost:5000/Personality/' + email;


    // fetch('http://localhost:5000/Personality/' + email)
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

        if (data.personalityScore) {
          setSubmitted(true);
          setPersonalityScore(data.personalityScore || '');

        }

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


  useEffect(() => {
    const logoutTimeout = 600000;

    const resetLogoutTimeout = () => {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = setTimeout(serverSideLogout, logoutTimeout);
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
    const selectedEmail = localStorage.getItem('selectedEmail');
    const apiUrl = selectedEmail ? 'http://localhost:5000/Personality/' + selectedEmail : 'http://localhost:5000/Personality/' + email;


    // fetch('http://localhost:5000/personality/' + email)
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

        setPersonalityScore(data.personalityScore || '');

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  const email = localStorage.getItem('email');
  const selectedEmail = localStorage.getItem('selectedEmail');
  const fullName = localStorage.getItem('fullName');



  const handlePersonalityScoreChange = (event) => {
    setPersonalityScore(event.target.value);
  };






  const handleSubmit = (event) => {
    event.preventDefault();

    let selectedEmail1;
    if (selectedEmail) {
        selectedEmail1 = selectedEmail;
    } else {
        selectedEmail1 = email;
    }

    fetch('http://localhost:5000/Personality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: selectedEmail1,
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

        <div className={styles.loginInner}>
          <div className={styles.neiu} style={{ left: '90px' }}>
            Personality Info
          </div>
          <img className={styles.neiuLogoIcon} alt="NEIU Logo" src="newlogo.png" />
        </div>
        {/* Body */}
        <div className={styles.loginItem}>
          {/* Side panel */}
          {/* <div className={styles.menusidebar}></div> */}
          <div className={styles.Slidebar}>
            <div className={styles.form}>
              <div class="form-group">
                <button onClick={Landing} className={styles.btn121} > Home </button>
              </div>
              <div class="form-group">
                <button onClick={demo} className={styles.btn221} > Profile </button>
              </div>
              <div class="form-group">
                <button onClick={Questionnarepage} className={styles.btn321} > Questionnaire </button>
              </div>
              <div class="form-group">
                <button onClick={Assesmentresult} className={styles.btn421} > Assesment Result </button>
              </div>
              <div class="form-group">
                <button onClick={settings} className={styles.btn521} > Settings </button>
              </div>
              <div class="form-group">
                <button onClick={serverSideLogout} className={styles.btn621} > Logout </button>
              </div>
            </div>
          </div>
        </div>



        <div className={styles.menubar}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formContainer}>
                <RedirectToTest />
                <div className={styles.questionnaire}>

                  <label htmlFor="personality">
                    Personality Type:
                  </label>
                  <select
                    id="personality"
                    name="personality"
                    value={personalityScore}
                    onChange={handlePersonalityScoreChange}
                  >
                    <option value="">Select your personality type</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INTP">INTP</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENTP">ENTP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INFP">INFP</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENFP">ENFP</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ISTP">ISTP</option>
                    <option value="ISFP">ISFP</option>
                    <option value="ESTP">ESTP</option>
                    <option value="ESFP">ESFP</option>
                  </select>

                  <label>
                    <button className={styles.btnsubmit} value={submitted ? "Update" : "Submit"} onClick={confirmation} > Update</button>
                  </label>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Personality;
