import { Fragment, useState } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from 'react-ionicons';
const TableRowComponent = ({ item, row, labelHeaderItems, setselectedItem, setOpenDialog, setTitleDialog, setActionDialog }) => {
    const [openChild, setOpenChild] = useState(false);


    const handleSelectItem = (action) => {
        setselectedItem(item)
        setOpenDialog(true)
        setTitleDialog(action)
        setActionDialog(action)
    }

    return (
        <Fragment>
            <tr className="shadow" key={row}>
                <td className="py-3 text-center tracking-tighter text-xs md:text text-gray-700">
                    <div className='flex justify-center items-center'>
                        <button className="flex" onClick={() => setOpenChild(!openChild)}>
                            {(openChild == false) ? (
                                <AddCircleOutline color={'#999999'} height="16px" width="16px" />
                            ) : (
                                <RemoveCircleOutline color={'#999999'} height="16px" width="16px" />
                            )}
                        </button>
                        {row + 1}
                    </div>
                </td>
                {labelHeaderItems.map((j, index) => {
                    return j["collapse"] ? (
                        <td key={index} className="py-2 text-center tracking-tighter text-xs md:text text-gray-700">
                            {j["collapse"] == true ? (
                                typeof item[j["attribute"]] === 'boolean' ? (
                                    item[j["attribute"]] ? 'True' : 'False'
                                ) : typeof item[j["attribute"]] === 'object' ? (
                                    item[j["foreign_view"]] !== null
                                    ?item[j["attribute"]][j["foreign_view"]]
                                    :<pre className=''>{JSON.stringify(item[j["attribute"]], null, 2)}</pre>
                                ) : (
                                    item[j["attribute"]]
                                )
                            ) : (null)}
                        </td>
                    ) : (null)
                })}
            </tr>

            <tr className={`${openChild ? 'table-row' : 'hidden'} `} >
                <td className='border px-2 md:px-8 md:py-2' colSpan={5} >
                    <ul>
                        {labelHeaderItems.map((j, index) =>
                        (
                            <li className='grid grid-cols-4' key={index}>
                                <div className='col-span-1'>
                                    <span className="py-2 text-left tracking-tighter text-xs md:text text-gray-700">{j["attribute"]}:</span>
                                </div>
                                <div className='col-span-3'>
                                    <span key={index} className="text-left py-2 tracking-tighter text-xs md:text text-gray-700">
                                        {
                                            typeof item[j["attribute"]] === 'boolean' ? (
                                                item[j["attribute"]] ? 'True' : 'False'
                                            ) : typeof item[j["attribute"]] === 'object' ? (
                                                <pre>{JSON.stringify(item[j["attribute"]], null, 2)}</pre>
                                            ) : (
                                                item[j["attribute"]]
                                            )
                                        }
                                    </span>
                                </div>
                            </li>
                        )
                        )}
                    </ul>
                    <div className='flex gap-3'>
                        <button onClick={() => handleSelectItem("UPDATE")} className='text-xs py-0.5 text-blue-500 underline'>Edit</button>
                        <button onClick={() => handleSelectItem("DELETE")} className='text-xs py-0.5 text-red-500 underline'>Delete</button>
                    </div>
                </td>
            </tr>


        </Fragment>
    );
}

export default TableRowComponent;

