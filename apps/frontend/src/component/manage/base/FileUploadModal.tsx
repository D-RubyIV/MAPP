import { useState } from "react";
import { CloseOutlined, CloudUploadOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

const FileUploadModal: React.FC<{ open: boolean, onClose: () => void, onUpload: (files: File[]) => void }> = ({ open, onClose, onUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(Array.from(event.target.files || []));
    };

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleFileRemove = (index: number) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        onUpload(selectedFiles);
        setSelectedFiles([]);
    };

    return (
        <div className={`p-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-3/5 rounded-md border-[2px] border-blue-200 bg-white ${open ? "" : "hidden"}`}>
            <div className="text-right">
                <div className='flex justify-between'>
                    <div><span className='font-semibold'>Upload</span></div>
                    <button type="button" onClick={onClose}><CloseOutlined /></button>
                </div>
            </div>
            <div className="p-1.5">
                <input
                    type="file"
                    id="files"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
                <div
                    className="text-center mt-3 w-full"
                    onDrop={handleFileDrop}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                    <label htmlFor="files" className="ring-2 outline-offset-4 bg-blue-100 outline-dashed flex py-8 md:py-12 justify-center rounded-xl">
                        <div className="flex flex-col justify-center items-center">
                            {selectedFiles.length > 0 ? (
                                <div>
                                    <p className="text-sm">{selectedFiles.length} file(s) selected</p>
                                    <ul className="list-disc list-inside">
                                        {selectedFiles.map((file, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span>{file.name}</span>
                                                <button type="button" onClick={() => handleFileRemove(index)} className="text-red-500 ml-2">Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <CloudUploadOutlined sx={{ fontSize: 36 }} className="text-gray-500 h-10" />
                            )}
                        </div>
                    </label>
                </div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="w-full py-1 bg-indigo-400 rounded-md text-sm hover:text-gray-200 text-center mt-2"
                    disabled={selectedFiles.length === 0}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default FileUploadModal;
