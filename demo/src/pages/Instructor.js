import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Instructor.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const ToInstudent = () => {
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

        <div className="Instudentdetail">

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


    );
};

const ToSearchUser = () => {

    const [emails, setEmails] = useState([]);
    // const [selectedEmail, setSelectedEmail] = useState('');
    const [demographicData, setDemographicData] = useState(null);
    const [questionnaireData, setQuestionnaireData] = useState(null);
    // const [personalityData, setPersonalityData] = useState(null);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user-emails');
                setEmails(response.data);
            } catch (error) {
                console.error("Error fetching emails:", error);
            }
        };

        fetchEmails();
    }, []);

    const Studentdetails = () => {
        window.location.href = "/SearchUser";

    };

    const InstructorHome = () => {
        window.location.href = "/Instructor";

    };


    const [showDemographicData, setShowDemographicData] = useState(false);
    const [showQuestionnaireData, setShowQuestionnaireData] = useState(false);
    const [showPersonalityData, setShowPersonalityData] = useState(false);

    const SSdemographic = async () => {
        try {
            const demographicResponse = await axios.get(`http://localhost:5000/demographics/${searchedEmail}`);
            setDemographicData(demographicResponse.data);
            setShowDemographicData(true);
            setShowQuestionnaireData(false); // Hide questionnaire data
            setShowPersonalityData(false); // Hide personality data
            // window.location.href = "../demographic";

            // Save the selected email to local storage
            localStorage.setItem('selectedEmail', searchedEmail);

            // Navigate to the demographic page
            navigate('../demographic', {
                state: {
                    // questionnaireData: questionnaireResponse.data, // You can pass data if needed
                    email: searchedEmail,
                },
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const SSquestionnaire = async () => {
        try {
            const questionnaireResponse = await axios.get(`http://localhost:5000/questionaire/${searchedEmail}`);
            setQuestionnaireData(questionnaireResponse.data);
            setShowDemographicData(false); // Hide demographic data
            setShowQuestionnaireData(true);
            setShowPersonalityData(false); // Hide personality data

            // Save the selected email to local storage
            localStorage.setItem('selectedEmail', searchedEmail);

            // Open the questionnaire page in a new window
            const newWindow = window.open('../Inquestionare', '_blank');

            if (newWindow) {
                // Pass data to the new window if needed
                newWindow.postMessage({ email: searchedEmail, questionnaireData: questionnaireResponse.data }, '*');
            } else {
                console.error("Error opening new window.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const navigate = useNavigate();
    const [searchedEmail, setSearchedEmail] = useState();
    const [emailSuggestions, setEmailSuggestions] = useState([]);
    const updateEmailSuggestions = (input) => {
        // Clear the email suggestions and reset searchedEmail when input is empty
        if (!input) {
            setEmailSuggestions([]);
            setSearchedEmail("");
            return;
        }

        const filteredEmails = emails.filter(email => email.toLowerCase().includes(input.toLowerCase()));
        setEmailSuggestions(filteredEmails);
    };

    useEffect(() => {
        const storedName = localStorage.getItem('fullName');
        const storedEmail = localStorage.getItem('email'); // Add email retrieval
        if (storedName && storedEmail) {
            setUserPackage({ fullName: storedName, email: storedEmail }); // Set fullName and email in userPackage
        }
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const [userPackage, setUserPackage] = useState({ fullName: '', email: '' });

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

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({ fname: '', lname: '', email: '' });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getAllUser');
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSearchQuery({ ...searchQuery, [name]: value });
    };

    const filteredData = data.filter((user) => {
        return (
            user.fname.toLowerCase().includes(searchQuery.fname.toLowerCase()) &&
            user.lname.toLowerCase().includes(searchQuery.lname.toLowerCase()) &&
            user.email.toLowerCase().includes(searchQuery.email.toLowerCase())
        );
    });

    return (

        <div className="InSearchUsermenu">

            <div >
                <div className="search-fields" >
                    <input
                        type="text"
                        name="fname"
                        value={searchQuery.fname}
                        placeholder="Search by First Name"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="lname"
                        value={searchQuery.lname}
                        placeholder="Search by Last Name"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="email"
                        value={searchQuery.email}
                        placeholder="Search by Email"
                        onChange={handleInputChange}
                    />

                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}> {
                    (searchQuery.fname || searchQuery.lname || searchQuery.email) && // Only render if any search query is present
                    filteredData.length > 0 && (
                        <div style={{ width: "auto" }}>
                            <table style={{ width: 500 }}>
                                <thead>
                                    <tr>
                                        <th className="fonttable">FirstName</th>
                                        <th className="fonttable">LastName</th>
                                        <th className="fonttable">Email</th>
                                        <th className="fonttable">Search</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user) => (
                                        <tr key={user._id}>
                                            <td className="fonttable">{user.fname}</td>
                                            <td className="fonttable">{user.lname}</td>
                                            <td className="fonttable">{user.email}</td>
                                            <td className="fonttable">{<FontAwesomeIcon icon={faSearch} className="btnicon" onClick={() => { setSearchedEmail(user.email); SSquestionnaire(); }} />
                                            }</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )
                }
                </div>
            </div >
        </div>


    );
};

const Instructor = () => {
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

    // const Studentdetails = () => {
    //     window.location.href = "/SearchUser";

    // };

    // const StudentSearch = () => {
    //     window.location.href = "/Instudent";

    // };



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
    const [menuContent, setMenuContent] = useState("default");

    return (
        <div className="background">
            <div className="loginChild">

                {/*Page Header */}
                <div className="loginInner">
                    <div className="neiu" style={{ left: '90px' }}>
                        Advisor
                    </div>
                    <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" />
                </div>

                <div className="loginItem">
                    {/* Side panel */}
                    {/* <div className={styles.menusidebar}></div> */}
                    <div className="Slidebar">
                        <div className="form">
                            {/* <div class="btnarrnageinstructor">
                                <div class="form-groupin101">
                                    <button onClick={serverSideLogout} className="btn104" > Logout </button>
                                </div>
                                <div class="form-groupin101">
                                    <button onClick={Studentdetails} className="btn103" >Student Search</button>
                                </div>
                                <div class="form-groupin101">
                                    <button onClick={StudentSearch} className="btn102" >Student Details</button>
                                </div>
                                <div class="form-groupin101">
                                    <button onClick={StudentSearch} className="btn101" >Instructor Home </button>
                                </div>
                            </div> */}

                            <div class="form-groupin101">
                                <button onClick={() => setMenuContent("default")} className="btn101" > Advisor Home </button>
                            </div>
                            <div class="form-groupin101">
                                <button onClick={() => setMenuContent("StudentDetails")} className="btn102" >Student Details </button>
                            </div>
                            <div class="form-groupin101">
                                <button onClick={() => setMenuContent("StudentSearch")} className="btn103" > Student Search </button>
                            </div>
                            <div class="form-groupin101">
                                <button onClick={serverSideLogout} className="btn104" > Logout </button>
                            </div>

                        </div>
                    </div>

                    <div className="studentdatas">
                        {/* <div className="menubar"> */}
                        {/* <div className="Instructor">{`Instructor `}</div>
                            <img className="IconInstructor" alt="" src="/rectangle-4@2x.png" />
                            <div className="NameInstructor">Welcome, {localStorage.getItem('fullName')}  </div> */}

                        {menuContent === "default" && (

                            <div className="menubar">
                                <div className="Instructor">{`Instructor `}</div>
                                <img className="IconInstructor" alt="" src="/rectangle-4@2x.png" />
                                <div className="NameInstructor">Welcome, {localStorage.getItem('fullName')}  </div>
                            </div>
                        )}

                        {menuContent === "StudentDetails" && (
                            <div className="formin">
                                {<ToInstudent />}
                            </div>
                        )}

                        {menuContent === "StudentSearch" && (
                            <div className="formin">
                                {<ToSearchUser />}
                            </div>
                        )}

                        {/* </div> */}
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Instructor;
