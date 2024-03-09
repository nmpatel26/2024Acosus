import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
import "./ModelFeatures.css";





const ModelFeatures = () => {
    const logoutTimeoutRef = useRef(null);

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

    const AdminHome = () => {
        window.location.href = "/Admin";

    };
    
    const TraingHome = () => {
        window.location.href = "/TraingHome";

    };

    const ModelFeatures = () => {
        window.location.href = "/ModelFeatures";

    };

    const Data = () => {
        window.location.href = "/Data";

    };


    const NNClick = () => {
        alert("Neural Network Model is using")
    }

    const RegressionClick = () => {
        alert("Regression Model is using")
    }

    const model = {
        modelName: '' // This property will be assigned the button value
    };



    const loadModel = async (modelType) => {
        try {
            console.log("loadmodel funtion")
            console.log(typeof modelType);
            const response = await fetch(`http://192.168.0.21:5001/set_model?model_name=${modelType}`);
            console.log("After fetch call...")
            if (!response.ok)
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else{
                
                alert("The Model is set to + .....")
            }
            // print(response)
            // alert("done.....")
            // if (response == 200) {
            //     alert("loaded successfully.")
            //     console.log(`Model ${modelType} loaded successfully.`);
            // } else {
            //     alert("error occured.")
            //     console.error('Failed to load model.');
            // }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    


    const handleUseButtonClick = (modelType) => {
        alert(modelType + "selected")
        loadModel(modelType);
    };



    return (
        <div className="background">
            <div className="loginChild">

                {/*Page Header */}
                <div className="loginInner">
                    <div className="neiu" style={{ left: '90px' }}>
                        Model Features (Admin)
                    </div>
                    <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
                </div>

                <div className="loginItem">
                    {/* Side panel */}
                    {/* <div className={styles.menusidebar}></div> */}
                    <div className="Slidebar">
                        <div className="form">
                        <div class="btnorg">
                            <div class="form-group">
                                <button onClick={TraingHome} className="btn21" > Train and Test </button>
                            </div>
                            <div class="form-group">
                                <button onClick={ModelFeatures} className="btn22" > Model Features </button>
                            </div>
                            <div class="form-group">
                                <button onClick={Data} className="btn23" > Data </button>
                            </div>

                            <div class="form-group">
                                <button onClick={AdminHome} className="btn24" > Admin Home </button>
                            </div>

                            <div class="form-group">
                                <button onClick={serverSideLogout} className="btn25" > Logout </button>
                            </div>

                        </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

    );
};

export default ModelFeatures;
