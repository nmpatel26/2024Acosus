import React, { useState, useEffect, useRef } from "react";
// import styles from "./css.module copy.css";
import styles from "./cssdemographic/css.module.css";




const Demographic = () => {

  const [submitted, setSubmitted] = useState(false);
  const Assesmentresult = () => {

    window.location.href = "../Assesmentresult";


  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    const selectedEmail = localStorage.getItem('selectedEmail');
    const apiUrl = selectedEmail ? 'http://localhost:5000/Personality/' + selectedEmail : 'http://localhost:5000/Personality/' + email;


    // fetch('http://localhost:5000/demographics/' + email)
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

        if (data.international_student && data.age_range && data.transferred_from && data.gender && data.first_gen_student && data.ethnicity) {
          setSubmitted(true);
          setInternational(data.personalityScore || '');
          setEthnicity(data.personalityScore || '');
          setAge(data.personalityScore || '');
          setGender(data.personalityScore || '');
          setTransferred(data.personalityScore || '');
          setFirstGen(data.personalityScore || '');

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



  const confirmation = () => {

    alert('Form saved sucessfully');

  };




  useEffect(() => {
    const email = localStorage.getItem('email');
    const selectedEmail = localStorage.getItem('selectedEmail');
    const apiUrl = selectedEmail ? 'http://localhost:5000/demographics/' + selectedEmail : 'http://localhost:5000/demographics/' + email;


    // fetch('http://localhost:5000/demographics/' + email)
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setInternational(data.international_student || '');
        setAge(data.age_range || '');
        setTransferred(data.transferred_from || '');
        setGender(data.gender || '');
        setFirstGen(data.first_gen_student || '');
        setEthnicity(data.ethnicity || '');


      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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

  const Questionnarepage = () => {

    window.location.href = "../questionare";


  };

  const Landing = () => {

    window.location.href = "../landing";


  };
  const personality = () => {

    window.location.href = "../personality";


  };

  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [international_student, setInternational] = useState("");
  const [age_range, setAge] = useState("");
  const [transferred_from, setTransferred] = useState("");
  const [first_gen_student, setFirstGen] = useState("");

  const logoutTimeoutRef = useRef(null);

  const logOut = () => {
    localStorage.clear();
    window.location.href = "../login";
    alert('You have been logged out due to inactivity.');

  };

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



  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEthnicityChange = (event) => {
    setEthnicity(event.target.value);
  };

  const handleInternationalChange = (event) => {
    setInternational(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleTransferredChange = (event) => {
    setTransferred(event.target.value);
  };

  const handleFirstGenChange = (event) => {
    setFirstGen(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = localStorage.getItem('email');
    const selectedEmail = localStorage.getItem('selectedEmail');
    
    const fullName = localStorage.getItem('fullName');

    let selectedEmail1;
    if (selectedEmail) {
      selectedEmail1 = selectedEmail;
    } else {
      selectedEmail1 = email;
    }
    fetch('http://localhost:5000/demographics', {
    // fetch(apiUrl, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: selectedEmail1,
        fullName: fullName,
        international_student: international_student,
        age_range: age_range,
        transferred_from: transferred_from,
        gender: gender,
        first_gen_student: first_gen_student,
        ethnicity: ethnicity,
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
          <div className={styles.neiu} style={{ left: '90px' }}>
            Demographic Info
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
                <button onClick={Landing} className={styles.btn111} > Home </button>
              </div>
              <div class="form-group">
                <button onClick={personality} className={styles.btn211} > Personality </button>
              </div>
              <div class="form-group">
                <button onClick={Questionnarepage} className={styles.btn311} > Questionnaire </button>
              </div>
              <div class="form-group">
                <button onClick={Assesmentresult} className={styles.btn411} > Assesment Result </button>
              </div>
              <div class="form-group">
                <button onClick={settings} className={styles.btn511} > Settings </button>
              </div>
              <div class="form-group">
                <button onClick={serverSideLogout} className={styles.btn611} > Logout </button>
              </div>
            </div>
          </div>
        </div>


        <div className={styles.menubar}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formContainer}>


                <label htmlFor="international_student">Student Status:</label>
                <select
                  id="international_student"
                  name="international_student"
                  value={international_student}
                  onChange={handleInternationalChange}
                >
                  <option value="">Select your student status</option>
                  <option value="international">International student</option>
                  <option value="domestic">Domestic student</option>
                </select>

                <label htmlFor="age_range">Age Range:</label>
                <select
                  id="age_range"
                  name="age_range"
                  value={age_range}
                  onChange={handleAgeChange}
                >
                  <option value="">Select your age range</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>

                <label htmlFor="transferred_from">Transfer Method:</label>
                <select
                  id="transferred_from"
                  name="transferred_from"
                  value={transferred_from}
                  onChange={handleTransferredChange}
                >
                  <option value="">Select your transfer method</option>
                  <option value="two_year">From Two-year college</option>
                  <option value="four_year">Four-year college</option>
                </select>

                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Genderqueer">Genderqueer</option>
                  <option value="Genderfluid">Genderfluid</option>
                  <option value="Agender">Agender</option>
                  <option value="Intersex">Intersex</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>

                <label htmlFor="first_gen_student">First Generation Status:</label>
                <select
                  id="first_gen_student"
                  name="first_gen_student"
                  value={first_gen_student}
                  onChange={handleFirstGenChange}
                >
                  <option value="">Select your first generation status</option>
                  <option value="yes">Yes, First Gen</option>
                  <option value="no">No, not First Gen</option>
                </select>

                <label htmlFor="ethnicity">Ethnicity:</label>
                <select
                  id="ethnicity"
                  name="ethnicity"
                  value={ethnicity}
                  onChange={handleEthnicityChange}
                >
                  <option value="">Select your ethnicity</option>
                  <option value="asian">Asian</option>
                  <option value="African American">African American</option>
                  <option value="hispanic">Hispanic</option>
                  <option value="Caucasian">Caucasian</option>
                  <option value="other">Other</option>
                </select>

                <label>
                  <button className={styles.btnsubmit} value={submitted ? "Update" : "Submit"} onClick={confirmation} > Submit </button>
                </label>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};


export default Demographic;
