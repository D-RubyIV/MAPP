import { Fragment } from "react/jsx-runtime";

const NavbarComponent = () => {
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
            "name": "Add Fund",
            "link": "/add-fund",
        },
        {
            "name": "Add Fund",
            "link": "/",
        },
    ]
    return (
        <Fragment>
            <ul>
                {
                    listItem.map((item, index) => (
                        <li key={index}>
                            <p className="">{item.name}</p>
                        </li>
                    ))
                }
            </ul>
        </Fragment>
    );
}

export default NavbarComponent;