import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthProvider";
import instance from "../../axios/Instance";
import { useParams } from "react-router-dom";
import { motion, useAnimation } from "framer-motion"

const DetailComponent = () => {
    const { id } = useParams();
    const { setIsLoading } = useAuth();
    const [object, setObject] = useState<any>({})
    const mainControls = useAnimation()
    useEffect(() => {
        console.log("DETAIL: ", object)
        console.log("ID: ", id)
    }, [object])

    useEffect(() => {
        instance.get(`/api/manage/products/${id}`).then(function (reponse) {
            console.log(reponse)
            if (reponse.status === 200 && reponse.data) {
                setObject(reponse.data)
                setIsLoading(false);
            }
        })

    }, [])

    const [typeProducts, setTypeProducts] = useState([
        "31", "32", "33", "34", "35", "36"
    ])

    const [images, setImages] = useState({
        img1: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b587cf81-b49a-4200-9a7c-8daa033ed393/air-jordan-1-low-shoes-459b4T.png",
        img2: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/944a01b4-080c-47c0-b9f2-e32f139275d7/air-jordan-1-low-shoes-459b4T.png",
        img3: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e4ff57b8-30a3-4021-aeec-e26160d047d2/air-jordan-1-low-shoes-459b4T.png",
        img4: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/64235401-31a6-4cc5-af9a-d57d3a0fde8a/air-jordan-1-low-shoes-459b4T.png",
    })
    const [activeImage, setActiveImage] = useState(images.img1)
    return (
        <div>
            {/*  */}
            <div className="md:flex md:justify-between md:gap-5 md:p-12 mt-3">

                <div className="flex flex-col w-full gap-4 md:flex-row">
                    <div className="">
                        <img src={activeImage} className="object-cover w-full max-w-xl h-full rounded-md"></img>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 overflow-y-auto items-center">
                        <img src={images.img1} className={`w-20 h-20 aspect-square rounded-md ${images.img1 == activeImage ? "border-2 border-indigo-300" : ""}`} onClick={() => setActiveImage(images.img1)}></img>
                        <img src={images.img2} className={`w-20 h-20 aspect-square rounded-md ${images.img2 == activeImage ? "border-2 border-indigo-300" : ""}`} onClick={() => setActiveImage(images.img2)}></img>
                        <img src={images.img3} className={`w-20 h-20 aspect-square rounded-md ${images.img3 == activeImage ? "border-2 border-indigo-300" : ""}`} onClick={() => setActiveImage(images.img3)}></img>
                        <img src={images.img4} className={`w-20 h-20 aspect-square rounded-md ${images.img4 == activeImage ? "border-2 border-indigo-300" : ""}`} onClick={() => setActiveImage(images.img4)}></img>
                    </div>
                    <div className="md:hidden">
                        <TittleComponent object={object}></TittleComponent>
                    </div>
                </div>

                <div className="w-full mt-3 md:mt-0">
                    <div className="hidden md:block">
                        <TittleComponent object={object}></TittleComponent>
                    </div>
                    <div className="grid grid-cols-3 text-center gap-2">
                        {
                            typeProducts.map((item, index) => (
                                <div key={index} className="bg-gray-100 text-[14px] border border-gray-400 rounded-md text-gray-600 font-medium">
                                    <p>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <motion.div
                            transition={{
                                active: {
                                    backgroundColor: "#f00"
                                },
                                inactive: {
                                    backgroundColor: "#fff",
                                    transition: { duration: 2 }
                                }
                            }} animate="active"
                        >
                            <button className="py-3 bg-white border-2 border-black w-full rounded-2xl text-gray-500 font-semibold">
                                Add to Bag
                            </button>
                        </motion.div>
                        <button className="py-3 bg-black border-2 border-white w-full rounded-2xl text-white font-semibold">
                            Add to fa
                        </button>
                    </div>
                </div>


            </div>
            {/*  */}
            <div className="text-[13.5px] flex flex-col gap-2">
                <div>
                    <p className="pt-4">
                        Each Craft we release puts a handmade feel on the AJ1, and this Mid is no exception. Sandy neutrals come together in kicks that beg to be a part of every outfit. Premium suede adds texture, while a speckled outsole grounds it all with subtle detail.
                    </p>
                </div>
                <div>
                    <p className="pt-4">
                        <ul>
                            <li>Colour Shown: Pale Ivory/Legend Light Brown/Sail</li>
                            <li>Style: FQ3224-100</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <button className="underline underline-offset-2 font-medium text-[15.5px]">
                        <span>View Product Details</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

const TittleComponent = ({ object }: { object: any }) => {
    return (
        <div className="">
            <p className="text-[20px] font-medium">{object.name}</p>
            <p className="text-[16px] text-orange-600">{object.price}</p>
            {/* <p className="text-[16px]">{object.hasOwnProperty("categoryModel") ? object["categoryModel"].name : ""}</p> */}
        </div>
    )
}
export default DetailComponent;