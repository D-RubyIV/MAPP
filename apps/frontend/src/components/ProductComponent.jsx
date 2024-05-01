import React, { useState } from "react";

const ProductComponent = () => {
    const [listActiveCategoryObject, setListActiveCategoryObject] = useState([
        {
            "name": "Hoa hồng",
            "id": 2
        },
        {
            "name": "Hoa tuple",
            "id": 3
        },
    ]);

    const listCategoryObject = [
        {
            "name": "Category 1",
            "id": 1
        },
        {
            "name": "Category 2",
            "id": 2
        },
        {
            "name": "Category 3",
            "id": 3
        },
        {
            "name": "Category 4",
            "id": 4
        },
        {
            "name": "Category 5",
            "id": 5
        },
    ];

    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
    ]

    const handleCategory = (object) => {
        if (listActiveCategoryObject.some(s => s.id === object.id)) {
            setListActiveCategoryObject(prev => prev.filter(obj => obj.id !== object.id));
        } else {
            setListActiveCategoryObject(prev => [...prev, object]);
        }
    };

    return (
        <div className="mt-2">
            <div>
                <p className="text-xl text-gray-900 font-bold tracking-tight">Our Products</p>
            </div>
            {/* CATEGORY */}
            <div className="">
                <ul className="flex flex-row gap-2 overflow-y-auto p-2">
                    {listCategoryObject.map((item, index) => (
                        <li key={index} onClick={() => handleCategory(item)} className={`${listActiveCategoryObject.some(s => s.id === item.id) ? "bg-orange-200" : "bg-blue-100"} ring-1 ring-offset-1 whitespace-nowrap w-auto px-2 py-1 text-[13.5px] rounded-xl border-spacing-2 border-gray-300 border-2 shadow-sm`}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Product */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-3 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                    <p className="text-xl font-bold tracking-tight text-gray-900">Customers also purchased</p>

                    <div className="mt-2 p-1 grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product, index) => (
                            <div key={index} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
