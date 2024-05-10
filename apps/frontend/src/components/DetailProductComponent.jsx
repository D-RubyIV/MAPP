import { useState } from "react";
import { useParams } from "react-router-dom";

const DetailProductComponent = () => {
    const { userId } = useParams()
    const [productObject, setProductObject] = useState();
    return (
        <div>

        </div>
    );
}

export default DetailProductComponent;