import { Fragment, useEffect, useState } from "react";
import CustomAxios from "../axios/CustomAxios"
import { Navigate, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
export default function LoginComponent() {
  const navigate = useNavigate()
  // INIT
  const [authSignInObject, setAuthSignInObject] = useState();
  const [authSignUpObject, setAuthSignUpObject] = useState();
  const [mode, setMode] = useState(localStorage.getItem("mode") ? parseInt(localStorage.getItem("mode")) : 1)
  useEffect(() => {
    mode && localStorage.setItem("mode", mode)
  }, [])
  useEffect(() => {
    localStorage.setItem("mode", mode)
  }, [mode])
  // USE EFFRCT
  useEffect(() => {
    console.log("LOGIN OBJECT: " + JSON.stringify(authSignInObject))
  }, [authSignInObject])
  // HANDLE
  const handleChangeInputSigninObject = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setAuthSignInObject((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }
  const handleChangeInputSignupObject = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setAuthSignUpObject((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }
  const handleLogin = () => {
    console.log(authSignInObject)
    CustomAxios.post("api/auth/login", authSignInObject).then(function (response) {
      console.log(response)
      if (response.status == 200 && response.data.access && response.data.refresh) {
        localStorage.setItem("token", JSON.stringify(response.data))
        toast("LOGIN SUCCESS")
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 500) {
        toast(error.message);
      }
      else if (error.response && error.response.status === 400) {
        toast(error.response.data.message);
      }
    });
  }
  const handleSignup = () => {
    console.log(authSignInObject)
    CustomAxios.post("api/auth/signup", authSignUpObject)
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        toast("Check your mail to active account");
        setTimeout(() => {
          setMode(1);
        }, 1000);
      } 
    })
    .catch(function (error) {
      if (error.response && error.response.status === 500) {
        toast(error.message);
      }
      else if (error.response && error.response.status === 400) {
        toast(error.response.data.message);
      }
    });
  
    
  }
  // COM
  return (

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {mode === 1 ? "Sign in to your account" : " Sign up to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* FORM SIGNIN */}
          <form className={`space-y-2 ${mode === 1 ? "" : "hidden"}`} >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                Email address
              </label>
              <div className="">
                <input
                  name="email"
                  type="text"
                  onChange={handleChangeInputSigninObject}
                  autoComplete="off"
                  required
                  className="p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="">
                <input
                  name="password"
                  type="password"
                  onChange={handleChangeInputSigninObject}
                  autoComplete="off"
                  required
                  className="p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          {/* FORM SIGNUP */}
          
          <form className={`space-y-2 ${mode === 2 ? "" : "hidden"}`} >

          <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                  Fullname
                </label>
              </div>
              <div className="">
                <input
                  name="fullName"
                  type="text"
                  onChange={handleChangeInputSignupObject}
                  autoComplete="off"
                  required
                  className="p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                Email
              </label>
              <div className="">
                <input
                  name="email"
                  type="text"
                  onChange={handleChangeInputSignupObject}
                  autoComplete="off"
                  required
                  className="p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                  Phone
                </label>
              </div>
              <div className="">
                <input
                  name="phone"
                  type="text"
                  onChange={handleChangeInputSignupObject}
                  autoComplete="off"
                  required
                  className="p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
           

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                  Password
                </label>
              </div>
              <div className="">
                <input
                  name="password"
                  type="password"
                  onChange={handleChangeInputSignupObject}
                  autoComplete="off"
                  required
                  className="p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <button
                onClick={handleSignup}
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className={`mt-10 text-center text-sm text-gray-500 ${mode === 1 ? "" : "hidden"}`}>
            Not a member?{' '}
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setMode(2)}>
              Start a 14 day free trial
            </button>
          </p>
          <p className={`mt-10 text-center text-sm text-gray-500 ${mode === 2 ? "" : "hidden"}`}>
            A member?{' '}
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setMode(1)}>
              I alrealy have account
            </button>
          </p>
        </div>
      </div>
    </>

  )
}
