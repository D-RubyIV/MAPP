import { Fragment, useEffect, useState } from "react";
import { Config } from "../model/Config";
import { Label } from "../model/Label";
import instance from "../../../axios/Instance";

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloseOutlined } from "@mui/icons-material";
import { RenderValueColumn } from "../../common/RenderValueColumn";
import { RenderInputRow } from "../../common/RenderInputRow";
import { Type } from "../model/Type";
import toast from "react-hot-toast";
import { Action } from "../model/Action";
import PaginateComponent from "../paginate/PaginateComponent";
import { useAuth } from "../../security/AuthProvider";

const TableComponent = ({ labels, config }: { labels: Label[], config: Config }) => {
    const { setIsLoading } = useAuth();
    const limit = 10
    const [offset, setOffset] = useState(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<any[]>([]);
    const [dataVisionable, setDataVisionable] = useState<any[]>([]);
    const [object, setObject] = useState<any>({});
    const [foreignLabels, setForeignLabels] = useState<Label[]>([])
    const [foreignObject, setForeignObject] = useState<{ [key: string]: any[] }>({})
    const [action, setAction] = useState<Action>();
    const [isLoadingPrimaryData, setIsLoadingPrimaryData] = useState(true)
    const [isLoadingForeignData, setIsForeignData] = useState(true)

    useEffect(() => {
        setIsLoading(true)
    }, [])

    useEffect(() => {
        if (isLoadingForeignData === true && isLoadingPrimaryData === true) {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }, [isLoadingPrimaryData, isLoadingPrimaryData])


    useEffect(() => {
        setDataVisionable(data.slice((offset - 1) * limit, offset * limit))
        setTotalPages(Math.ceil(data.length / limit))
    }, [data, offset])

    useEffect(() => {
        console.log(object)
    }, [object])


    const handleSubmit = async () => {
        if (action === Action.CREATE) {
            await instance.post(config.api, object).then(function (response) {
                setOpen(false);
                console.log(response);
                if (response.status == 200) {
                    toast("CREATE SUCCESS")
                    setTimeout(() => {
                        getPrimaryData();
                    }, 100);
                }
            })
        }
        else if (action === Action.UPDATE) {
            await instance.put(`${config.api}/${object.id}`, object).then(function (response) {
                setOpen(false);
                console.log(response);
                if (response.status == 200) {
                    toast("UPDATE SUCCESS")
                    setTimeout(() => {
                        getPrimaryData();
                    }, 100);
                }
            })
        }
        else if (action === Action.DELETE) {
            await instance.delete(`${config.api}/${object.id}`).then(function (response) {
                setOpen(false);
                console.log(response);
                if (response.status == 200) {
                    toast("DELETE SUCCESS")
                    setTimeout(() => {
                        getPrimaryData();
                    }, 100);
                }
            })
        }

    }


    const handleOpenDialog = (action: Action, idSeleted?: number) => {
        if (idSeleted) {
            setObject(data.filter(model => model.id === idSeleted)[0])
        }
        else {
            setObject({})
        }
        setAction(action)
        setOpen(true)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const selectedLabel = labels.filter(s => (s.attribute === name))[0]
        if (selectedLabel.type === Type.NUMBER) {
            setObject({ ...object, [name]: parseInt(value) });
        }
        else if (selectedLabel.type === Type.OBJECT) {
            const modelSelect = foreignObject[selectedLabel.attribute].filter(s => s.id === parseInt(value))[0]
            setObject({
                ...object,
                [name]: parseInt(value),
                [name.replace("Id", "Model")]: modelSelect
            });
        }
        else {
            setObject({ ...object, [name]: value });
        }
    };


    const getPrimaryData = async () => {
        try {
            const response = await instance.get(config.api);
            setData(response.data);
            setObject(response.data[0])
        } catch (error: any) {
            if (error.response.status !== 403){
                toast.error("Fetch data error")
            }
        }
        setIsLoadingPrimaryData(false)
    };

    useEffect(() => {
        const getForeignData = async () => {
            const temporaryData: any = {};
            for (const label of foreignLabels) {
                if (label.api) {
                    try {
                        const response = await instance.get(label.api);
                        temporaryData[label.attribute] = response.data;
                    } catch (error: any) {
                        if (error.response.status !== 403){
                            toast.error("Fetch data error")
                        }
                    }
                }
            }
            const updatedObject = { ...foreignObject, ...temporaryData };
            setForeignObject(updatedObject);
            setIsForeignData(false)
        };
        getForeignData();
    }, [foreignLabels]);


    useEffect(() => {
        console.log("SELECTED OBJECT", object)
    }, [object])

    useEffect(() => {
        // GET FOREIGN LABEL
        const foreignLabels = labels
            .filter(s => s.type === Type.OBJECT)
            .map(s => s)
        setForeignLabels(foreignLabels)
        // GET OBJECT PRIMARY DATA
        getPrimaryData();
    }, []);

    return (
        <div>
            {/* CREATE BTN */}
            <div className="py-1 text-right flex justify-between">
                <div></div>
                <div><button className="py-1 px-2 text-sm bg-indigo-500 w-full rounded-md text-white" onClick={() => handleOpenDialog(Action.CREATE)}>Add New</button></div>
            </div>
            {/* TABLE TABLET*/}
            <div className="overflow-auto hidden md:block bg-gray-50">
                <table className={`${labels.length > 8 ? "table-auto" : "table-fixed "} w-full`} >
                    {/* THEAD */}
                    < thead>
                        <tr className="shadow-md text-gray-600 text-[15px] font-normal tracking-tight">
                            <th>No</th>
                            {labels.map((label, index) => (
                                <th key={index} className="">{label.name}</th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* THEAD */}
                    {/* TBODY */}
                    <tbody>
                        {dataVisionable.map((item, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}>
                                <td>#{index + 1}</td>
                                {labels.map((label, index) => (
                                    <td key={index}>
                                        <p className="text-[12.5px] line-clamp-1">
                                            {item[label.attribute] ? RenderValueColumn(item[label.attribute]) : item[label.attribute] === false ? "False" : "N/A"}
                                        </p>
                                    </td>
                                ))}
                                <td className="h-full hidden md:block px-2">
                                    <div className="flex justify-center items-center gap-4">
                                        <button className="text-gray-500" onClick={() => handleOpenDialog(Action.DETAIL, item.id)}><VisibilityIcon sx={{ fontSize: 18 }} /></button>
                                        <button className="text-gray-500" onClick={() => handleOpenDialog(Action.UPDATE, item.id)}><EditIcon sx={{ fontSize: 18 }} /></button>
                                        <button className="text-gray-500" onClick={() => handleOpenDialog(Action.DELETE, item.id)}><DeleteIcon sx={{ fontSize: 18 }} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* TBODY */}
                </table>
            </div >
            {/* TABLE TABLET*/}
            {/* TABLE MOBILE*/}
            <div className="overflow-auto md:hidden flex flex-col gap-2">
                {
                    dataVisionable.map((item, index) => (
                        <Fragment key={index}>
                            <div className="ring-2 ring-inset ring-gray-300 shadow-md p-1.5 rounded-md text-[13.5px] flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <label className="text-blue-400 font-semibold">#{index + 1}</label>
                                    <div>
                                        <span className="text-gray-500">ID: </span>
                                        <span>{item.id}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-1">
                                        <p className="line-clamp-1">{item.name || item.email || item.username || item.secret}</p>
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <button className="text-gray-500" onClick={() => handleOpenDialog(Action.DETAIL, item.id)}><VisibilityIcon sx={{ fontSize: 18 }} /></button>
                                        <button className="text-gray-500" onClick={() => handleOpenDialog(Action.UPDATE, item.id)}><EditIcon sx={{ fontSize: 18 }} /></button>
                                        <button className="text-gray-500" onClick={() => handleOpenDialog(Action.DELETE, item.id)}><DeleteIcon sx={{ fontSize: 18 }} /></button>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))
                }

            </div >
            {/* TABLE MOBILE*/}
            {/* PAGINATE */}
            <div className="flex justify-end md:justify-between mt-3">
                <div className="text-center sm:text-left hidden md:block">
                    <p className="text-sm text-gray-600">
                        Showing <span className="text-gray-900 text-xs font-semibold">{(offset - 1) * limit + 1}</span> to <span className="text-gray-900 text-xs font-semibold">{data.length > offset * limit ? offset * limit : data.length}</span> of {" "}
                        <span className="text-gray-900 text-xs font-semibold">{data.length}</span> results
                    </p>
                </div>
                <PaginateComponent totalPages={totalPages} currentPage={offset} onPageChange={setOffset} />
            </div>
            {/* PAGINATE */}
            {/* 
            -
            -
            -
            -
            -
            */}
            {/* DIALOG */}
            < div className={`${open ? "block" : "hidden"} overflow-auto fixed top-1/2 left-1/2 w-5/6 md:w-4/6 shadow-2xl bg-white ring-gray-500 rounded-md -translate-x-1/2 -translate-y-1/2`} >
                {/* HEADER */}
                <div className="fixed w-full flex justify-between px-4 py-1.5 bg-gray-600 rounded-t-md">
                    <div>
                        <span className="text-[17.5px] font-semibold text-white">{action}</span>
                    </div>
                    <div>
                        <button onClick={() => setOpen(false)} className="text-white"><CloseOutlined /></button>
                    </div>
                </div>
                {/* HEADER */}
                {/* BODY */}
                <div className="p-3 mt-10">
                    <div>
                        <div className={`text-center ${action === Action.DELETE ? "block" : "hidden"}`}>
                            <p className="p-3">Delete object id: {object.id}</p>
                        </div>
                        <div className={`grid gap-1 ${labels.length > 5 ? "md:grid-cols-2" : ""}`}>
                            {action !== Action.DELETE && labels.map((label, index) => (
                                <Fragment key={index}>
                                    {RenderInputRow(label, handleOnChange, object, foreignObject, action)}
                                </Fragment>
                            ))}
                        </div>
                        <div className={`mt-4 ${action === Action.DETAIL ? "hidden" : "block"}`}>
                            {
                                <button className='p-2 bg-indigo-500 w-full rounded-md text-white' onClick={() => handleSubmit()}>Submit</button>
                            }
                        </div>
                    </div>
                </div>
                {/* BODY */}
            </div>
            {/* DIALOG */}

        </div >
    );
};

export default TableComponent;
