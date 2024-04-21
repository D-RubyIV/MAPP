import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthProvider from "../provider/authProvider";
import { useAuth } from "../provider/authProvider";
import { LogOutOutline, ServerOutline, HappyOutline, InformationCircleOutline, HomeOutline } from 'react-ionicons'
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
const shouldForwardProp = (prop) => {
    // Chỉ chuyển tiếp các prop hợp lệ
    return isPropValid(prop);
};

const NavbarComponent = () => {
    let menuRef = useRef()


    const { roles, me } = useAuth()
    const balace = me ? JSON.parse(me)["balance"] : 0
    const widthIcon = 22
    const heightIcon = 22
    // init value
    const arrayItem = [
        {
            "name": "Home",
            "icon": <HomeOutline color={'#999999'} height={`${widthIcon}px`} width={`${heightIcon}px`} />,
            "link": "/",
        },
        {
            "name": "My Profile",
            "icon": <InformationCircleOutline color={'#999999'} height={`${widthIcon}px`} width={`${heightIcon}px`} />,
            "link": "/",
        },
        {
            "name": "Manage",
            "icon": <ServerOutline color={'#999999'} height={`${widthIcon}px`} width={`${heightIcon}px`} />,
            "link": "/manage",
        },
        {
            "name": "Add Fund",
            "icon": <HappyOutline color={'#999999'} height={`${widthIcon}px`} width={`${heightIcon}px`} />,
            "link": "/add-fund",
        },
        {
            "name": "Add Fund",
            "icon": <HappyOutline color={'#999999'} height={`${widthIcon}px`} width={`${heightIcon}px`} />,
            "link": "/",
        },
    ]
    // usestate
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpenMenu(false)
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    },[openMenu])

    // component
    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <Fragment>
                <div className="flex flex-row items-center justify-between mb-5">
                    <div className="flex">
                        <Link to={"/"}>
                            <img className="w-7 h-7 rounded-full object-cover" src="https://th.bing.com/th/id/OIP.KhXEdjeK786BCg21hNBqEAHaFm?w=219&h=180&c=7&r=0&o=5&cb=11&dpr=1.1&pid=1.7" alt="" />
                            <label htmlFor="" className="hidden">My Project</label>
                        </Link>
                    </div>
                    <div>
                        <button onClick={() => setOpenMenu(!openMenu)}><p className="text-xl"><ion-icon name="grid-outline"></ion-icon></p></button>
                    </div>
                </div>

                {/* POPUP */}
                <div className={`transition-all duration-300 z-50 py-8 px-8 fixed top-0 left-0 w-full md:w-3/12 xl:w-1/6 h-screen shadow-2xl bg-white rounded-md ${openMenu ? "block -translate-x-0" : "-translate-x-full"}`} ref={menuRef}>
                    {/* MOBILE */}
                    <div className="md:hidden">
                        <div className="flex flex-row items-center justify-between">
                            <div>
                            </div>
                            <div>
                                <button onClick={() => setOpenMenu(!openMenu)}><p className="text-2xl text-black"><ion-icon name="close-outline"></ion-icon></p></button>
                            </div>
                        </div>
                        {/* INFO */}
                        <div className="px-3">
                            <div className="flex justify-between pb-2 ">
                                <div className="flex items-center">
                                    <img className="w-8 h-8 rounded-full" src="https://th.bing.com/th?q=Avatar+Emoji&w=120&h=120&c=1&rs=1&qlt=90&cb=11&dpr=1.1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=strict&t=1&mw=247" alt="" />
                                    <p className="font-semibold uppercase text-gray-500 px-2">
                                        <span className="tracking-tighter">Pham Ha Anh</span>
                                        {roles == "ROLE_USER" && <span className="text-xs py-1 text-gray-800 ml-2 px-2 rounded-md tracking-tighter font-semibold bg-indigo-300">User</span>}
                                        {roles == "ROLE_ADMIN" && <span className="text-xs py-1 text-gray-800 ml-2 px-2 rounded-md tracking-tighter font-semibold bg-indigo-300">Admin</span>}
                                    </p>
                                </div>
                                <div className="text-black flex items-center gap-1">
                                    <span className="font-semibold text-sm">{balace}</span>
                                    <span className="font-semibold flex mt-0.5 text-sm"><ion-icon name="diamond-outline"></ion-icon></span>
                                </div>
                            </div>
                            <hr />
                            {/* Feature */}
                            <div className="text-gray-400 mt-2">
                                <ul className="grid grid-cols-2 hover:text-gray-500 gap-2">
                                    {
                                        arrayItem.map((item, index) => (
                                            <li className="bg-gray-200 ring-1 p-2 shadow-md rounded-md my-auto" key={index}>
                                                <div>
                                                    <Link to={item.link} className="flex items-center justify-start gap-2" onClick={() => setOpenMenu(!openMenu)}>
                                                        <span className="text-2xl flex">{item.icon}</span>
                                                        <span className="text-sm font-semibold text-gray-600 tracking-tighter">{item.name}</span>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/* Logout */}
                            <div className="bg-gray-300 ring-1 w-full py-1 rounded-md mt-2 tracking-tighter">
                                <Link to={"/logout"} className="font-semibold w-full">
                                    <div className="flex justify-center items-center text-gray-800">
                                        <span><LogOutOutline color={'#00000'} height="25px" width="25px" /></span>
                                        <span className="text-md tracking-tighter">Logout</span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                    {/* TABLET */}
                    <div className="hidden md:block h-full">
                        <div className="flex flex-row items-center justify-between mb-5 ">
                            <div className="flex">
                                <Link to={"/"}>
                                    <img className="w-7 h-7 rounded-full object-cover" src="https://th.bing.com/th/id/OIP.KhXEdjeK786BCg21hNBqEAHaFm?w=219&h=180&c=7&r=0&o=5&cb=11&dpr=1.1&pid=1.7" alt="" />
                                    <label htmlFor="" className="hidden">My Project</label>
                                </Link>
                            </div>
                            <div>
                                <button onClick={() => setOpenMenu(!openMenu)}><p className="text-2xl text-black"><ion-icon name="close-outline"></ion-icon></p></button>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between h-5/6">
                            {/* FEATURE */}
                            <div className="">
                                <ul className="grid grid-cols-1 hover:text-gray-500 gap-1">
                                    {
                                        arrayItem.map((item, index) => (
                                            <li className="py-2 rounded-md my-auto" key={index}>
                                                <div>
                                                    <Link to={item.link} className="flex items-center justify-start gap-2" onClick={() => setOpenMenu(!openMenu)}>
                                                        <span className="text-2xl flex">{item.icon}</span>
                                                        <span className="text-sm text-gray-600 tracking-tighter">{item.name}</span>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/* Logout */}
                            <div className="">
                                <Link to={"/logout"} className="">
                                    <div className="flex items-center justify-start gap-2">
                                        <span className="text-gray-600"><LogOutOutline color={'#00000'} height="25px" width="25px" /></span>
                                        <span className="text-sm text-gray-600 tracking-tighter">Logout</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment >
        </StyleSheetManager>

    );
}

export default NavbarComponent;