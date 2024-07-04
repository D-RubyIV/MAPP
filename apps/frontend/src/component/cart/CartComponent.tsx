import { Add, AddCircle, AddCircleOutline, CloseOutlined, ConfirmationNumberOutlined, Delete, DeleteForeverOutlined, DeleteOutline, DeleteOutlineRounded, InfoOutlined, Remove, RemoveCircle, RemoveCircleOutline } from "@mui/icons-material";
import { useEffect, useState, Fragment } from "react";
import instance from "../../axios/Instance";
import { useAppContext } from "../../store/AppContext";


type GroupCartDetail = {
    id: number;
    carts: CartDetail[]
}

const CartComponent = () => {
    const [listCartDetail, setListCartDetail] = useState<CartDetail[]>([]);
    const { isOpenCart, setIsOpenCart } = useAppContext();
    const [listGroupCardDetail, setListGroupCardDetail] = useState<GroupCartDetail[]>([]);
    const [subTotal, setSubTotal] = useState<number>();
    const [total, setTotal] = useState<number>();

    const baseImage = "https://product.hstatic.net/200000690725/product/6_bf4d4603812b45ad8ee6ff479ec08c39_small.png"

    useEffect(() => {
        console.log(listGroupCardDetail)
    }, [listGroupCardDetail])


    useEffect(() => {
        let calculatedTotal = 0;
        listCartDetail.forEach((item) => {
            calculatedTotal += item.quantity * ((item.productDetail as ProductDetail).product as Product).price;
        });
        setSubTotal(calculatedTotal);

        let listIdProduct: number[] = [];
        listCartDetail.forEach(s => {
            let id = ((s.productDetail as ProductDetail)?.product as Product)?.id
            if (!listIdProduct.includes(id)) {
                listIdProduct.push(id)
            }
        })
        console.log(listIdProduct)
        // 
        setListGroupCardDetail([])
        listIdProduct.forEach(currentIdProduct => {
            let object: GroupCartDetail = { id: currentIdProduct, carts: [] }
            listCartDetail.forEach(s => {
                let idProduct = ((s.productDetail as ProductDetail)?.product as Product)?.id
                if (idProduct === currentIdProduct) {
                    object.carts.push(s);
                }
            })
            console.log(object)
            // setListGroupCardDetail(listGroupCardDetail => [...listGroupCardDetail, ...object])
            setListGroupCardDetail(prev => [...prev, object]);
        })
    }, [listCartDetail])

    const fetchCartItems = async () => {
        instance.get("api/common/me/cart/items").then((response) => {
            if (response?.status === 200) {
                setListCartDetail(response.data);
            }
        });
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <Fragment>
            <div className={`z-40 fixed h-[100vh] xl:px-20  top-0 from-indigo-900 bg-gradient-to-l rounded-md w-full transition-all duration-500 block ${isOpenCart ? "right-0" : "-right-full"}`}>
                <div className="grid grid-cols-5 h-full">
                    <div className="col-end-2 col-start-6 bg-gradient-to-t from-gray-200 to-gray-100 px-6 md:px-10 py-4 flex flex-col justify-between">
                        <div>
                            {/* TOP */}
                            <div className="flex justify-between py-3 md:py-4 row-span-4">
                                <div><span className="text-xl font-semibold text-gray-600">Giỏ hàng</span></div>
                                <div><button onClick={() => setIsOpenCart(false)}><CloseOutlined /></button></div>
                            </div>
                            {/* CENTER */}
                            <div>
                                {
                                    listGroupCardDetail.map((item, index) => (
                                        <Fragment key={index}>
                                            {
                                                item.carts.map((item, index) => (
                                                    <Fragment key={index}>
                                                        <div className="text-[13.5px] grid grid-cols-12 gap-2 border-b border-dashed border-gray-400 py-3 ">
                                                            <div className="inline-flex justify-center items-center col-span-3">
                                                                <img src={baseImage} className="w-[25vw] aspect-square object-cover"></img>
                                                            </div>
                                                            <div className="col-span-9">
                                                                <div className="flex items-center">
                                                                    <span className="font-medium">
                                                                        {(item.productDetail as ProductDetail)?.name || ((item.productDetail as ProductDetail)?.product as Product)?.name}
                                                                    </span>
                                                                    <span className="font-medium text-red-600 ">
                                                                        <button className="active:bg-red-400 p-1 rounded-full"><DeleteOutlineRounded/></button>
                                                                    </span>
                                                                </div>
                                                                <div className="text-sm font-thin">
                                                                    <span>{((item.productDetail as ProductDetail)?.color as Color)?.name}</span>
                                                                    {" / "}
                                                                    <span>{((item.productDetail as ProductDetail)?.size as Size)?.name}</span>
                                                                </div>
                                                                <div className="flex gap-2 text-gray-400 duration-100 items-center">
                                                                    <button className="active:text-gray-900 active:text-[15px] ease-in-out"><AddCircleOutline /></button>
                                                                    <div className="text-gray-900">
                                                                        <span>{(item.productDetail as ProductDetail)?.quantity}</span>
                                                                    </div>
                                                                    <button className="active:text-gray-900 active:text-[15px] ease-in-out"><RemoveCircleOutline /></button>
                                                                </div>

                                                                {/* text-left border-b px-2 py-3 border-dashed border-gray-400 active:bg-gray-300 active:text-xl active:text-white ease-in-out */}
                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                ))

                                            }
                                        </Fragment>
                                    ))
                                }
                            </div>
                            {/* BOTTOM */}
                        </div>
                        <div className="text-center text-sm">
                            <button className="bg-black w-full py-2 font-thin rounded-md text-white">Thanh toán</button>
                        </div>
                    </div>



                </div>
            </div>
        </Fragment>
    );
}


export default CartComponent;
