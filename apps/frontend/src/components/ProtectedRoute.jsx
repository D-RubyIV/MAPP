import { useAuth } from "../provider/authProvider.jsx"
import { Navigate, Outlet } from "react-router-dom"
import myAxios from "../axios/CustomAxios.jsx";
import { useEffect } from "react";
const ProtectedRouter = () => {
  const { authenticated } = useAuth();
  useEffect(() => {
  }, [authenticated])
  
  // 
  if (authenticated == false) {
    return <Navigate to="/auth" />;
  }
  // else if(authenticated == true){
  //   return <Navigate to="/" />;
  // }
}

export default ProtectedRouter;