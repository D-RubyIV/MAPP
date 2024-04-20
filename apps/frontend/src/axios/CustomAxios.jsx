import axios from 'axios';
const token = localStorage.getItem("token")
const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVERURI,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});
if (token){
  instance.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["access"];
}
export default instance;