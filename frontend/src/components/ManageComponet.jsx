import { Fragment } from "react";
import { Link } from "react-router-dom";

const ManageComponent = () => {
    const listItem = [
        {
            "name": "User",
            "link": "users",
        },
        {
            "name": "Category",
            "link": "categories",
        },
        {
            "name": "Role",
            "link": "roles",
        },
        {
            "name": "License",
            "link": "licenses",
        },
    ]
    return (
        <Fragment>
            <div className="flex flex-col gap-2">
                {
                    listItem.map((item, index) => (
                        <div key={index} className="p-3 shadow-xl border-2 border-gray-300 rounded-md">
                            <Link to={item.link} className="hover: text-red-500">
                                <span className="text-sm text-gray-700">{item.name}</span>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    );
}

export default ManageComponent;