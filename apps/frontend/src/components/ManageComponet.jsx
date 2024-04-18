import { Fragment } from "react";
import { Link } from "react-router-dom";
import { UsersIcon, RectangleStackIcon, FingerPrintIcon, KeyIcon, ArchiveBoxIcon, TicketIcon, TruckIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
const ManageComponent = () => {
    const listItem = [
        {
            "name": "User",
            "link": "users",
            "icon": <UsersIcon />
        },
        {
            "name": "Category",
            "link": "categories",
            "icon": <RectangleStackIcon />
        },
        {
            "name": "Role",
            "link": "roles",
            "icon": <FingerPrintIcon />
        },
        {
            "name": "License",
            "link": "licenses",
            "icon": <KeyIcon />
        },
        {
            "name": "Product",
            "link": "products",
            "icon": <ArchiveBoxIcon />
        },
        {
            "name": "Order",
            "link": "orders",
            "icon": <TruckIcon />
        },
        {
            "name": "Order Details",
            "link": "order-details",
            "icon": <TruckIcon />
        },
        {
            "name": "Voucher",
            "link": "vouchers",
            "icon": <TicketIcon />
        },
        {
            "name": "Files",
            "link": "files",
            "icon": <DocumentTextIcon />
        },
    ]
    return (
        <Fragment>
            <div>
                <div>
                    <p className="text-xl font-semibold">Manage</p>
                </div>
                <div className="grid md:grid-cols-2 gap-2 mt-2">
                    {
                        listItem.map((item, index) => (
                            <div key={index} className="p-3 shadow-xl border-2 border-gray-300 rounded-md ">
                                <Link to={item.link} className="hover:text-red-500">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-5 text-gray-600">{item.icon}</div>
                                        <span className="text-[15px] tracking-tighter text-gray-600 font-semibold">{item.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default ManageComponent;