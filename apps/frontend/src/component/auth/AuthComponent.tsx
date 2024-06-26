import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import instance from "../../axios/Instance";
import OauthComponent from "./OauthComponent";
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { EarthComponent } from "../../util/Earth"
export default function AuthComponent() {
    const navigate = useNavigate()
    // INIT
    const [authSignInObject, setAuthSignInObject] = useState<any>();
    const [authSignUpObject, setAuthSignUpObject] = useState<any>();
    const [mode, setMode] = useState<any>(localStorage.getItem("mode") ? parseInt(localStorage.getItem("mode") || "1") : 1)
    // 
    useEffect(() => {
        localStorage.setItem("mode", mode)
    }, [mode])
    // USE EFFECT
    useEffect(() => {
        console.log("LOGIN OBJECT: " + JSON.stringify(authSignInObject))
    }, [authSignInObject])
    useEffect(() => {
        const fetchData = async () => {
            instance.get("api/auth/me").then(function (response) {
                console.log(response.data)
                if (response.data == "anonymousUser" && response.status == 200) {
                    localStorage.removeItem("token")
                    navigate("/auth")
                }
                else {
                    localStorage.setItem("me", JSON.stringify(response.data))
                    navigate("/")
                }
            })
        }
        fetchData()
    }, [])

    // HANDLE
    const handleChangeInputSigninObject = (event: any) => {
        let value = event.target.value;
        let name = event.target.name;
        setAuthSignInObject({ ...authSignInObject, [name]: value });
    }
    const handleChangeInputSignupObject = (event: any) => {
        let value = event.target.value;
        let name = event.target.name;
        setAuthSignUpObject({ ...authSignUpObject, [name]: value });
    }
    const handleLogin = () => {
        console.log(authSignInObject)
        instance.post("api/auth/login", authSignInObject).then(function (response) {
            console.log(response)
            if (response.status == 200 && response.data.accessToken && response.data.refreshToken) {
                localStorage.setItem("token", JSON.stringify(response.data))
                localStorage.setItem("isLogin", "1")
                toast("LOGIN SUCCESS")
                navigate("/");
            }
        })
    }
    const handleSignup = () => {
        console.log(authSignInObject)
        instance.post("api/auth/signup", authSignUpObject)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    toast("Check email to active your account");
                    setMode(1);
                }
            })
    }
    // COM
    return (

        <div className="px-8 py-4 md:px-10 xl:px-20">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 ">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">
                        {mode === 1 ? "Sign in to your account" : " Sign up to your account"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* FORM SIGNIN */}
                    <form className={`space-y-1.5 ${mode === 1 ? "" : "hidden"}`} >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500 text-left">
                                Email address
                            </label>
                            <div className="">
                                <input
                                    name="email"
                                    type="text"
                                    onChange={handleChangeInputSigninObject}
                                    autoComplete="off"
                                    required
                                    className="p-2 block w-full rounded-md py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500 text-left">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-500">
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
                                    className="p-2 block w-full rounded-md py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

                    <form className={`space-y-1.5 ${mode === 2 ? "" : "hidden"}`} >

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500 text-left">
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
                                    className="p-2 block w-full rounded-md py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500 text-left">
                                Email
                            </label>
                            <div className="">
                                <input
                                    name="email"
                                    type="text"
                                    onChange={handleChangeInputSignupObject}
                                    autoComplete="off"
                                    required
                                    className="p-2 block w-full rounded-md py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500 text-left">
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
                                    className="p-2 block w-full rounded-md py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500 text-left">
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
                                    className="p-2 block w-full rounded-md py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

                    <p className={`mt-5 text-center text-sm text-gray-500 ${mode === 1 ? "" : "hidden"}`}>
                        Not a member?{' '}
                        <button className="font-semibold leading-6 text-indigo-500 hover:text-indigo-500" onClick={() => setMode(2)}>
                            Start a 14 day free trial
                        </button>
                    </p>
                    <p className={`mt-10 text-center text-sm text-gray-500 ${mode === 2 ? "" : "hidden"}`}>
                        A member?{' '}
                        <button className="font-semibold leading-6 text-indigo-500 hover:text-indigo-500" onClick={() => setMode(1)}>
                            I alrealy have account
                        </button>
                    </p>

                </div>
                {/* OAUTH */}
                <OauthComponent />
                {/* 3D */}
                <div className="h-full w-full absolute -z-10 top-0 left-0">
                    <Canvas shadows className="mt-16">
                        <ambientLight intensity={3.5}></ambientLight>
                        <OrbitControls autoRotate={true} enableZoom={true}></OrbitControls>
                        <Suspense fallback={null}>
                            <EarthComponent scale={[0.225, 0.225, 0.225]}></EarthComponent>
                        </Suspense>
                        <Environment preset="sunset"></Environment>
                        {/* <ContactShadows position={[0, -5, 0]} opacity={1} scale={10} blur={1} far={10} resolution={256}></ContactShadows> */}
                    </Canvas>
                </div>

            </div>
        </div>

    )
}