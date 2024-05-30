import { useEffect, useState } from "react";
import instance from "../../axios/Instance";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useAuth } from "../security/AuthProvider";
import { motion } from "framer-motion";
import ProductCardComponent from "../card/ProductCardComponent";


const ProductComponent = () => {
    const { setIsLoading } = useAuth()
    const [fetchStatus, setFetchStatus] = useState(true)
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true)
    const [categories, setCategories] = useState<any[]>([])

    useEffect(() => {
        if (isLoadingCategories === false && isLoadingProducts === false) {
            setIsLoading(false)
        }
    }, [isLoadingCategories, isLoadingProducts])

    useEffect(() => {
        if (fetchStatus === false) {
            toast.error("Fetch data error")
        }
    }, [fetchStatus])

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            instance.get("api/manage/categories").then(function (response) {
                if (response.status == 200) {
                    setCategories(response.data)
                    setIsLoadingCategories(false)
                }

            }).catch(function () {
                setFetchStatus(false)
            })
            instance.get("api/manage/products").then(function (response) {
                if (response.status == 200) {
                }
                setProducts(response.data)
                setIsLoadingProducts(false)
            }).catch(function () {
                setFetchStatus(false)
            })

        }
        fetchData();
    }, [])

    const [products, setProducts] = useState<any[]>([])

    const [listActiveCategoryObject, setListActiveCategoryObject] = useState<{ "name": string, "id": number }[]>([]);

    const handleCategory = (object: any) => {
        if (listActiveCategoryObject.some(s => s.id === object.id)) {
            setListActiveCategoryObject(prev => prev.filter(obj => obj.id !== object.id));
        } else {
            setListActiveCategoryObject(prev => [...prev, object]);
        }
    };

    return (
        <div className="">
            {/* CATEGORY */}
            <div className="mt-3">
                <div>
                    <p className="text-xl font-bold tracking-tight">Our Products</p>
                </div>
                {isLoadingCategories === false ? (
                    <ul className="flex flex-row gap-1.5 overflow-y-auto">{categories.map((item, index) => (
                        <li key={index} onClick={() => handleCategory(item)} className={`${listActiveCategoryObject.some(s => s.id === item.id) ? "bg-orange-200 font-semibold" : "bg-blue-100"} border-2 whitespace-nowrap w-auto py-1.5 px-3 text-[12px] rounded-2xl border-spacing-2 border-gray-300 shadow-sm text-gray-600`}>
                            {item.name}
                        </li>))}
                    </ul>)
                    : (<Skeleton count={3}></Skeleton>)
                }
            </div>
            {/* Product */}
            <div className="">
                <p className="text-xl font-bold tracking-tigh">Customers also purchased</p>
                {isLoadingProducts === false ? (
                    <motion.section
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.25
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.7 }}
                        className="py-1 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 xl:gap-x-8"
                    >
                        {products.map((product, index) => (
                            <ProductCardComponent product={product} key={index}/>
                        ))}
                    </motion.section>
                ) : (<Skeleton count={5} />)
                }

            </div>
        </div>
    );
};

export default ProductComponent;