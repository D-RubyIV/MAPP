import axios from 'axios';
import { useState } from 'react';
const token = localStorage.getItem("token")
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});
if (token){
  instance.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["access"];
}
export default instance;