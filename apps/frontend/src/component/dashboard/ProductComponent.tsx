import { useEffect, useState } from "react";
import instance from "../../axios/Instance";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { useAuth } from "../security/AuthProvider";
import { useTranslation } from "react-i18next";
import SlideProductComponent from "./SlideProductComponent";
import { Star } from "@mui/icons-material";




const ProductComponent = () => {
    const { t } = useTranslation()
    const { setIsLoading } = useAuth()
    const [fetchStatus, setFetchStatus] = useState(true)
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true)
    const [categories, setCategories] = useState<any[]>([])
    const [products, setProducts] = useState<CustomModelSpace.CustomProduct[]>([])
    const [listActiveCategoryObject, setListActiveCategoryObject] = useState<{ "name": string, "id": number }[]>([]);

    useEffect(() => {
        console.log("PRODUCT: ", products)
    }, [products])

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
            await instance.get("api/manage/categories?limit=5&offset=0").then(function (response) {
                if (response.status == 200) {
                    setCategories(response?.data?.content)
                    setIsLoadingCategories(false)
                }

            }).catch(function () {
                setFetchStatus(false)
            })
            await instance.get("api/manage/products/custom").then(function (response) {
                if (response.status == 200) {
                    setProducts(response?.data)
                }
                setIsLoadingProducts(false)
            }).catch(function () {
                setFetchStatus(false)
            })

        }
        fetchData();
    }, [])



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
                    <p className="text-xl font-bold tracking-tight">{t('our_product')}</p>
                </div>
                {isLoadingCategories === false ? (
                    <ul className="flex flex-row gap-1.5 overflow-y-auto">{
                        Array.isArray(categories) && categories.map((item, index) => (
                            <li key={index} onClick={() => handleCategory(item)} className={`${listActiveCategoryObject.some(s => s.id === item.id) ? "bg-orange-200 font-semibold" : "bg-blue-100"} border-2 whitespace-nowrap w-auto py-1.5 px-3 text-[12px] rounded-2xl border-spacing-2 border-gray-300 shadow-sm text-gray-600`}>
                                {item.name}
                            </li>))}
                    </ul>)
                    : (<Skeleton count={3}></Skeleton>)
                }
            </div>
            {/* Product */}
            <div>
                <li className="font-semibold">Hương sạch</li>
                <SlideProductComponent products={Array.isArray(products) && products.filter(s => s.category.id === 2) || []} backgroundImage="cach-quan-huong.jpg" ></SlideProductComponent>
            </div>

            {/* Product */}
            <div>
                <li className="font-semibold">Trầm nụ</li>
                <SlideProductComponent products={Array.isArray(products) && products.filter(s => s.category.id === 3) || []} backgroundImage="tram-nu.jpg"></SlideProductComponent>
            </div>


        </div>
    );
};

export default ProductComponent;