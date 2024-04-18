import { CurrencyDollarIcon, XCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import CopyComponent from "../../util/CopyUtil"
const MethodComponent = () => {
    const [openCrypto, setOpenCrypto] = useState(false);
    const [type, setType] = useState("");
    const address = "TLLqJ9bMvDkHqHgeBMdcqnxBJFwm1Dw3qe";
    const items = [
        {
            "name": "CRYPTO CASH",
            "action": "CRYPTO"
        },
        {
            "name": "BANK CASH",
            "action": "BANK"
        }
    ];
    const handleCopy = () => {
        console.log("OOOO")
    }

    const handleDialog = (action) => {
        console.log(action);
        setType(action);
        setOpenCrypto(true);
    };

    return (
        <div className='relative'>
            <div>
                <span className='text-md font-semibold'>Choose Your method:</span>
                {items.map((item, index) => (
                    <div className="bg-[#e61e43] py-4 px-2 rounded-md mt-2" key={index}>
                        <div className='flex justify-between'>
                            <span className="text-md font-semibold text-white">{item.name}</span>
                            <button onClick={() => handleDialog(item.action)}>
                                <CurrencyDollarIcon className="h-6 w-6 text-gray-200" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* CRYPTO DIALOG */}
            <div className={`transition-all duration-300 fixed top-1/2 bg-white shadow-2xl w-10/12 rounded-md -translate-y-1/2 ${openCrypto && type === "CRYPTO" ? "block -translate-x-1/2 left-1/2 top-1/2" : "-left-full -translate-x-full"}`} id='crypto'>
                <div className='flex justify-between items-center bg-gray-200 py-2 px-3 rounded-t-md'>
                    <div className='flex justify-center items-center gap-1'>
                        <img src="https://cdn.faucetpay.io/coins/usdt.png" className='w-5' alt="USDT" />
                        <span className='text-[13px]'>Deposit</span>
                        <span className='text-[14px] font-semibold'>USDT</span>
                    </div>
                    <div className='inline-flex'>
                        <button onClick={() => setOpenCrypto(false)}>
                            <XCircleIcon className='text-gray-500 w-6' />
                        </button>
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col p-2 gap-5'>
                    {/* IMAGE */}
                    <div className='p-3 shadow-2xl rounded-md'>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`} alt="QR Code" />
                    </div>
                    <div className='p-2 flex flex-col gap-2'>
                        <div>
                            <div>
                                <p className='text-[12px] font-semibold'>DEPOSIT ADDRESS:</p>
                            </div>
                            <div className='px-3 mt-1 bg-gray-300 py-2 flex justify-between items-center rounded-sm'>
                                <p className='text-[12.5px] font-semibold text-gray-900'>{address}</p>
                                <CopyComponent textToCopy={address} onCopy={handleCopy}>
                                    <DocumentDuplicateIcon className='w-7 font-semibold text-gray-500 px-1.5 rounded-sm' />
                                </CopyComponent>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='text-[12px] font-semibold'>NOTE:</p>
                            </div>
                            <div className='text-[13px] px-3 mt-1 bg-gray-300 rounded-sm py-1'>
                                <p className="font-medium text-red-600">TRX Chain Only</p>
                                <p className="font-medium">Minimum Deposit: <span className='text-red-600'>0.00500000 USDT</span></p>
                                <hr className='p-0.5 bg-gray-400 rounded-md'></hr>
                                <p>Please do not deposit invalid assets to this address. We are not responsible for lost funds.</p>
                                <p>We do not support deposits from smart contracts. A recovery fee will be charged for such transactions.</p>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <form action="https://faucetpay.io/merchant/webscr" method="post">
                            <input type="text" name="merchant_username" value="DION" />
                            <input type="text" name="item_description" value="We are not responsible" />
                            <input type="text" name="amount1" value="0.000001" />
                            <input type="text" name="currency1" value="LTC" />
                            <input type="submit" name="submit" value="Make Payment" />
                        </form>
                    </div> */}
                </div>

            </div>
        </div>
    );
};

export default MethodComponent;
