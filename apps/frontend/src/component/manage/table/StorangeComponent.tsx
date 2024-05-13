import { useEffect, useState } from "react";
import instance from "../../../axios/Instance";
import { useAuth } from "../../security/AuthProvider";
import { CloseOutlined, CloudUploadOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

const StorangeComponent = () => {
    const [selectedFile, setSelectedFile] = useState<any>();
    const { setIsLoading } = useAuth();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<any[]>([])
    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const fecthData = async () => {
        instance.get("/api/manage/storage").then(function (response) {
            console.log(response)
            if (response.status === 200 && response.data) {
                setData(response.data)
                setTimeout(() => { setIsLoading(false) }, 200)
            }
        })
    }

    useEffect(() => {
        setIsLoading(true)
        fecthData()
    }, [])

    const handleUpload = () => {
        setOpen(false)
        if (!selectedFile) {
            toast('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);

        instance.post('/api/manage/storage/upload', formData)
            .then(function (reponse) {
                if (reponse.status === 200 && reponse.data) {
                    fecthData()
                    toast("File uploaded successfully")
                }
            })
            .catch(error => {
                toast('Error uploading file:', error)
                console.error();
            });
    };

    return (
        <div>
            <div className="py-2 flex justify-between">
                <div><p className="text-gray-600 font-semibold ">Manage File</p></div>
                <div><button className="text-sm bg-indigo-400 px-2 py-1 rounded-md" onClick={() => setOpen(true)}>Add New</button></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.map((item, index) => (
                    <div className="p-2 border-2 border-gray-500 rounded-md text-sm" key={index}>
                        <div>
                            <div className="flex gap-2">
                                <span className="text-blue-400 font-semibold">No{index + 1}</span>
                                <p className="text-[12.5px] line-clamp-1">{item.key}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* FORM UPLOAD */}
            <div className={`p-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-3/5 rounded-md border-[2px] border-blue-200 bg-white ${open ? "" : "hidden"}`}>
                <form>
                    <div className="">
                        <div className="text-right">
                            <div className='flex justify-between'>
                                <div><span className='font-semibold'>Upload</span></div>
                                <button type="button" onClick={() => setOpen(false)}><CloseOutlined /></button>
                            </div>
                        </div>
                        <div className="p-1.5">
                            <input onChange={handleFileChange} type="file" name="file" id="file" hidden></input>
                            <div className="text-center mt-3 w-full">
                                <label htmlFor="file" className="ring-2 outline-offset-4 bg-blue-100 outline-dashed flex py-8 md:py-12 justify-center rounded-xl">
                                    <div className="flex flex-col justify-center items-center">
                                        {
                                            selectedFile ? (<p className="text-sm">{selectedFile ? selectedFile.name : ""}</p>) : (<CloudUploadOutlined sx={{ fontSize: 36 }} className={`text-gray-500 h-10 ${selectedFile ? "hidden" : "block"}`} />)
                                        }
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button type="button" onClick={() => handleUpload()} className="w-full py-1 bg-indigo-400 rounded-md text-sm hover:text-gray-200 text-center mt-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StorangeComponent;