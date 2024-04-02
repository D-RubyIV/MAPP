import { Fragment, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const LogoutComponet = () => {
  const nevigative = useNavigate();
  useEffect(() => {
    localStorage.clear()
    nevigative("/")
    location.reload();
  }, [])

  return (
    <Fragment></Fragment>
  );
}

export default LogoutComponet;