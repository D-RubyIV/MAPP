import { Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { SellOutlined } from "@mui/icons-material";

type Product = {
    id: number,
    name: string,
    color: string,
    price: number
}

const ProductCardComponent = ({ product }: { product: Product }) => {
    return (
        <Fragment>
            <motion.div
                className="group relative p-2 shadow-xl rounded-md"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            >
                <div className="w-full overflow-hiddenlg:aspect-none group-hover:opacity-75 lg:h-80">

                    <img
                        src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/52f8b95c-02ff-4311-a123-56eeeb302a05/blazer-mid-77-shoes-xfpQWg.png"
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-md"
                    />

                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <Link to={`/product/${product.id}`}>
                            <h3 className="text-sm text-gray-700">

                                <span aria-hidden="true" className="absolute top-0.5 left-0.5 h-4 "><SellOutlined /><span className="text-gray-800">5%</span></span>
                                {product.name}
                            </h3>
                        </Link>
                        <p className="mt-1 text-sm text-gray-400">{product.color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">{product.price}</p>
                </div>
            </motion.div>
        </Fragment>
    );
}

export default ProductCardComponent;