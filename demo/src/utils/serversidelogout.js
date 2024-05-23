import { LOGOUT_URL } from "./constants";

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
      } else {
        console.error(data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export { serverSideLogout };
