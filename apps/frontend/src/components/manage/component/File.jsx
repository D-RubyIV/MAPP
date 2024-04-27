import { useState } from "react";
import Table from "../base/Table";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from "../../../axios/CustomAxios"
import toast from "react-hot-toast";
import { useEffect } from "react";
const EXM = () => {
    const [signalReload, setSignalReload] = useState(false)
    const labelHeaders = [
        {
            "nameColumn": "Id",
            "nameAttribute": "id",
            "media": import.meta.env.VITE_md,
            "allowEdit": false,
            "type": "integer"
        },
        {
            "nameColumn": "Name",
            "nameAttribute": "name",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Type",
            "nameAttribute": "type",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Download",
            "nameAttribute": "download",
            "media": import.meta.env.VITE_md,
            "allowEdit": true,
            "type": "string"
        },

    ]
    const config = {
        "indexApi": "api/manage/files",
        "foreignModel": [
        ],
    }
    const ExpandNavbar = () => {
        const [selectedFile, setSelectedFile] = useState(null);
        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
        };
        useEffect(() => {
          console.log(selectedFile)
        }, [selectedFile])
        
        const handleUpload = () => {
            if (!selectedFile) {
                toast('Please select a file');
                return;
            }
            const formData = new FormData();
            formData.append('file', selectedFile);

            myAxios.post('/api/manage/files/upload', formData)
                .then(response => {
                    toast("File uploaded successfully")
                    setTimeout(() => {
                        setSignalReload(!signalReload);
                    }, 1000);
                })
                .catch(error => {
                    toast('Error uploading file:', error)
                    console.error();
                });
        };

        const [open, setOpen] = useState(false);
        return (
            <div>
                <div className={`fixed w-5/6 md:w-3/5 shadow-2xl top-1/2 bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md ${open ? "" : "hidden"}`}>
                    <div className="p-2">
                        <div className="px-2 text-right ">
                            <div className='flex justify-between'>
                                <div><span className='font-semibold'>Upload</span></div>
                                <button type="button" onClick={() => setOpen(false)}><CloseIcon /></button>
                            </div>
                        </div>
                        <div className="p-2">
                            <input onChange={handleFileChange} type="file" name="file" id="file" hidden></input>
                            <div className="text-center mt-3 w-full">
                                <label htmlFor="file" className="ring-2 outline-offset-4 bg-blue-100 outline-dashed flex py-8 justify-center rounded-xl">
                                    <div className="flex flex-col justify-center items-center">
                                        {
                                            selectedFile?(<p className="text-sm">{selectedFile?selectedFile.name:""}</p>):(<CloudUploadIcon sx={{ fontSize: 36 }} className={`text-gray-500 h-10 ${selectedFile?"hidden":"block"}`}></CloudUploadIcon>)
                                        }
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button type="button" onClick={() => handleUpload()} className="w-full py-1 bg-indigo-400 rounded-md text-sm hover:text-gray-200 text-center mt-2">Submit</button>
                    </div>
                </div>
                <button onClick={() => setOpen(true)} className="py-1 bg-indigo-400 px-2 rounded-md text-sm hover:text-gray-200">Upload</button>
            </div>
        );
    };

    return (
        <div>
            <Table tableName={"User"} labelHeaders={labelHeaders} config={config} buttonExpand={<ExpandNavbar />} signalReload={signalReload}/>
        </div>
    );


}

export default EXM;