import { Fragment, useEffect, useState } from "react";
import myAxios from "../../axios/CustomAxios";
import { AddCircleOutline } from 'react-ionicons'
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import TableRowComponet from "./TableRowComponent";
import TableDialogComponent from "./TableDialogComponen";
import { Link } from "react-router-dom";
import TimeUtil from "../../util/TimeUtil"
import DateS from "./DateSelect"
const shouldForwardProp = (prop) => {
    return isPropValid(prop);
};
const TableComponent = ({ title, endpoint, labelHeaderItems }) => {
    const [data, setData] = useState()
    const [selectedItem, setselectedItem] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [titleDialog, setTitleDialog] = useState()
    const [actionDialog, setActionDialog] = useState()

    const handleAddNew = () => {
        setOpenDialog(true)
        setTitleDialog("Create")
        setActionDialog("CREATE")
    }
    const findData = async () => {
        await myAxios.get(endpoint).then(function (response) {
            console.log(response.data)
            setData(response.data)
        })
    }
    useEffect(() => {
        findData();
    }, [])
    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <Fragment>
                <button onClick={() => window.history.back()} className="text-blue-400">Back</button>
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-semibold">Manage {title}</h3>
                    </div>
                    <div>
                        <button className="py-1 bg-indigo-400 px-2 rounded-md text-sm hover:text-gray-200" onClick={() => handleAddNew()}>Add new</button>
                    </div>
                </div>
                <div className="relative">
                    <table className="table-fixed w-full">
                        <thead className="shadow tracking-tighter">
                            <tr className="">
                                <th className={`w-1/12 py-2 tracking-tighter text-xs md:text-sm text-gray-600`}>.No</th>
                                {labelHeaderItems.map((item, index) => {
                                    return item["collapse"] ? (
                                        <th className={`${item.width} py-2 tracking-tighter text-xs md:text-sm text-gray-600`} key={index}>{item["name"]}</th>
                                    ) : (
                                        null
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(data) && data.map((item, row) => (
                                    <TableRowComponet item={item} row={row} labelHeaderItems={labelHeaderItems} key={row} setOpenDialog={setOpenDialog} setselectedItem={setselectedItem} setTitleDialog={setTitleDialog} setActionDialog={setActionDialog} ></TableRowComponet>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="bg-white fixed w-5/6 md:w-3/5 2xl:w-2/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {openDialog ? <TableDialogComponent labelHeaderItems={labelHeaderItems} setOpenDialog={setOpenDialog} selectedItem={selectedItem} titleDialog={titleDialog} actionDialog={actionDialog} endpoint={endpoint} findData={findData} /> : <div></div>}
                    </div>
                </div>
            </Fragment>
        </StyleSheetManager>
    );
}

export default TableComponent;