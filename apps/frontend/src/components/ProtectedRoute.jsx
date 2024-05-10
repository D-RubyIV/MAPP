import { useAuth } from "../provider/authProvider.jsx"
import { Navigate, Outlet } from "react-router-dom"
import myAxios from "../axios/CustomAxios.jsx";
import { Fragment, useEffect } from "react";
import { Skeleton } from "@mui/material";
import NavbarComponent from "./NavbarComponent.jsx";
const ProtectedRouter = () => {
  const { authenticated } = useAuth();
  useEffect(() => {
    console.log("PROTECT DISABLE: ", authenticated)
  }, [authenticated])

  useEffect(() => {
    console.log("PROTECT APP RUNNING..")
  }, [])

  return (
    authenticated ? (
      <Fragment>
        <NavbarComponent />
        <Outlet />
      </Fragment>
    ) :
      <Navigate to='/auth' />
  )
}

export default ProtectedRouter;