import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
import "./TraingHome.css";
import axios from 'axios';




const TraingHome = () => {
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

    const ModelFeatures = () => {
        window.location.href = "/ModelFeatures";

    };

    const Data = () => {
        window.location.href = "/Data";

    };

    // Inside your React component
    const trainNeuralModel = async (modelName) => {

        try {
            alert("Neural Network Model training....")
            const response = await fetch('http://127.0.0.1:5001/trainNeural');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            const { absolute, squared, r2 } = data;

            console.log('absolute:', absolute);
            console.log('squared:', squared);
            console.log('r2:', r2);
            alert("Training Completed absolute value of the model is "+ absolute)
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        
    try {
                console.log("Calling the train mongo api")
                const currentDate = new Date();
                const responses = await axios.post('http://localhost:5000/modelhistory',{
                    mname: modelName,
                    dt: currentDate.toISOString(),
                }
                )
                console.log(responses)
                if (responses.data === 'Data inserted successfully') {
                    console.log("success");
                    alert("Model is saved successfully!");
                } else {
                    console.log("error");
                    alert("Error Occurred");
                }
                }
                catch (error) {
                    console.error('Error:', error);
                    alert("Error Occurred: " + error.message);
                }

    };

    const trainRegressionModel = async () => {
        console.log("Regression Model Training...")
    }
    return (
        <div className="background">
            <div className="loginChild">

                {/*Page Header */}
                <div className="loginInner">
                    <div className="neiu" style={{ left: '90px' }}>
                        Training Home (Admin)
                    </div>
                    <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
                </div>

                <div className="loginItem">
                    {/* Side panel */}
                    {/* <div className={styles.menusidebar}></div> */}
                    <div className="Slidebar">
                        <div className="Leftpannel">
                            <div className="btnline">
                            <div className="formgroup">
                                <button  className="btn10" > Train and Test </button>
                            </div>
                            <div className="formgroup">
                                <button onClick={ModelFeatures} className="btn12" > Model Features </button>
                            </div>
                            <div className="formgroup">
                                <button onClick={Data} className="btn13" > Data </button>
                            </div>

                            <div className="formgroup">
                                <button onClick={AdminHome} className="btn14" > Admin Home </button>
                            </div>

                            <div className="formgroup">
                                <button onClick={serverSideLogout} className="btn15" > Logout </button>
                            </div>
                            </div>
                            

                        </div>
                    </div>


                    <div className="loginGroupChild">
                        {/* <button onClick={serverSideLogout} className="btn3" > Logout </button> */}
                        <div className="tablebackground">
                        <div style={{ width: "auto" }}>
                            <table style={{ width: 500 }} >
                                <tbody>
                                <tr>
                                    <th align="Center">Model</th>
                                    <th align="Center">Train/Test Model</th>

                                </tr>
                                <tr align="Center">
                                    <td> Neural Network Model </td>
                                    <td ><button onClick={() => trainNeuralModel('Neural Network')}> Train Model </button></td>
                                </tr>
                                <tr align="Center">
                                    <td>Regression Model</td>
                                    <td><button  onClick={trainRegressionModel}> Train Model </button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>   

                
                        </div>
                    </div>

                        {/* </div>
                    </div> */}
                </div>
            </div>
        </div>

    );
};

export default TraingHome;
