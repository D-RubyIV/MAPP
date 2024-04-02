import { HappyOutline, PricetagsOutline } from 'react-ionicons'
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';

const shouldForwardProp = (prop) => {
    // Chỉ chuyển tiếp các prop hợp lệ
    return isPropValid(prop);
};

const Example = () => {
    let arrayItem = [
        {
            "icon": <HappyOutline color={'#ffffff'} height="40px" width="40px" />,
            "description": "Earn rewards on every night you stay"
        },
        {
            "icon": <PricetagsOutline color={'#ffffff'} height="40px" width="40px"/>,
            "description": "Save more with cheap prices"
        },
        {
            "icon": <HappyOutline color={'#ffffff'} height="40px" width="40px"/>,
            "description": "Earn rewards on every night you stay"
        },
    ]
    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <div className="">
                {/* <h1 className="text-3xl font-semibold">Welcome Back</h1> */}
                <div className="md:grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-3 bg-[#e61e43] p-6 rounded-lg  ">
                    <div className="">
                        <h2 className="text-md py-1 md:mb-2 sm:text-3xl font-bold text-white md:py-2 text-left">Find and use your perfect service</h2>
                    </div>
                    <div className="flex justify-between overflow-auto gap-2 rounded-lg md:col-span-2">
                        {
                            arrayItem.map((item, index) => (
                                (
                                    <div key={index} className="bg-[#a1122c] rounded-lg px-5 py-6 grid grid-flow-col max-w-60 min-w-60">
                                        <div className="flex items-center text-3xl pr-3 ">{item.icon}</div>
                                        <div className="text-wrap text-white text-sm"><span>{item.description}</span></div>
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
            </div>
        </StyleSheetManager>

    );
}

export default Example;