import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Instructor.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const SearchUser = () => {

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
    // const SSpersonality = async () => {

    //     try {
    //         const personalityResponse = await axios.get(`http://localhost:5000/Personality/${searchedEmail}`);
    //         setPersonalityData(personalityResponse.data);
    //         setShowDemographicData(false); // Hide demographic data
    //         setShowQuestionnaireData(false); // Hide questionnaire data
    //         setShowPersonalityData(true);

    //         // Save the selected email to local storage
    //         localStorage.setItem('selectedEmail', searchedEmail);

    //         // Navigate to the Personality page
    //         navigate('../Personality', {
    //             state: {
    //                 // questionnaireData: questionnaireResponse.data, // You can pass data if needed
    //                 email: searchedEmail,
    //             },
    //         });
    //     } catch (error) {
    //         console.error("Error fetching user data:", error);
    //     }
    // };


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
                </div>
            </div>


            <div className="SSmenu">


                {/* <button className="btnsu102" onClick={SSdemographic}>Demographic Data</button> */}
                {/* <button className="btnsu103" onClick={SSpersonality}>Personality Data</button> */}

                {/* Button for search user */}
                {/* <button className="btnsu101" onClick={SSquestionnaire}>Search Student </button> */}



                {/* <div className="SSdata"> */}
                {/* <input
                        type="text"
                        placeholder="Type an email to Search Student"
                        value={searchedEmail}
                        onChange={(e) => {
                            setSearchedEmail(e.target.value);
                            updateEmailSuggestions(e.target.value);
                        }}
                    /> */}
                {/* <ul> */}
                {/* Display email suggestions */}
                {/* {emailSuggestions.map((email, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
                                <span onClick={() => setSearchedEmail(email)}>{email}</span>
                                <button className="btnicon" onClick={SSquestionnaire}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </li>
                        ))} */}
                {/* </ul> */}
                {/* <div className="SSdata">
                        <input
                            type="text"
                            placeholder="Type an email to Search Student"
                            value={searchedEmail}
                            onChange={(e) => {
                                setSearchedEmail(e.target.value);
                                updateEmailSuggestions(e.target.value);
                            }}
                        /> */}

                {/* <ul> */}
                {/* Display email suggestions */}
                {/* {emailSuggestions.map((email, index) => (
                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left' }}>
                                    <span onClick={() => { setSearchedEmail(email); SSquestionnaire(); }}>{email}</span>
                                    <FontAwesomeIcon icon={faSearch} className="btnicon" onClick={() => { setSearchedEmail(email); SSquestionnaire(); }} />
                                </li>
                            ))}
                        </ul> */}


                {/* </div> */}
                {/* </div> */}
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
        </div>

    );
};

export default SearchUser;


