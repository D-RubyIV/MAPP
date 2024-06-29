import { Fragment, useEffect, useRef, useState } from "react";
import instance from "../../axios/Instance";
import { useTranslation } from "react-i18next";
import OverviewProductCard from "../card/OverviewProductCard";

const ProductComponent = () => {
    const collectionRefs = useRef<(HTMLLIElement | null)[]>([]);
    const { t } = useTranslation()
    const [categories, setCategories] = useState<any[]>([])
    const [productOverviews, setProductOverviews] = useState<OverviewProduct[]>([])
    const [collections, setCollections] = useState<Collection[]>([])
    const [collectionsSelected, setCollectionsSelected] = useState<Collection>()

    const handleClick = (item: Collection, index: number) => {
        setCollectionsSelected(item);
        collectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    useEffect(() => {
        const fetchData = async () => {
            await instance.get("api/manage/categories?limit=5&offset=0").then(function (response) {
                if (response.status == 200) {
                    setCategories(response?.data?.content)
                }

            }).catch(function () {
            })
            await instance.get("api/manage/products/overview?limit=6&offset=0").then(function (response) {
                if (response.status == 200) {
                    setProductOverviews(response.data.content)
                }
            }).catch(function () {
            })
            await instance.get("api/manage/collections?limit=1000&offset=0").then(function (response) {
                if (response.status == 200) {
                    setCollections(response?.data?.content)
                    setCollectionsSelected(response?.data?.content[0])
                }

            }).catch(function () {
            })

        }
        fetchData();
    }, [])

    return (
        <div className="">
            {/* CATEGORY */}
            <div className="mt-3">
                <div>
                    <p className="text-xl font-bold tracking-tight">{t('our_product')}</p>
                </div>
                <ul className="flex flex-row gap-1.5 overflow-y-auto">
                    {
                        Array.isArray(categories) && categories.map((item, index) => (
                            <li key={index} className={`border-2 whitespace-nowrap py-1.5 px-3 text-[12px] rounded-2xl border-spacing-2 border-gray-300 shadow-sm text-gray-600`}>
                                {item.name}
                            </li>))
                    }
                </ul>
            </div>
            {/* Product */}
            <div>
                <Fragment>
                    <div>
                        <div>
                            <ul className="flex flex-row gap-3 overflow-hidden overflow-x-scroll">
                                {collections.map((item, index) => (
                                    <li
                                        onClick={() => handleClick(item, index)}
                                        key={index}
                                        ref={(el) => (collectionRefs.current[index] = el)}
                                        className={`underline-transition whitespace-nowrap transition-colors duration-300 ease-in-out uppercase py-1.5 text-[13.5px] font-semibold tracking-tighter ${item.id === collectionsSelected?.id
                                            ? 'underline-transition-active text-gray-600'
                                            : 'text-gray-500'
                                            }`}
                                    >
                                        <span>{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {
                            productOverviews.map((item, index) => (
                                <Fragment key={index}>
                                    <OverviewProductCard item={item}/>
                                </Fragment>
                            ))
                        }
                    </div>
                </Fragment>
            </div>
        </div>
    );
};

export default ProductComponent;