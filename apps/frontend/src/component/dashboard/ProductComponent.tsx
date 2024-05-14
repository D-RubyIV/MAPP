import { useEffect, useState } from "react";
import instance from "../../axios/Instance";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";

const ProductComponent = () => {
    const { setIsLoading } = useAuth()
    const [fetchStatus, setFetchStatus] = useState(true)
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true)
    const [categories, setCategories] = useState<any[]>([])

    useEffect(() => {
        if (isLoadingCategories === false && isLoadingProducts === false) {
            setTimeout(() => {
                setIsLoading(false)
            }, 200)
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
                    <ul className="flex flex-row gap-1 overflow-y-auto">{categories.map((item, index) => (
                        <li key={index} onClick={() => handleCategory(item)} className={`${listActiveCategoryObject.some(s => s.id === item.id) ? "bg-orange-200 font-semibold" : "bg-blue-100"} border-2 whitespace-nowrap w-auto px-2.5 py-1 text-[12px] rounded-2xl border-spacing-2 border-gray-300 shadow-sm text-gray-600`}>
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
                    <div className="p-2 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 xl:gap-x-8">
                        {products.map((product, index) => (
                            <div key={index} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md ring-2 ring-indigo-500 shadow-md lg:aspect-none group-hover:opacity-75 lg:h-80">

                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />

                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <Link to={`/product/${product.id}`}>
                                            <h3 className="text-sm text-gray-700">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (<Skeleton count={5} />)
                }

            </div>
        </div>
    );
};

export default ProductComponent;