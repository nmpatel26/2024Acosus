import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import styles from "./cssquestionnare/css.module.css";



const Questionaire = () => {
    const [submitted, setSubmitted] = useState(false);


    const personality = () => {

        window.location.href = "../personality";


    };

    const confirmation = () => {

        // alert('Form saved sucessfully');
        // window.location.href="../landing";

    };

    const Landing = () => {

        window.location.href = "../landing";


    };

    const demo = () => {

        window.location.href = "../demographic";


    };

    const Assesmentresult = () => {

        window.location.href = "../Assesmentresult";


    };
    const settings = () => {

        window.location.href = "../Changepassword";


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
    const [course_similarity, setCourse_similarity] = useState("Information Systems")
    const [career, setCareer] = useState("");
    const [interest, setInterest] = useState("");
    const [experience, setExperience] = useState("");
    const [familyGuide, setFamilyGuide] = useState("");
    const [personalityScore, setPersonalityScore] = useState("");
    const [scholarship, setScholarship] = useState("");
    const [income, setIncome] = useState("");
    const [proximity, setProximity] = useState("");
    const logoutTimeoutRef = useRef(null);



    useEffect(() => {

        
        const email = localStorage.getItem('email');

        const selectedEmail = localStorage.getItem('selectedEmail');
        const apiUrl = selectedEmail ? 'http://localhost:5000/questionaire/' + selectedEmail : 'http://localhost:5000/questionaire/' + email;


        // fetch('http://localhost:5000/questionaire/' + selectedEmail)
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.gpa && data.credits && data.satScore && data.course && data.career && data.interest && data.experience && data.familyGuide && data.scholarship && data.proximity) {
                    setSubmitted(true);
                    setGpa(data.gpa || '');
                    setCredits(data.credits || '');
                    setSatScore(data.satScore || '');
                    setCourse(data.course || '');
                    setCareer(data.career || '');
                    setInterest(data.interest || '');
                    setExperience(data.experience || '');
                    setFamilyGuide(data.familyGuide || '');
                    setPersonalityScore(data.personalityScore || '');
                    setScholarship(data.scholarship || '');
                    setIncome(data.income || '');
                    setProximity(data.proximity || '');


                }

                setGpa(data.gpa || '');
                setCredits(data.credits || '');
                setSatScore(data.satScore || '');
                setCourse(data.course || '');
                setCareer(data.career || '');
                setInterest(data.interest || '');
                setExperience(data.experience || '');
                setFamilyGuide(data.familyGuide || '');
                setPersonalityScore(data.personalityScore || '');
                setScholarship(data.scholarship || '');
                setIncome(data.income || '');
                setProximity(data.proximity || '');

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);


    const email = localStorage.getItem('email');
    const selectedEmail = localStorage.getItem('selectedEmail');

    const fullName = localStorage.getItem('fullName');
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
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',

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
                })
            };

            const response = await fetch('http://127.0.0.1:5001/model/predict', request);
            const response_from_api = await response.json();
            const msg_alert = 'Percentage of student qualify is: ' + response_from_api;
            alert(msg_alert)
            //   handleResultChange(response_from_api)
            localStorage.setItem('selectedEmail', email);

            try {
                console.log("Calling the Model Response api")
                const responses = await axios.post('http://localhost:5000/modelResponses', {
                    email: selectedEmail1,
                    mresult: response_from_api,
                }
                )
                console.log(responses)
                if (responses.status == 200) {
                    console.log("success");
                    alert("Model Response is saved successfully!");
                } else {
                    console.log(responses);
                    alert(responses);
                }
            }
            catch (error) {
                console.error('Error:', error);
                alert("Error Occurred: " + error.message);
            }
            // Extract 'result' from the response or define it separately
            const result = response_from_api.result;



            // alert("Saving data to the mongo db...")
            fetch('http://localhost:5000/questionaire', {
                // fetch(apiUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    result: 56,
                })
            })

                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert("Data saved to MongoDB successfully!");
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("Error saving data to MongoDB");
                });



        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div className="background">
            <div className="loginChild">

                {/*Page Header */}

                <div className={styles.loginInner}>
                    <div className={styles.neiu} style={{ left: '90px' }}>
                        Questionnare Info
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
                                <button onClick={Landing} className={styles.btn131} > Home </button>
                            </div>
                            <div class="form-group">
                                <button onClick={demo} className={styles.btn231} > Profile </button>
                            </div>
                            <div class="form-group">
                                <button onClick={personality} className={styles.btn331} > Personality </button>
                            </div>
                            <div class="form-group">
                                <button onClick={Assesmentresult} className={styles.btn431} > Assesment Result </button>
                            </div>
                            <div class="form-group">
                                <button onClick={settings} className={styles.btn531} > Settings </button>
                            </div>
                            <div class="form-group">
                                <button onClick={serverSideLogout} className={styles.btn631} > Logout </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.menubar}>

                    <div className={styles.form}>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formContainer}>
                                <div>
                                    <label>
                                        What are your GPA scores?
                                        <input type="number" step="0.1" min="0" max="4" value={gpa} onChange={handleGpaChange} />
                                    </label>
                                    <label>
                                        How many credits have you completed?
                                        <input type="number" value={credits} onChange={handleCreditsChange} />
                                    </label>
                                    <label>
                                        What is your SAT score?
                                        <input type="text" value={satScore} onChange={handleSatScoreChange} />
                                    </label>
                                    <label>
                                        How many courses you're opting for?
                                        <input type="number" value={course} onChange={handleCourseChange} />
                                    </label>
                                    <label>
                                        What is your career aspiration?
                                        <input type="text" value={career} onChange={handleCareerChange} />
                                    </label>
                                    <label>
                                        How much are you interested in the course? (From a scale of 1 to 10)
                                        <input type="number" min="1" max="10" value={interest} onChange={handleInterestChange} />
                                    </label>
                                    <label>
                                        How much exposure or experience and knowledge do you have on this
                                        subject? Any Projects done? Paper published? Extra classes? Seminars?
                                        <select value={experience} onChange={handleExperienceChange}>
                                            <option value="">Select...</option>
                                            <option value="Project">Projects done</option>
                                            <option value="Paper published">Paper published</option>
                                            <option value="Extra classes">Extra classes</option>
                                            <option value="Seminars">Seminars</option>
                                            <option value="None">None</option>
                                        </select>
                                    </label>
                                    <label>
                                        Is there any of your family members who have relevant experience with this course and can guide you?
                                        <select value={familyGuide} onChange={handleFamilyGuideChange}>
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </label>
                                    <label>
                                        What is your Personality Score?
                                        <input type="number" value={personalityScore} onChange={handlePersonalityScoreChange} />
                                    </label>
                                    <label>
                                        Do you have a scholarship?
                                        <select value={scholarship} onChange={handleScholarshipChange}>
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </label>
                                    <label>
                                        Do you have Family income support?
                                        <select value={income} onChange={handleIncomeChange}>
                                            <option value="">Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </label>
                                    <label>
                                        What is the distance in miles from your home to the university?
                                        <input type="number" value={proximity} onChange={handleProximityChange} />
                                    </label>
                                    <label>
                                        <button className={styles.btnsubmit} value={submitted ? "Update" : "Submit"} onClick={confirmation} >Submit</button>
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

export default Questionaire;