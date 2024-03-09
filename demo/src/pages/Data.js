import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
import "./Data.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Data = () => {
    const [data, setData] = useState([]);
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

    useEffect(() => {
        fetch("http://localhost:5000/getModelHistory", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data,"modelhistory");
                setData(data.data);
            })
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

    const loadModel = async (modelType) => {
        try {
            alert("Loading model.....")
            console.log("loadmodel function")
            console.log(typeof modelType);
            const response = await fetch(`http://192.168.0.21:5001/set_model?model_name=${modelType}`);
            console.log("After fetch call...")
            console.log(response)
    
            if (response.ok) {
                alert(`The Model is set to ${modelType}`);
                console.log(response); // Log the response for debugging purposes
                alert("loaded successfully.");
                console.log(`Model ${modelType} loaded successfully.`);
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    // const loadModel = async (modelType) => {
    //     try {
    //         alert("Loading model.....")
    //         console.log("loadmodel funtion")
    //         console.log(typeof modelType);
    //         const response = await fetch(`http://192.168.0.21:5001/set_model?model_name=${modelType}`, {
    //             mode:'no-cors' // Adjust the mode based on your CORS configuration
    //         });
    //         // const response1 = await fetch(`http://192.168.0.21:5001/set_model?model_name=${modelType}`);
    //         console.log("After fetch call...")
    //         console.log(response)
    //         if (response.ok) {
    //             alert(`The Model is set to ${modelType}`);
    //             console.log(response); // Log the response for debugging purposes
    //             alert("loaded successfully.");
    //             console.log(`Model ${modelType} loaded successfully.`);
    //         } else {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         alert("done.....")
    //         // if (response == 200) {
    //         //     alert("loaded successfully.")
    //         //     console.log(`Model ${modelType} loaded successfully.`);
    //         // } else {
    //         //     alert("error occured.")
    //         //     console.error('Failed to load model.');
    //         // }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    
    const deleteModel = (id, mname) => {
        if (window.confirm(`Are you sure you want to delete ${mname}`)) {
            fetch("http://localhost:5000/deleteModel", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    mname:id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.data);
                    getModelHistory();
                });
        } else {
        }
    };

    const getModelHistory = () => {
        fetch("http://localhost:5000/getModelHistory", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data,"modelhistory");
                setData(data.data);
            })
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
                        Data (Admin)
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
                                <button onClick={TraingHome} className="btn31" > Train and Test </button>
                            </div>
                            <div class="form-group">
                                <button onClick={ModelFeatures} className="btn32" > Model Features </button>
                            </div>
                            <div class="form-group">
                                <button onClick={Data} className="btn33" > Data </button>
                            </div>

                            <div class="form-group">
                                <button onClick={AdminHome} className="btn34" > Admin Home </button>
                            </div>

                            <div class="form-group">
                                <button onClick={serverSideLogout} className="btn35" > Logout </button>
                            </div>
                            </div>
                        </div>
                    </div>


                    <div className="Datamodel">

                        <div style={{ width: "auto" }}>
                            <table>
                                <tr>
                                    <th class="fonttable">Model Name</th>
                                    <th class="fonttable">Last Updated</th>
                                    <th class="fonttable">Delete</th>
                                    <th class="fonttable">Click to Use</th>
                                </tr>
                                {data.map(i => {
                                    return (
                                        <tr>
                                            <td class="fonttable">{i.mname}</td>
                                            <td class="fonttable">{i.dt}</td>
                                            <td  align= "center"> <FontAwesomeIcon icon={faTrash} onClick={() => deleteModel(i._id, i.mname)}/></td>
                                            
                                            <td><button  onClick={() => handleUseButtonClick('Neural_network.h5')}> Use Model </button></td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>

                      
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Data;
