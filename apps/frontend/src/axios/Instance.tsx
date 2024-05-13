import axios from "axios";
// Set config defaults when creating the instance
var token = localStorage.getItem("token")
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVERURL
});

if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["access"];
}
export default instance;
