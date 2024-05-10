import axios from 'axios';
const token = localStorage.getItem("token")
const CustomAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVERURI,
  timeout: 15000,
  headers: { 'X-Custom-Header': 'foobar' }
});
if (token){
  CustomAxios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["access"];
}
export default CustomAxios;