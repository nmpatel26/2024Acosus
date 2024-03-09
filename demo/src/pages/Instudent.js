import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Instructor.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Instructor";




const Instudent = () => {
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

    const Studentdetails = () => {
        window.location.href = "/SearchUser";

    };

    const InstructorHome = () => {
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

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const [data, setData] = useState([]);
    // useEffect(() => {
    //     getAllUser;
    // }, []);

    useEffect(() => {
        fetch("http://localhost:5000/getAllUser", {
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
    const getAllUser = () => {
        fetch("http://localhost:5000/getAllUser", {
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
                        Student Database (Advisor) 
                    </div>
                    <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
                </div>

                <div className="loginItem">
                    {/* Side panel */}
                    {/* <div className={styles.menusidebar}></div> */}
                    <div className="Slidebar">
                        <div className="form">
                            <div class="btnarrnageinstructor">
                                <div class="form-group">
                                    <button onClick={serverSideLogout} className="btn103" > Logout </button>
                                </div>
                                <div class="form-group">
                                    <button onClick={Studentdetails} className="btn101" >Student Search</button>
                                </div>
                                <div class="form-group">
                                    <button onClick={InstructorHome} className="btn102" >Instructor Home</button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="loginGroupChild">

                        <div style={{ width: "auto" }}>
                            <table style={{ width: 500 }}>
                                <tr>
                                    <th class="fonttable">FirstName</th>
                                    <th class="fonttable">LastName</th>
                                    <th class="fonttable">Email</th>
                                    <th class="fonttable">UserType</th>
                                    {/* <th class="fonttable">Delete</th> */}
                                </tr>
                                {data.map(i => {
                                    return (
                                        <tr>
                                            <td class="fonttable">{i.fname}</td>
                                            <td class="fonttable">{i.lname}</td>
                                            <td class="fonttable">{i.email}</td>
                                            <td class="fonttable">{i.userType}</td>
                                            {/* <td class="fonttable">
                                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(i._id, i.fname)} />
                                            </td> */}
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

export default Instudent;
