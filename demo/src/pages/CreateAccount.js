import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import axios from 'axios';

const CreateAccount = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [userType, setuserType] = useState('');
  const [adminKey, setadminKey] = useState('');


  const onLoginButtonContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);
  

  const handleSubmit = async (e) => {

    if (userType == "Admin" && adminKey != "Nikunj") {
      e.preventDefault();
      alert("Invalid Admin Key");
    } else {

      e.preventDefault();
      if (password !== rePassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await axios.post('http://localhost:5000/register', {
        fname: firstName,
        lname: lastName,
        email: email,
        password,
        userType,
      });
      if (response.data.status === 'ok') {
        navigate("/login");
      } else {
        alert(response.data.error);
      }

    }


  };

  return (
    <div className="background">
      <div className="loginChild">
        <div className="loginInner" />
        <img className="neiuLogoIcon" alt="NEIU Logo" src="newlogo.png" /> {/* Add this line for the image */}

        {/* <div className={styles.createaccountInner} /> */}
        <div className="neiu" style={{ left: '90px' }}>NEIU Create Account Page</div>


        <div className="loginItem">

          <div className="registerbackground">



            <form className="registergroup" onSubmit={handleSubmit}>

              <div className="header">Register</div>
              <div className="form">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
              
                  <label class="radio-inline">
                  <input  class="radio-label" Type="radio" name="UserType" value="User" onChange={(e) => setuserType(e.target.value)} required />
                  User</label>
                  <label class="radio-inline">
                  <input class="radio-label" Type="radio" name="UserType" value="Admin" onChange={(e) => setuserType(e.target.value)} required />
                  Admin</label>
                </div>

                {userType == "Admin" ? (

                  <div className="formgroup">
                    <label >Admin Key</label>
                    <input placeholder="Admin Key"  value={adminKey} onChange={(e) => setadminKey(e.target.value)} required />
                  </div>

                ) : null}


                <div className="formgroup">
                  <label htmlFor="firstname">First Name</label>
                  <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="formgroup">
                  <label htmlFor="firstname">Last Name</label>
                  <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="formgroup">
                  <label htmlFor="firstname">Email</label>
                  <input placeholder="Email" Type="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="formgroup">
                  <label htmlFor="firstname">Password</label>
                  <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="formgroup">
                  <label htmlFor="firstname">Re-type Password</label>
                  <input placeholder="Re-type Password" type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />
                </div>
                <div className="formgroup">
                  <button className="btnregister" type="submit">Register</button>
                </div>
                <div className="formgroup" onClick={onLoginButtonContainerClick}>
                  <button className="btnlogin" > Login Here </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
