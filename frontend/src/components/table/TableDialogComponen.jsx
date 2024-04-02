import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import { useEffect, useState } from 'react';
import myAxios from "../../axios/CustomAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
const TableDialogComponent = ({ labelHeaderItems, setOpenDialog, selectedItem, titleDialog, actionDialog, endpoint, findData }) => {
    const [selectItemCopy, setSelectItemCopy] = useState(actionDialog === "UPDATE" ? selectedItem : actionDialog === "DELETE" ? selectedItem : {});
    const [tempItem, setTempItem] = useState(selectItemCopy);
    const [objectForeign, setObjectForeign] = useState({});

    useEffect(() => {
        console.log(selectItemCopy)
    }, [selectItemCopy])

    useEffect(() => {
        const fetchData = async () => {
            for (const item of labelHeaderItems) {
                if (item["type"] === "object") {
                    try {
                        const response = await myAxios.get(item.api);
                        const updatedObject = { ...objectForeign };
                        updatedObject[item.attribute] = response.data;
                        setObjectForeign(updatedObject);
                        actionDialog === "UPDATE" || actionDialog === "DELETE" ? setTempItem({ ...tempItem, [item.foreign_attribute]: parseInt(selectedItem[item["attribute"]].id) }) : {}
                        
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                }
            }
        };
        fetchData();
    }, []);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const objectLabelItem = labelHeaderItems.filter(item => item.foreign_attribute ? item.foreign_attribute : item.attribute === name)[0];
        if (objectLabelItem["type"] === "object") {
            console.log(objectForeign)
            setSelectItemCopy({ ...selectItemCopy, [objectLabelItem["attribute"]]: objectForeign[objectLabelItem["attribute"]].find(s => s.id === parseInt(value)) });
            setTempItem({ ...tempItem, [name]: parseInt(value) });
        } 
        else if (objectLabelItem["type"] === "bool"){
            setSelectItemCopy({ ...selectItemCopy, [name]: value});
        }else {
            setSelectItemCopy({ ...selectItemCopy, [name]: value });
        }

    };



    const handleToastResponse = (response) => {
        if(response.status == 200){
            toast(`${actionDialog} SUCCESSFULL`)
        }
        else if(response.status == 400){
            toast(response.status)
        }
    }

    const handleSubmit = () => {
        if (actionDialog == "CREATE") {
            console.log("add action")
            myAxios.post(endpoint, selectItemCopy).then(function (response) {
                console.log(response.data)
                findData();
                handleToastResponse(response)

            })
        }
        else if (actionDialog == "UPDATE") {
            console.log("update action")
            myAxios.put(`${endpoint}/${selectItemCopy["id"]}`, selectItemCopy).then(function (response) {
                console.log(response.data)
                findData();
                handleToastResponse(response)
            })
        }
        else if (actionDialog == "DELETE") {
            console.log("delete action")
            console.log(selectItemCopy)
            myAxios.delete(`${endpoint}/${selectItemCopy["id"]}`).then(function (response) {
                console.log(response.data)
                findData();
                handleToastResponse(response)
            })
        }
        setOpenDialog(false)
    };

    return (
        <div className="shadow-2xl rounded-md">
            <div className='p-3'>
                <div className="py-1.5 text-right ">
                    <div className='flex justify-between'>
                        <div><span className='text-gray-500 font-semibold'>{titleDialog}</span></div>
                        <button className="" onClick={() => setOpenDialog(false)}><CloseSharpIcon /></button>
                    </div>
                </div>
                <form>
                    <div className="">
                        {labelHeaderItems.map((item, index) => (
                            !item.only_view && actionDialog != "DELETE" && (
                                <div key={index} className="">
                                    <label htmlFor={item.foreign_attribute ? item.foreign_attribute : item.attribute} className='text-sm'>{item.attribute}:</label>
                                    {item.type === 'object' ? (
                                        <select
                                            name={item.foreign_attribute ? item.foreign_attribute : item.attribute}
                                            value={tempItem[item.foreign_attribute ? item.foreign_attribute : item.attribute] || ""}
                                            onChange={handleOnChange}
                                            className="text-sm block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option>Chose</option>
                                            {Array.isArray(objectForeign[item.attribute]) && objectForeign[item.attribute].map((itemChild, index) => (
                                                <option value={itemChild.id} key={index}>{itemChild.name}</option>
                                            ))}
                                        </select>
                                    ) : item.type === 'bool' ? (
                                        <select
                                            name={item.attribute}
                                            value={selectItemCopy[item.attribute] || ""}
                                            onChange={handleOnChange}
                                            className='text-sm block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        >
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                    ) : item.type === 'int' ? (
                                        <input
                                            type="int"
                                            name={item.attribute}
                                            value={selectItemCopy[item.attribute] || ""}
                                            onChange={handleOnChange}
                                            autoComplete='off'
                                            className="text-sm block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name={item.attribute}
                                            value={selectItemCopy[item.attribute] || ""}
                                            onChange={handleOnChange}
                                            autoComplete='off'

                                            className="text-sm block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    )}
                                </div>
                            )
                        ))}
                        <div className='text-center mt-2'>
                            <input onClick={() => handleSubmit()} type="button" value="Submit" className='p-2 bg-indigo-500 w-full rounded-md text-white' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TableDialogComponent;
