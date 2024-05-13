import { useEffect, useState } from "react";
import instance from "../../axios/Instance";
import { useAuth } from "../security/AuthProvider";
import { useParams } from "react-router-dom";

const DetailProductComponent = () => {
    const { id } = useParams();

    const { setIsLoading } = useAuth();
    const [object, setObject] = useState<any>({})
    useEffect(() => {
        console.log("DETAIL: ", object)
        console.log("ID: ", id)
    }, [object])

    useEffect(() => {
        instance.get(`/api/manage/products/${id}`).then(function (reponse) {
            console.log(reponse)
            if (reponse.status === 200 && reponse.data) {
                setObject(reponse.data)
                setIsLoading(false);
            }
        })

    }, [])

    return (
        <div>

        </div>
    );
}

export default DetailProductComponent;