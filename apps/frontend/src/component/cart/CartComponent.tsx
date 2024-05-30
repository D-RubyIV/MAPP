import { InfoOutlined } from "@mui/icons-material";
import { Fragment } from "react/jsx-runtime";

const CartComponent = () => {
    return (
        <Fragment>
            <div>
                {/*  */}
                <div className="flex justify-center items-center">
                    <div className="text-center text-gray-500">
                        <span className="text-lg font-medium">Bag</span>
                        <div className="">
                            <span>0 Items</span>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="py-5 text-lg font-semibold text-gray-500">
                    <span>There are no items in your bag.</span>
                </div>
                {/*  */}
                <div className="font-medium text-gray-600 text-[16px] py-4">
                    <div>
                        <span className="text-xl font-medium text-gray-600">Summary</span>
                    </div>
                    {/*  */}
                    <div className="flex gap-2 items-center justify-between">
                        <div className="inline-flex gap-1">
                            <div>Subtotal</div >
                            <div className="text-start">
                                <InfoOutlined sx={{ fontSize: 16 }}></InfoOutlined>
                            </div>
                        </div>
                        <div>
                            <span>—</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex gap-2 items-center justify-between">
                        <div>
                            <span>Estimated Delivery & Handling</span >
                        </div>
                        <div>
                            <span>Free</span>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex gap-2 items-center justify-between">
                        <div>
                            <span>Total</span >
                        </div>
                        <div>
                            <span>—</span>
                        </div>
                    </div>
                    {/*  */}
                </div>

                {/*  */}
                <div className="py-4">
                    <div className="text-xl font-medium text-gray-600">
                        <span>Favourites</span>
                    </div>
                    <div>
                        There are no items saved to your favourites.
                    </div>
                </div>

                {/*  */}
                <div className="py-4">
                    <div className="text-xl font-medium text-gray-600">
                        <span>You Might Also Like</span>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CartComponent;