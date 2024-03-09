import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";



const LandingPage = () => {
    const logoutTimeoutRef = useRef(null);
    const demo = () => {

        window.location.href = "../demographic";


    };

    const Assesmentresult = () => {

        window.location.href = "../Assesmentresult";


    };

    const navigate = useNavigate();
    const onSettingsClick = useCallback(() => {
        navigate("/Changepassword");
    }, [navigate]);
    const Logout = useCallback(() => {
        navigate("/login");
        localStorage.clear();
    }, [navigate]);
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



    const onRectangle1Click = useCallback(() => {
        navigate("/questionare");
    }, [navigate]);

    const onCompDemoClick = useCallback(() => {
        navigate("/demographic");
    }, [navigate]);

    const onCompPersClick = useCallback(() => {
        navigate("/personality");
    }, [navigate]);

    const [userPackage, setUserPackage] = useState({ fullName: '', email: '' });

    useEffect(() => {
        const storedName = localStorage.getItem('fullName');
        const storedEmail = localStorage.getItem('email'); // Add email retrieval
        
        if (storedName && storedEmail) {
            setUserPackage({ fullName: storedName, email: storedEmail }); // Set fullName and email in userPackage
        }
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div className={styles.background}>
            <div className={styles.loginChild}>

                {/*Page Header */}
                <div className={styles.loginInner}>
                    <div className={styles.neiu} style={{ left: '90px' }}>
                        AI-driven Counseling System for Transfer Students
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
                                <button onClick={demo} className={styles.btn11} > Profile </button>
                            </div>
                            <div class="form-group">
                                <button onClick={onSettingsClick} className={styles.btn21} > Settings </button>
                            </div>
                            <div class="form-group">
                                <button onClick={Assesmentresult} className={styles.btn31} > Assesment Result </button>
                            </div>
                            <div class="form-group">
                                <button onClick={serverSideLogout} className={styles.btn3} > Logout </button>
                            </div>


                        </div>
                    </div>



                    <div className={styles.loginGroupChild}>
                        <div className={styles.menubar}>
                            <div className={styles.computerScience}>{`Computer Science `}</div>
                            <img className={styles.rectangleIcon1} alt="" src="/rectangle-4@2x.png" />
                            <div className={styles.User}>Welcome, {localStorage.getItem('fullName')}  </div>
                        </div>
                        <div className={styles.check1}>
                            <div className={styles.landingpageChild5}>
                                <div className={styles.checklist1}>{`Check List`}</div>
                            </div>
                            <div className={styles.form}>
                                <div class="form-group">
                                    <button onClick={onRectangle1Click} className={styles.btn4} >Questionare </button>
                                </div>
                                <div class="form-group">
                                    <button onClick={onCompPersClick} className={styles.btn5} > Personality Test </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
