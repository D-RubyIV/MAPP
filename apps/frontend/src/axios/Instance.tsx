import axios from "axios";
import toast from "react-hot-toast";

var token = localStorage.getItem("token")
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVERURL
});

if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["access"];
}

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if (error.response.status === 403) {
        toast("User not have permission")
    }
    if (error.response.status === 400) {
        toast(error.response.data.message || error.response.request.responseText)
    }
    return Promise.reject(error);
});

export default instance;
