import { useCallback, useRef } from "react";
import React, { useState, useEffect } from "react";
// import "./TraingHome.css";
import Instructor from "./Instructor";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  HOST_URL,
  LOGOUT_URL,
  MODEL_HOST_URL,
  MODEL_LOAD_URL,
} from "../utils/constants";

const ToModelFeatures = () => {
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      if (email === null) {
        window.location.href = "../login";
        alert("Please login first.");
      }
    };

    checkLoggedIn();
  }, []);

  const model = {
    modelName: "", // This property will be assigned the button value
  };

  const loadModel = async (modelType) => {
    try {
      console.log("loadmodel funtion");
      console.log(typeof modelType);
      const response = await fetch(
        // TODO : ASK ABOUT THIS TO NIKUNJ
        `${MODEL_LOAD_URL}/set_model?model_name=${modelType}` //        `http://192.168.0.21:5001/set_model?model_name=${modelType}`
      );
      console.log("After fetch call...");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        alert("The Model is set to + .....");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUseButtonClick = (modelType) => {
    alert(modelType + "selected");
    loadModel(modelType);
  };

  return <div></div>;
};

const ToData = () => {
  const [data, setData] = useState([]);
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      if (email === null) {
        window.location.href = "../login";
        alert("Please login first.");
      }
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    fetch(`${HOST_URL}/getModelHistory`, {
      //"http://localhost:5000/getModelHistory"
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "modelhistory");
        setData(data.data);
      });
  }, []);

  const loadModel = async (modelType) => {
    try {
      alert("Loading model.....");
      console.log("loadmodel function");
      console.log(typeof modelType);
      // TODO: ASK ABOUT THIS TO NIKUNJ-
      const response = await fetch(
        `${MODEL_LOAD_URL}/set_model?model_name=${modelType}` //        `http://192.168.0.21:5001/set_model?model_name=${modelType}`
      );
      console.log("After fetch call...");
      console.log(response);

      if (response.ok) {
        alert(`The Model is set to ${modelType}`);
        console.log(response); // Log the response for debugging purposes
        alert("loaded successfully.");
        console.log(`Model ${modelType} loaded successfully.`);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteModel = (id, mname) => {
    if (window.confirm(`Are you sure you want to delete ${mname}`)) {
      fetch(`${HOST_URL}/deleteModel`, {
        //"http://localhost:5000/deleteModel"
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          mname: id,
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
    fetch(`${HOST_URL}/getModelHistory`, {
      //"http://localhost:5000/getModelHistory"
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "modelhistory");
        setData(data.data);
      });
  };

  const handleUseButtonClick = (modelType) => {
    alert(modelType + "selected");
    loadModel(modelType);
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ minWidth: "570px" }}>
        <tr>
          <th className="fonttable">Model Name</th>
          <th className="fonttable">Last Updated</th>
          <th className="fonttable">Delete</th>
          <th className="fonttable">Click to Use</th>
        </tr>
        {data.map((i) => {
          return (
            <tr key={i._id}>
              <td className="fonttable">{i.mname}</td>
              <td className="fonttable">{i.dt}</td>
              <td align="center">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteModel(i._id, i.mname)}
                />
              </td>
              <td>
                <button
                  onClick={() => handleUseButtonClick("Neural_network.h5")}
                >
                  {" "}
                  Use Model{" "}
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

const TraingHome = () => {
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    const checkLoggedIn = () => {
      const email = localStorage.getItem("email");
      if (email === null) {
        window.location.href = "../login";
        alert("Please login first.");
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
    fetch(`${LOGOUT_URL}`, {
      //"http://localhost:5000/logout"
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // Clear local storage and redirect to login page after successful logout
          localStorage.clear();
          window.location.href = "../login";
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
      alert("Neural Network Model training....");
      // TODO: ASK ABOUT THIS TO NIKUNJ
      const response = await fetch(`${MODEL_HOST_URL}/trainNeural`); //"http://127.0.0.1:5001/trainNeural"
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      const { absolute, squared, r2 } = data;

      console.log("absolute:", absolute);
      console.log("squared:", squared);
      console.log("r2:", r2);
      alert("Training Completed absolute value of the model is " + absolute);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      console.log("Calling the train mongo api");
      const currentDate = new Date();
      const responses = await axios.post(`${HOST_URL}/modelhistory`, {
        //"http://localhost:5000/modelhistory"
        mname: modelName,
        dt: currentDate.toISOString(),
      });
      console.log(responses);
      if (responses.data === "Data inserted successfully") {
        console.log("success");
        alert("Model is saved successfully!");
      } else {
        console.log("error");
        alert("Error Occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error Occurred: " + error.message);
    }
  };

  const trainRegressionModel = async () => {
    console.log("Regression Model Training...");
  };
  const [menuContent, setMenuContent] = useState("default");
  return (
    <div className="background">
      <div className="loginChild">
        {/*Page Header */}
        <div className="loginInner">
          <div
            className="neiu"
            style={{ left: "90px" }}
          >
            Training Home (Admin)
          </div>
          <img
            className="neiuLogoIcon"
            alt="NEIU Logo"
            src="newlogo.png"
          />
        </div>

        <div className="loginItem">
          {/* Side panel */}
          {/* <div className={styles.menusidebar}></div> */}
          <div className="Slidebar">
            <div className="form">
              <div class="form-groupin101">
                <button
                  onClick={() => setMenuContent("default")}
                  className="btn101"
                >
                  {" "}
                  Train and Test{" "}
                </button>
              </div>
              <div class="form-groupin101">
                <button
                  onClick={() => setMenuContent("ModelFeatures")}
                  className="btn102"
                >
                  {" "}
                  Model Features{" "}
                </button>
              </div>
              <div class="form-groupin101">
                <button
                  onClick={() => setMenuContent("Data")}
                  className="btn103"
                >
                  {" "}
                  Data{" "}
                </button>
              </div>
              <div class="form-groupin101">
                <button
                  onClick={AdminHome}
                  className="btn104"
                >
                  {" "}
                  Admin Home{" "}
                </button>
              </div>
              <div class="form-groupin101">
                <button
                  onClick={serverSideLogout}
                  className="btn105"
                >
                  {" "}
                  Logout{" "}
                </button>
              </div>
            </div>

            {/* <div className="Leftpannel">
                            <div className="btnline">
                                <div className="formgroup">
                                    <button className="btn10" > Train and Test </button>
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

                        </div> */}
          </div>

          <div className="studentdatas">
            {/* <div className="menubar"> */}
            {/* <div className="Instructor">{`Instructor `}</div>
                            <img className="IconInstructor" alt="" src="/rectangle-4@2x.png" />
                            <div className="NameInstructor">Welcome, {localStorage.getItem('fullName')}  </div> */}

            {menuContent === "default" && (
              <div className="menubar">
                <div className="tablebackground">
                  <div style={{ width: "auto" }}>
                    <table style={{ width: 500 }}>
                      <tbody>
                        <tr>
                          <th align="Center">Model</th>
                          <th align="Center">Train/Test Model</th>
                        </tr>
                        <tr align="Center">
                          <td> Neural Network Model </td>
                          <td>
                            <button
                              onClick={() => trainNeuralModel("Neural Network")}
                            >
                              {" "}
                              Train Model{" "}
                            </button>
                          </td>
                        </tr>
                        <tr align="Center">
                          <td>Regression Model</td>
                          <td>
                            <button onClick={trainRegressionModel}>
                              {" "}
                              Train Model{" "}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {menuContent === "ModelFeatures" && (
              <div className="formin">{<ToModelFeatures />}</div>
            )}

            {menuContent === "Data" && (
              <div className="formin">{<ToData />}</div>
            )}

            {/* </div> */}
          </div>

          {/* <div className="loginGroupChild">
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
                                            <td><button onClick={trainRegressionModel}> Train Model </button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div> */}

          {/* </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default TraingHome;
