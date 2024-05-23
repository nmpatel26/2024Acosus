import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  ADMIN_ROLE,
  ADVISOR_ROLE,
  HOST_URL,
  LOGOUT_URL,
  MODEL_HOST_URL,
  PERSONALITY_URL,
} from "../utils/constants";
// import { useCheckRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const RedirectToTest = () => {
  const handleButtonClick = () => {
    window.open(
      `${PERSONALITY_URL}`, // "https://www.16personalities.com/free-personality-test",
      "_blank"
    );
  };

  return (
    <div className="Personality123">
      <label>Not sure about your personality type?</label>
      <label>
        <button
          onClick={handleButtonClick}
          className="btnredirect123"
        >
          Take the test
        </button>
      </label>
    </div>
  );
};

const ToPersonality = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const confirmation = () => {
    alert("Form saved sucessfully");
  };

  const serverSideLogout = () => {
    fetch(`${LOGOUT_URL}`, {
      //"http://localhost:5000/logout"
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // Clear local storage and redirect to login page after successful logout
          localStorage.clear();
          window.location.href = "../login";
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const selectedEmail = localStorage.getItem("selectedEmail");
    const apiUrl = selectedEmail
      ? `${HOST_URL}/Personality` + selectedEmail
      : `${HOST_URL}/Personality` + email; //"http://localhost:5000/Personality/" + email

    // fetch('http://localhost:5000/Personality/' + email)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.personalityScore) {
          setSubmitted(true);
          setPersonalityScore(data.personalityScore || "");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      const userRole = localStorage.getItem("userType");
      // console.log("userRole", userRole);
      if (!email || email === "undefined" || email === "null") {
        navigate("/login");
      }

      if (userRole !== ADMIN_ROLE && userRole !== ADVISOR_ROLE) {
        navigate("/unauthorized");
        // return <Unauthorized />;
      }
    };

    checkLoggedIn();
  }, []);
  // const { isAuthorized, isLoggedIn } = useCheckRole([ADMIN_ROLE, ADVISOR_ROLE]);
  // if (isLoggedIn === false || isAuthorized === false) {
  //   return <Unauthorized />;
  // }
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
    const email = localStorage.getItem("email");
    const selectedEmail = localStorage.getItem("selectedEmail");
    const apiUrl = selectedEmail
      ? `${HOST_URL}/Personality` + selectedEmail
      : `${HOST_URL}/Personality` + email; //"http://localhost:5000/personality/" + email

    // fetch('http://localhost:5000/personality/' + email)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPersonalityScore(data.personalityScore || "");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const email = localStorage.getItem("email");
  const selectedEmail = localStorage.getItem("selectedEmail");
  const fullName = localStorage.getItem("fullName");

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

    fetch(`${HOST_URL}/Personality`, {
      //"http://localhost:5000/Personality"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: selectedEmail1,
        fullName: fullName,

        personalityScore: personalityScore,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formContainer">
          <RedirectToTest />
          <div className="Personality">
            <label htmlFor="personality">Personality Type:</label>
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
              <button
                className="btnsubmit123"
                value={submitted ? "Update" : "Submit"}
                onClick={confirmation}
              >
                {" "}
                Update
              </button>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

const ToDemographic = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const selectedEmail = localStorage.getItem("selectedEmail");
    const apiUrl = selectedEmail
      ? `${HOST_URL}/Personality` + selectedEmail
      : `${HOST_URL}/Personality` + email; //"http://localhost:5000/personality/" + email

    // fetch('http://localhost:5000/demographics/' + email)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (
          data.international_student &&
          data.age_range &&
          data.transferred_from &&
          data.gender &&
          data.first_gen_student &&
          data.ethnicity
        ) {
          setSubmitted(true);
          setInternational(data.personalityScore || "");
          setEthnicity(data.personalityScore || "");
          setAge(data.personalityScore || "");
          setGender(data.personalityScore || "");
          setTransferred(data.personalityScore || "");
          setFirstGen(data.personalityScore || "");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      const userRole = localStorage.getItem("userType");
      // console.log("userRole", userRole);
      if (!email || email === "undefined" || email === "null") {
        navigate("/login");
      }

      if (userRole !== ADMIN_ROLE && userRole !== ADVISOR_ROLE) {
        navigate("/unauthorized");
        // return <Unauthorized />;
      }
    };
    checkLoggedIn();
  }, []);
  // const { isAuthorized, isLoggedIn } = useCheckRole([ADMIN_ROLE, ADVISOR_ROLE]);
  // if (isLoggedIn === false || isAuthorized === false) {
  //   return <Unauthorized />;
  // }
  const confirmation = () => {
    alert("Form saved sucessfully");
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const selectedEmail = localStorage.getItem("selectedEmail");
    const apiUrl = selectedEmail
      ? `${HOST_URL}/demographics` + selectedEmail
      : `${HOST_URL}/demographics` + email; //"http://localhost:5000/demographics/" + email

    // fetch('http://localhost:5000/demographics/' + email)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setInternational(data.international_student || "");
        setAge(data.age_range || "");
        setTransferred(data.transferred_from || "");
        setGender(data.gender || "");
        setFirstGen(data.first_gen_student || "");
        setEthnicity(data.ethnicity || "");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [international_student, setInternational] = useState("");
  const [age_range, setAge] = useState("");
  const [transferred_from, setTransferred] = useState("");
  const [first_gen_student, setFirstGen] = useState("");

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

    const email = localStorage.getItem("email");
    const selectedEmail = localStorage.getItem("selectedEmail");

    const fullName = localStorage.getItem("fullName");

    let selectedEmail1;
    if (selectedEmail) {
      selectedEmail1 = selectedEmail;
    } else {
      selectedEmail1 = email;
    }
    fetch(`${HOST_URL}/demographics`, {
      //"http://localhost:5000/demographics"
      // fetch(apiUrl, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formContainer">
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
            <button
              className="btnsubmit"
              value={submitted ? "Update" : "Submit"}
              onClick={confirmation}
            >
              {" "}
              Submit{" "}
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};

const ToAssesmentresult = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`${HOST_URL}/Personality` + email) //"http://localhost:5000/personality/" + email
      .then((response) => response.json())
      .then((data) => {
        if (data.personalityScore) {
          setSubmitted(true);
          setPersonalityScore(data.personalityScore || "");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      const userRole = localStorage.getItem("userType");
      // console.log("userRole", userRole);
      if (!email || email === "undefined" || email === "null") {
        navigate("/login");
      }

      if (userRole !== ADMIN_ROLE && userRole !== ADVISOR_ROLE) {
        navigate("/unauthorized");
        // return <Unauthorized />;
      }
    };

    checkLoggedIn();
  }, []);
  // const { isAuthorized, isLoggedIn } = useCheckRole([ADMIN_ROLE, ADVISOR_ROLE]);
  // if (isLoggedIn === false || isAuthorized === false) {
  //   return <Unauthorized />;
  // }
  const [mresult, setMResult] = useState();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const selectedEmail = localStorage.getItem("selectedEmail");
    const apiUrl = selectedEmail
      ? `${HOST_URL}/modelResponses` + selectedEmail
      : `${HOST_URL}/modelResponses` + email; //"http://localhost:5000/modelResponses/" + email

    // fetch("http://localhost:5000/modelResponses/" + email, {
    fetch(apiUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((mresult) => {
        console.log(mresult, "mresult");
        setMResult(mresult.mresult);
      });
  }, []);

  return (
    <div className="menubar">
      <div className="form">
        <div className="questionnaire">
          <label htmlFor="personality">
            Student Assesment Score is : {mresult}
          </label>
        </div>
      </div>
    </div>
  );
};

