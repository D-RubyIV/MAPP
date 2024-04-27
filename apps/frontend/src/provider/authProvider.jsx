import myAxios from "../axios/CustomAxios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // INIT VALUE
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authenticated, setAuthenticated] = useState()
  const [roles, setRoles] = useState()
  const [me, setMe] = useState()
  // Function to set the authentication token

  // USE EFFECT INIT
  useEffect(() => {
    const interval = setInterval(() => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["refresh"];
      axios.get("http://localhost:8080/api/auth/refresh").then(function (response) {
        if (response.status == 200 && response.data) {
          let newTokenObject = { "access": response.data["access"], "refresh": JSON.parse(token)["refresh"] }
          setToken(JSON.stringify(newTokenObject));
          localStorage.setItem("token", JSON.stringify(newTokenObject))
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        console.log("Error: " + JSON.stringify(error.response));
        if (error.response["status"] == 500 || error.response["status"] == 403) {
          console.log(error.response.data["status"])
          localStorage.removeItem("token")
          delete myAxios.defaults.headers.common["Authorization"];
        }
      })
      
    }, 3000000);
    return () => clearInterval(interval);
  }, [authenticated]);

  useEffect(() => {
    // CONTINUE
    if (token) {
      myAxios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["access"];
      myAxios.get("api/auth/me").then(function (response) {
        if (response.data == "anonymousUser" && response.status == 200) {
          setAuthenticated(false)
          localStorage.removeItem("token")
        }
        else {
          localStorage.setItem("me", JSON.stringify(response.data))
          setMe(JSON.stringify(response.data))
          setAuthenticated(true)

          const myrole = response.data["roleModel"]
          setRoles(myrole["code"])
        }
      })
        .catch(function (error) {
          console.log(error)
          // handle error
          console.log("Error: " + JSON.stringify(error.response));
          if (error.response["status"] == 500 || error.response["status"] == 403) {
            console.log(500)
            localStorage.removeItem("token")
            delete myAxios.defaults.headers.common["Authorization"];
          }
        })
        .finally(function () {
          // always executed
        });
    }
    else {
      delete myAxios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token")
      setAuthenticated(false)
    }
  }, [token])

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, roles, setRoles, me, setMe }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;