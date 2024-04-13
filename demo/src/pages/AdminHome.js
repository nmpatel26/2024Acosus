import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  "./AdminHome.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const AdminHome = () => {
    const logoutTimeoutRef = useRef(null);

    const navigate = useNavigate();
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

    const TraingHome = () => {
        window.location.href = "/TraingHome";

    };

    const Instructorcreateaccount = () =>{
        window.location.href ="/Instructorcreateaccount";
    }

    const advisor = () => {
        window.location.href = "/Instructor";

    };


    const [userPackage, setUserPackage] = useState({ fullName: '', email: '' });

    useEffect(() => {
        const storedName = localStorage.getItem('fullName');
        const storedEmail = localStorage.getItem('email'); // Add email retrieval
        if (storedName && storedEmail) {
            setUserPackage({ fullName: storedName, email: storedEmail }); // Set fullName and email in userPackage
        }
    }, []);

    const [data, setData] = useState([]);
    // useEffect(() => {
    //     getAllUser;
    // }, []);

    useEffect(() => {
        fetch("http://localhost:5000/AllUser", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setData(data.data);
            })
    }, []);


    //deleting user
    const deleteUser = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            fetch("http://localhost:5000/deleteUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.data);
                    getAllUser();
                });
        } else {
        }
    };

    //fetching all user
    const AllUser = () => {
        fetch("http://localhost:5000/AllUser", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setData(data.data);
            });
    };

    return (
        <div className="background">
            <div className="loginChild">

                {/*Page Header */}
                <div className="loginInner">
                    <div className="neiu" style={{ left: '90px' }}>
                        Student User Data (Admin)
                    </div>
                    <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
                </div>

                <div className="loginItem">
                    {/* Side panel */}
                    {/* <div className={styles.menusidebar}></div> */}
                    <div className="Slidebar">
                        <div className="form">
                            <div className="adminfont" style={{ left: '60px' }} >Admin </div>
                            <div className="btnorg">
                            <div className="form-group">
                                    <button onClick={advisor} className="btnadvisor" > Advisor </button>
                                </div>
                                <div className="form-group">
                                    <button onClick={serverSideLogout} className="btnlogout" > Logout </button>
                                </div>
                                <div className="form-group">
                                    <button onClick={TraingHome} className="btnth" > Training Home </button>
                                </div>
                                <div className="form-group">
                                    <button onClick={Instructorcreateaccount} className="btnal" > Create Advisor Account </button>
                                </div>

                            </div>

                        </div>
                    </div>


                    <div className="Studentdatamd">
                        {/* <button onClick={serverSideLogout} className="btn3" > Logout </button> */}
                        <div style={{ width: "Auto", maxHeight: "400px", overflowY: "auto" }}>
                            <table style={{ width: 500 }}>
                                <tbody>
                                <tr>
                                    <th className="fonttable">FirstName</th>
                                    <th className="fonttable">LastName</th>
                                    <th className="fonttable">Email</th>
                                    <th className="fonttable">UserType</th>
                                    <th className="fonttable">Delete</th>
                                </tr>
                                {data.map(i => {
                                    return (
                                        <tr>
                                            <td className="fonttable">{i.fname}</td>
                                            <td className="fonttable">{i.lname}</td>
                                            <td className="fonttable">{i.email}</td>
                                            <td className="fonttable">{i.userType}</td>
                                            <td className="fonttable">
                                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(i._id, i.fname)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminHome;
