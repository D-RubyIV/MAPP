import { Add, CloseOutlined, ConfirmationNumberOutlined, Delete, DeleteOutline, InfoOutlined, Remove } from "@mui/icons-material";
import { useEffect, useState, Fragment } from "react";
import instance from "../../axios/Instance";
import toast from "react-hot-toast";
import { useAppContext } from "../../store/AppContext";
import SelectVoucherComponent from "./SelectVoucherComponent";
import { useNavigate } from "react-router-dom";

type GroupCartDetail = {
    id: number;
    carts: CartDetail[]
}

const CartComponent = () => {

    const [listCartDetail, setListCartDetail] = useState<CartDetail[]>([]);
    const [listGroupCardDetail, setListGroupCardDetail] = useState<GroupCartDetail[]>([]);
    const [subTotal, setSubTotal] = useState<number>();
    const [total, setTotal] = useState<number>();
    const [openVoucherDialog, setOpenVoucherDialog] = useState<boolean>(false);


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
            <div>
                <div className={`fixed top-0 left-0 w-full pt-16 px-8 md:px-10 xl:px-20 bg-white h-full ${openVoucherDialog ? "block":"hidden"}`}>
                    <div className=" px-2 py-1 shadow-md border-2 rounded-md ">
                        <div className="text-center py-1 text-[18px] font-medium text-gray-600 flex justify-between">
                            <div></div>
                            <span>Chọn Voucher</span>
                            <button onClick={() => setOpenVoucherDialog(false)}><CloseOutlined/></button>
                        </div>
                        <SelectVoucherComponent />
                    </div>
                </div>
                {/* Conditional Rendering */}
                <div className="flex justify-center items-center">
                    <div className="text-center text-gray-500">
                        <span className="text-[18px] font-medium text-gray-500">Giỏ hàng ({listCartDetail.length}) </span>
                    </div>
                </div>
                {
                    listCartDetail.length === 0 ? (
                        <EmptyBag />
                    ) : (
                        <NotEmptyBag listObject={listGroupCardDetail} fetchCartItems={fetchCartItems} />
                    )
                }
                {/* You Might Also Like */}
                <div className="py-4 mb-60">
                    <div className="text-xl font-medium text-gray-600">
                        <span>You Might Also Like</span>
                    </div>
                </div>
                {/*  */}
                <div className="fixed bottom-0 left-0 w-full px-8 md:px-10 xl:px-20 rounded-t-xl">
                    <div className="border-2 p-2 shadow-xl rounded-t-xl  bg-white">
                        <div className="font-medium text-gray-600 text-[16px] py-4 ">
                            <div className="flex text-[13.5px] items-center justify-between">
                                <div className="inline-flex gap-2 justify-center items-center font-normal">
                                    <div><ConfirmationNumberOutlined sx={{ fontSize: 20 }} /></div>
                                    <div><span className="font-medium">Khuyễn mãi của tôi</span></div>
                                </div>
                                <div>
                                    <button onClick={() => setOpenVoucherDialog(true)}>
                                        <span className="text-gray-400 font-normal">Chọn hoặc nhập mã ›</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <span className="text-xl font-medium text-gray-600">Summary</span>
                            </div>
                            {/* Subtotal */}
                            <div className="flex gap-2 items-center justify-between">
                                <div className="inline-flex gap-1">
                                    <div>Subtotal</div>
                                    <div className="text-start">
                                        <InfoOutlined sx={{ fontSize: 16 }} />
                                    </div>
                                </div>
                                <div>
                                    <span>{subTotal || "—"}</span>
                                </div>
                            </div>
                        </div>
                        {/* Estimated Delivery & Handling */}
                        <div className="flex gap-2 items-center justify-between">
                            <div>
                                <span>Estimated Delivery & Handling</span>
                            </div>
                            <div>
                                <p>Free</p>
                            </div>
                        </div>
                        {/* Total */}
                        <div className="flex gap-2 items-center justify-between py-2">
                            <div>
                                <span>Total</span>
                            </div>
                            <div>
                                <span>{total || "—"}</span>
                            </div>
                        </div>
                        <div>
                            <button className="w-full p-2 bg-gray-600 text-white rounded-md mb-2">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const EmptyBag = () => {
    return (
        <Fragment>
            <div className="text-center">
                <span>0 Items</span>
            </div>
            <div className="py-5 text-lg font-semibold text-gray-500">
                <span>There are no items in your bag.</span>
            </div>
        </Fragment>
    );
}

const NotEmptyBag = ({ listObject, fetchCartItems }: { listObject: GroupCartDetail[], fetchCartItems: () => void }) => {
    return (
        <div>
            <div className="flex flex-col gap-2">
                {
                    listObject.map((item, index) => (
                        <div className="p-2 rounded-md border-2 shadow-md border-gray-300" key={index}>
                            <div>
                                <p className="text-[16px] font-semibold text-gray-600 mb-1">{(((item.carts as CartDetail[])[0].productDetail as ProductDetail)?.product as Product)?.name}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {
                                    (item.carts as CartDetail[]).map((item, index) => (
                                        <SmallCardOrderDetail object={item} key={index} fetchCartItems={fetchCartItems} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

const SmallCardOrderDetail = ({ object, fetchCartItems }: { object: CartDetail, fetchCartItems: () => void }) => {
    const { effLoadingBag, setEffLoadingBag } = useAppContext();
    const [mediaLink, setMediaLink] = useState("");
    useEffect(() => {
        if (((object.productDetail as ProductDetail)?.media as Media)?.name) {
            instance.get(`/api/cloud/generate-url?file=${((object.productDetail as ProductDetail)?.media as Media)?.name}`).then(function (response) {
                if (response.status === 200) {
                    setMediaLink(response.data);
                }
            });
        }
    }, [object]);

    const [quantity, setQuantity] = useState(object.quantity);
    const handleAddQuantity = () => {
        if ((object.productDetail as ProductDetail)?.quantity > quantity) {
            setQuantity(quantity + 1);
            console.log("bsss");
        }
        else {
            console.log("asss");
        }
    }

    const handleRemoveQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleDeleteCartDetail = async () => {
        await instance.delete(`/api/manage/cart-details/${object.id}`).then(function (response) {
            if (response.status === 200) {
                toast("Deleted successfully");
                fetchCartItems();
            }
            setEffLoadingBag(!effLoadingBag)
        });

    }

    return (
        <Fragment>
            <div className="flex items-center justify-between text-[15px] shadow-md p-2 border-2 border-gray-300 rounded-md">
                <div>
                    <input type="checkbox"></input>
                </div>
                <div>
                    <img src={mediaLink} className="w-20 h-20 aspect-square rounded-xl"></img>
                </div>
                <div>
                    <div className="flex">
                        <p className="font-semibold text-gray-600 text-[16px]">{(object.productDetail as ProductDetail).name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <p>{(object.productDetail as ProductDetail).price}</p>
                        </div>
                        <div>
                            <div className="flex">
                                <button disabled={object.quantity > (object.productDetail as ProductDetail)?.quantity} className="border-2 px-2 py-1 flex items-center" onClick={handleAddQuantity}><Add sx={{ fontSize: 12 }}></Add></button>
                                <span className="border-2 px-2 py-1 flex items-center">{quantity}</span>
                                <button disabled={(object.productDetail as ProductDetail)?.quantity <= 1} className="border-2 px-2 py-1 flex items-center" onClick={handleRemoveQuantity}><Remove sx={{ fontSize: 12 }}></Remove></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="p-2 shadow-md rounded-md" onClick={handleDeleteCartDetail}>
                        <DeleteOutline sx={{ fontSize: 20 }}></DeleteOutline>
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default CartComponent;
