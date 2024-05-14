import { useEffect, useState } from "react";
import instance from "../../../axios/Instance";
import { useAuth } from "../../security/AuthProvider";
import { CloseOutlined, CloudUploadOutlined } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";
import PaginateComponent from "../paginate/PaginateComponent";

const StorageComponent = () => {
    const limit = 10;
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    const [offset, setOffset] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const { setIsLoading } = useAuth();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [dataVisible, setDataVisible] = useState<any[]>([]);

    const handleFileChange = (event: any) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleFileDrop = (event: any) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleFileRemove = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setDataVisible(data.slice((offset - 1) * limit, offset * limit));
        setTotalPages(Math.ceil(data.length / limit));
    }, [data, offset]);

    const fetchData = async () => {
        instance.get("/api/manage/storage").then(function (response) {
            if (response.status === 200 && response.data) {
                setData(response.data);
                setTotalPages(Math.ceil(response.data.length / limit));
                setTimeout(() => setIsLoading(false), 200);
            }
        });
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, []);

    const handleUpload = () => {
        setOpen(false);
        if (!selectedFiles || selectedFiles.length === 0) {
            toast.error('Please select file(s) to upload');
            return;
        }
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        instance.post('/api/manage/storage/v2/upload', formData)
            .then(function (response) {
                if (response.status === 200 && response.data) {
                    fetchData();
                    toast.success("Files uploaded successfully");
                }
            })
            .catch(error => {
                toast.error('Error uploading files: ' + error);
                console.error(error);
            });
    };

    return (
        <div>
            <div className="py-2 flex justify-between">
                <div><p className="text-gray-600 font-semibold ">Manage File</p></div>
                <div><button className="text-sm bg-indigo-400 px-2 py-1 rounded-md" onClick={() => setOpen(true)}>Add New</button></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {dataVisible.map((item, index) => (
                    <div className="p-1.5 border-2 border-gray-500 rounded-md text-sm flex gap-5 items-center justify-between" key={index}>
                        <div>
                            <span className="text-blue-400 font-semibold">No{index + 1}</span>
                        </div>
                        <div>
                            <div>
                                <p className="text-[12.5px] line-clamp-1">{item.key}</p>
                            </div>
                            <div className="flex justify-end items-end gap-3">
                                <button className="text-gray-500"><VisibilityIcon sx={{ fontSize: 20 }} /></button>
                                <button className="text-gray-500"><EditIcon sx={{ fontSize: 20 }} /></button>
                                <button className="text-gray-500"><DeleteIcon sx={{ fontSize: 20 }} /></button>
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
                            <input onChange={handleFileChange} type="file" name="files" id="files" multiple hidden></input>
                            <div
                                className="text-center mt-3 w-full"
                                onDrop={handleFileDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <label htmlFor="files" className="ring-2 outline-offset-2 bg-blue-100 outline-dashed flex py-8 md:py-12 justify-center rounded-xl">
                                    <div className="flex flex-col justify-center items-center">
                                        {selectedFiles && selectedFiles.length > 0 ? (
                                            <div className="max-h-80 overflow-auto relative ">
                                                <p className="text-sm">{selectedFiles.length} file(s) selected</p>
                                                <table className="text-sm text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Name</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedFiles.map((file: any, index: number) => (
                                                            <tr key={index} className="">
                                                                <td><span className="text-sm text-blue-400">#{index+1}</span></td>
                                                                <td><span className="text-sm text-gray-600">{file.name}</span></td>
                                                                <td><button type="button" onClick={() => handleFileRemove(index)} className="text-red-500 ml-4 text-sm underline p-2">Remove</button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {/* <ul className="list-disc list-inside max-h-80 overflow-auto">
                                                    {selectedFiles.map((file: any, index: number) => (
                                                        <li key={index} className="flex justify-between items-center">
                                                            <span className="text-sm text-gray-500">{file.name}</span>
                                                            <button type="button" onClick={() => handleFileRemove(index)} className="text-red-500 ml-4 text-sm underline">Remove</button>
                                                        </li>
                                                    ))}
                                                </ul> */}
                                            </div>
                                        ) : (
                                            <CloudUploadOutlined sx={{ fontSize: 36 }} className={`text-gray-500 h-10 ${selectedFiles && selectedFiles.length > 0 ? "hidden" : "block"}`} />
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button type="button" onClick={handleUpload} className="w-full py-1 bg-indigo-400 rounded-md text-sm hover:text-gray-200 text-center mt-2">Submit</button>
                    </div>
                </form>
            </div>
            <div className="flex justify-end mt-3">
                <PaginateComponent totalPages={totalPages} currentPage={offset} onPageChange={setOffset}></PaginateComponent>
            </div>
        </div>
    );
}

export default StorageComponent;
