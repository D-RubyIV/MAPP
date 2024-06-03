import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import MenuIcon from '@mui/icons-material/Menu';
import { CloseOutlined, Person, PersonOutline, SearchOutlined, ShoppingBag, ShoppingBagOutlined } from "@mui/icons-material";
import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
const NavbarComponent = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const listItem = [
        {
            "name": "Home",
            "link": "/",
        },
        {
            "name": "Profile",
            "link": "/profile",
        },
        {
            "name": "Manage",
            "link": "/manage",
        },
        {
            "name": "Fund",
            "link": "/",
        },
        {
            "name": "History",
            "link": "/",
        },
        {
            "name": "Setting",
            "link": "/setting",
        },
        {
            "name": "Logout",
            "link": "/logout",
        },
    ]
    return (
        <Fragment>
            <div className="flex justify-between py-3 md:py-4">
                <div className="inline-flex">
                    <Link to={"/"}>
                        <img className="w-7 h-7 rounded-full object-cover" src="https://th.bing.com/th/id/OIP.KhXEdjeK786BCg21hNBqEAHaFm?w=219&h=180&c=7&r=0&o=5&cb=11&dpr=1.1&pid=1.7" alt="" />
                        <label htmlFor="" className="hidden">My Project</label>
                    </Link>
                </div>
                <div className="hidden md:block">
                    <ul className="flex gap-5">
                        {
                            listItem.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.link}>{item.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="md:hidden">
                    <div className="flex gap-1.5 items-center justify-center">
                        <button onClick={() => { }}><SearchOutlined /></button>
                        <button onClick={() => { }}><PersonOutline /></button>
                        <Link to={"/cart"}><ShoppingBagOutlined /></Link>
                        <button onClick={() => setOpenMenu(true)}><MenuIcon /></button>
                    </div>
                    <div className={`fixed px-8 py-4 md:px-10 xl:px-20 z-50 top-0 left-0 bg-white rounded-md w-full h-screen ${openMenu ? "block" : "hidden"}`}>
                        <div className="flex justify-between py-3 md:py-4">
                            <div className="inline-flex">
                                <Link to={"/"}>
                                    <img className="w-7 h-7 rounded-full object-cover" src="https://th.bing.com/th/id/OIP.KhXEdjeK786BCg21hNBqEAHaFm?w=219&h=180&c=7&r=0&o=5&cb=11&dpr=1.1&pid=1.7" alt="" />
                                    <label htmlFor="" className="hidden">My Project</label>
                                </Link>
                            </div>
                            <button onClick={() => setOpenMenu(false)}>
                                <CloseOutlined />
                            </button>
                        </div>
                        <ul className="flex gap-5 flex-col mt-2">
                            {
                                listItem.map((item, index) => (
                                    <li key={index} className="text-center p-2">
                                        <Link to={item.link} onClick={() => setOpenMenu(false)}>{item.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default NavbarComponent;