const Toquestionare = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const confirmation = () => {
    // alert('Form saved sucessfully');
    // window.location.href="../landing";
  };

  const serverSideLogout = () => {
    fetch(`${LOGOUT_URL}`, {
      //"http://localhost:5000/logout"
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // Clear local storage and redirect to login page after successful logout
          localStorage.clear();
          window.location.href = "../login";
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      const userRole = localStorage.getItem("userType");
      // console.log("userRole", userRole);
      if (!email || email === "undefined" || email === "null") {
        navigate("/login");
      }

      if (userRole !== ADMIN_ROLE && userRole !== ADVISOR_ROLE) {
        navigate("/unauthorized");
        // return <Unauthorized />;
      }
    };

    checkLoggedIn();
  }, []);
  // const { isAuthorized, isLoggedIn } = useCheckRole([ADMIN_ROLE, ADVISOR_ROLE]);
  // if (isLoggedIn === false || isAuthorized === false) {
  //   return <Unauthorized />;
  // }
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

  const [gpa, setGpa] = useState("");
  const [credits, setCredits] = useState("");
  const [satScore, setSatScore] = useState("");
  const [course, setCourse] = useState("");
  const [course_similarity, setCourse_similarity] = useState(
    "Information Systems"
  );
  const [career, setCareer] = useState("");
  const [interest, setInterest] = useState("");
  const [experience, setExperience] = useState("");
  const [familyGuide, setFamilyGuide] = useState("");
  const [personalityScore, setPersonalityScore] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [income, setIncome] = useState("");
  const [proximity, setProximity] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    const selectedEmail = localStorage.getItem("selectedEmail");
    const apiUrl = selectedEmail
      ? `${HOST_URL}/questionaire` + selectedEmail
      : `${HOST_URL}/questionaire` + email; //"http://localhost:5000/questionaire/" + email

    // fetch('http://localhost:5000/questionaire/' + selectedEmail)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (
          data.gpa &&
          data.credits &&
          data.satScore &&
          data.course &&
          data.career &&
          data.interest &&
          data.experience &&
          data.familyGuide &&
          data.scholarship &&
          data.proximity &&
          data.income &&
          data.workStatus
        ) {
          setSubmitted(true);
          setGpa(data.gpa || "");
          setCredits(data.credits || "");
          setSatScore(data.satScore || "");
          setCourse(data.course || "");
          setCareer(data.career || "");
          setInterest(data.interest || "");
          setExperience(data.experience || "");
          setFamilyGuide(data.familyGuide || "");
          setPersonalityScore(data.personalityScore || "");
          setScholarship(data.scholarship || "");
          setIncome(data.income || "");
          setProximity(data.proximity || "");
          setWorkStatus(data.workStatus || "");
        }

        setGpa(data.gpa || "");
        setCredits(data.credits || "");
        setSatScore(data.satScore || "");
        setCourse(data.course || "");
        setCareer(data.career || "");
        setInterest(data.interest || "");
        setExperience(data.experience || "");
        setFamilyGuide(data.familyGuide || "");
        setPersonalityScore(data.personalityScore || "");
        setScholarship(data.scholarship || "");
        setIncome(data.income || "");
        setProximity(data.proximity || "");
        setWorkStatus(data.workStatus || "");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const email = localStorage.getItem("email");
  const selectedEmail = localStorage.getItem("selectedEmail");

  const fullName = localStorage.getItem("fullName");
  const handleGpaChange = (event) => {
    setGpa(event.target.value);
  };

  const handleCreditsChange = (event) => {
    setCredits(event.target.value);
  };

  const handleSatScoreChange = (event) => {
    setSatScore(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleCareerChange = (event) => {
    setCareer(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleFamilyGuideChange = (event) => {
    setFamilyGuide(event.target.value);
  };

  const handlePersonalityScoreChange = (event) => {
    setPersonalityScore(event.target.value);
  };

  const handleScholarshipChange = (event) => {
    setScholarship(event.target.value);
  };

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };

  const handleProximityChange = (event) => {
    setProximity(event.target.value);
  };

  const handleWorkStatusChange = (event) => {
    setWorkStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let selectedEmail1;
    if (selectedEmail) {
      selectedEmail1 = selectedEmail;
    } else {
      selectedEmail1 = email;
    }

    try {
      const request = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gpa: gpa,
          credits: credits,
          satScore: satScore,
          course: "Information Systems",
          course_similarity: course,
          career: career,
          interest: interest,
          experience: experience,
          familyGuide: familyGuide,
          personalityScore: personalityScore,
          scholarship: scholarship,
          income: income,
          proximity: proximity,
          workStatus: workStatus,
        }),
      };

      const response = await fetch(
        `${MODEL_HOST_URL}/model/predict`, //"http://127.0.0.1:5001/model/predict",
        request
      );
      const response_from_api = await response.json();
      const msg_alert =
        "Percentage of student qualify is: " + response_from_api;
      alert(msg_alert);
      //   handleResultChange(response_from_api)
      localStorage.setItem("selectedEmail", email);

      try {
        console.log("Calling the Model Response api");
        const responses = await axios.post(
          `${HOST_URL}/model/Responses`, //"http://localhost:5000/modelResponses",
          {
            email: selectedEmail1,
            mresult: response_from_api,
          }
        );
        console.log(responses);
        if (responses.status == 200) {
          console.log("success");
          alert("Model Response is saved successfully!");
        } else {
          console.log(responses);
          alert(responses);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error Occurred: " + error.message);
      }
      // Extract 'result' from the response or define it separately
      const result = response_from_api.result;

      // alert("Saving data to the mongo db...")
      fetch(`${HOST_URL}/questionaire`, {
        //"http://localhost:5000/questionaire"
        // fetch(apiUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedEmail1,
          fullName: fullName,
          gpa: gpa,
          credits: credits,
          satScore: satScore,
          course: course,
          course_similarity: "",
          career: career,
          interest: interest,
          experience: experience,
          familyGuide: familyGuide,
          personalityScore: personalityScore,
          scholarship: scholarship,
          income: income,
          proximity: proximity,
          workStatus: workStatus,
          result: result,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("Data saved to MongoDB successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error saving data to MongoDB");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="formin">
      {
        <form onSubmit={handleSubmit}>
          <div className="formContainerin">
            <div>
              <label>
                What are your GPA scores?
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="4"
                  value={gpa}
                  onChange={handleGpaChange}
                />
              </label>
              <label>
                How many credits have you completed?
                <input
                  type="number"
                  value={credits}
                  onChange={handleCreditsChange}
                />
              </label>
              <label>
                What is your SAT score?
                <input
                  type="text"
                  value={satScore}
                  onChange={handleSatScoreChange}
                />
              </label>
              <label>
                How many courses you're opting for?
                <input
                  type="number"
                  value={course}
                  onChange={handleCourseChange}
                />
              </label>
              <label>
                What is your career aspiration?
                <input
                  type="text"
                  value={career}
                  onChange={handleCareerChange}
                />
              </label>
              <label>
                How much are you interested in the course? (From a scale of 1 to
                10)
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={interest}
                  onChange={handleInterestChange}
                />
              </label>
              <label>
                How much exposure or experience and knowledge do you have on
                this subject? Any Projects done? Paper published? Extra classes?
                Seminars?
                <select
                  value={experience}
                  onChange={handleExperienceChange}
                >
                  <option value="">Select...</option>
                  <option value="Project">Projects done</option>
                  <option value="Paper published">Paper published</option>
                  <option value="Extra classes">Extra classes</option>
                  <option value="Seminars">Seminars</option>
                  <option value="None">None</option>
                </select>
              </label>
              <label>
                Is there any of your family members who have relevant experience
                with this course and can guide you?
                <select
                  value={familyGuide}
                  onChange={handleFamilyGuideChange}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <label>
                What is your Personality Score?
                <input
                  type="number"
                  value={personalityScore}
                  onChange={handlePersonalityScoreChange}
                />
              </label>
              <label>
                Do you have a scholarship?
                <select
                  value={scholarship}
                  onChange={handleScholarshipChange}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <label>
                Do you have Family income support?
                <select
                  value={income}
                  onChange={handleIncomeChange}
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <label>
                What is the distance in miles from your home to the university?
                <input
                  type="number"
                  value={proximity}
                  onChange={handleProximityChange}
                />
              </label>
              <label>
                Working?
                <select
                  value={workStatus}
                  onChange={handleWorkStatusChange}
                >
                  <option value="">Select...</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="No">Not working</option>
                </select>
              </label>
              <label>
                <button
                  className="btnsubmitin"
                  value={submitted ? "Update" : "Submit"}
                  onClick={confirmation}
                >
                  Submit
                </button>
              </label>
            </div>
          </div>
        </form>
      }
    </div>
  );
};

const Inquestionare = () => {
  const logoutTimeoutRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      const userRole = localStorage.getItem("userType");
      // console.log("userRole", userRole);
      if (!email || email === "undefined" || email === "null") {
        navigate("/login");
      }

      if (userRole !== ADMIN_ROLE && userRole !== ADVISOR_ROLE) {
        navigate("/unauthorized");
        // return <Unauthorized />;
      }
    };

    checkLoggedIn();
  }, []);

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

  const serverSideLogout = () => {
    fetch(`${LOGOUT_URL}`, {
      //"http://localhost:5000/logout"
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // Clear local storage and redirect to login page after successful logout
          localStorage.clear();
          window.location.href = "../login";
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [submitted, setSubmitted] = useState(false);
  const [menuContent, setMenuContent] = useState("default");

  return (
    // <div className="background">
    //     <div className="loginChild">

    //         {/*Page Header */}

    //         <div className="loginInner">
    //             <div className="neiu" style={{ left: '90px' }}>
    //                 Student Information
    //             </div>
    //             <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
    //         </div>
    //         {/* Body */}
    //         <div className="loginItem">
    //             {/* Side panel */}
    //             <div className="Slidebar">
    //                 <div className="form">
    //                     {/* <div class="form-group">
    //                         <button onClick={() => setMenuContent("Landing")} className="btn1131" > Student Home </button>
    //                     </div> */}
    //                     <div class="form-group1111">
    //                         <button onClick={() => setMenuContent("demographic")} className="btn1231" >Student Profile </button>
    //                     </div>
    //                     <div class="form-group1111">
    //                         <button onClick={() => setMenuContent("personality")} className="btn1331" > Student Personality </button>
    //                     </div>
    //                     <div class="form-group1111">
    //                         <button onClick={() => setMenuContent("questionare")} className="btn1431" > Student Questionare</button>
    //                     </div>
    //                     <div class="form-group1111">
    //                         <button onClick={() => setMenuContent("assesmentresult")} className="btn1531" > Assesment Result </button>
    //                     </div>
    //                     {/* <div class="form-group">
    //                         <button onClick={settings} className="btn1531" > Settings </button>
    //                     </div> */}
    //                     {/* <div class="form-group">
    //                         <button onClick={serverSideLogout} className="btn1631" > Logout </button>
    //                     </div> */}
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="menubarin">
    //             {/* Conditional rendering based on state */}

    //             {menuContent === "default" && (
    //                 <div className="formin">
    //                     <h1 style={{ textAlign: "center", color: "#ffff", fontWeight: "bold" }}>
    //                         Welcome to Student Detail Page
    //                     </h1>
    //                 </div>
    //             )}

    //             {/* {menuContent === "Landing" && (
    //                 <div className="formin">
    //                     {<ToLanding />}
    //                 </div>
    //             )} */}

    //             {menuContent === "personality" && (

    //                 < ToPersonality />

    //             )}

    //             {menuContent === "questionare" && (

    //                 <Toquestionare />

    //             )}

    //             {menuContent === "demographic" && (

    //                 <ToDemographic />

    //             )}

    //             {menuContent === "assesmentresult" && (

    //                 <ToAssesmentresult />

    //             )}

    //         </div>
    //     </div>
    // </div>

    <div>
      {/*Page Header */}
      {/* <div className="loginInner">
                    <div className="neiu" style={{ left: '90px' }}>
                        Student Information
                    </div>
                    <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
                </div> */}

      {/* Taskbar */}
      <div className="taskbar">
        <button
          className={
            menuContent === "default"
              ? "taskbar-button active"
              : "taskbar-button"
          }
          onClick={() => setMenuContent("default")}
        >
          Home
        </button>
        <button
          className={
            menuContent === "demographic"
              ? "taskbar-button active"
              : "taskbar-button"
          }
          onClick={() => setMenuContent("demographic")}
        >
          Profile
        </button>
        <button
          className={
            menuContent === "personality"
              ? "taskbar-button active"
              : "taskbar-button"
          }
          onClick={() => setMenuContent("personality")}
        >
          Personality
        </button>
        <button
          className={
            menuContent === "questionare"
              ? "taskbar-button active"
              : "taskbar-button"
          }
          onClick={() => setMenuContent("questionare")}
        >
          Questionnaire
        </button>
        <button
          className={
            menuContent === "assesmentresult"
              ? "taskbar-button active"
              : "taskbar-button"
          }
          onClick={() => setMenuContent("assesmentresult")}
        >
          Assessment Result
        </button>
      </div>

      <div className="menubarin">
        {/* Conditional rendering based on state */}
        {menuContent === "default" && (
          <div className="formin">
            <h1
              style={{
                textAlign: "center",
                color: "#ffff",
                fontWeight: "bold",
              }}
            >
              Welcome to Student Detail Page
            </h1>
          </div>
        )}
        {menuContent === "personality" && <ToPersonality />}
        {menuContent === "questionare" && <Toquestionare />}
        {menuContent === "demographic" && <ToDemographic />}
        {menuContent === "assesmentresult" && <ToAssesmentresult />}
      </div>
    </div>
  );
};
export default Inquestionare;
