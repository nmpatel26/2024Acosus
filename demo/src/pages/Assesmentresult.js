import React, { useState, useEffect, useRef } from "react";
import styles from "./Personality.module.css";

const Assesmentresult = () => {


    const Questionnarepage = () => {

        window.location.href = "../questionare";


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

    const personality = () => {

        window.location.href = "../personality";


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
        

        fetch('http://localhost:5000/Personality/' + email)
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

    const [mresult, setMResult] = useState();

    useEffect(() => {
        const email = localStorage.getItem('email');
        const selectedEmail = localStorage.getItem('selectedEmail');
        const apiUrl = selectedEmail ? 'http://localhost:5000/modelResponses/' + selectedEmail : 'http://localhost:5000/modelResponses/' + email;

        // fetch("http://localhost:5000/modelResponses/" + email, {
        fetch(apiUrl,{
        method: "GET",
        })
            .then((res) => res.json())
            .then((mresult) => {
                console.log(mresult, "mresult")
                setMResult(mresult.mresult)
            })
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
                                <button onClick={Landing} className={styles.btn151} > Home </button>
                            </div>
                            <div class="form-group">
                                <button onClick={demo} className={styles.btn251} > Profile </button>
                            </div>
                            <div class="form-group">
                                <button onClick={Questionnarepage} className={styles.btn351} > Questionnaire </button>
                            </div>
                            <div class="form-group">
                                <button onClick={personality} className={styles.btn451} > Personality </button>
                            </div>
                            <div class="form-group">
                                <button onClick={settings} className={styles.btn551} > Settings </button>
                            </div>
                            <div class="form-group">
                                <button onClick={serverSideLogout} className={styles.btn651} > Logout </button>
                            </div>
                        </div>
                    </div>
                </div>



                <div className={styles.menubar}>
                    <div className={styles.form}>



                        <div className={styles.questionnaire}>

                            <label htmlFor="personality">
                                Your Assesment Score is : {mresult}
                            </label>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Assesmentresult;
