import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import InputWithFocusDiv from "./component/input";
import { Country, State, City, IState, ICity, ICountry } from 'country-state-city';
import SelectWithFocusDiv from "./component/select";

console.log(Country.getAllCountries())

const CheckOutComponent = () => {
    const [address, setAddress] = useState<string>("")
    const [countrys, setCountrys] = useState<ICountry[]>([])
    const [states, setStates] = useState<IState[]>([])
    const [citys, setCitys] = useState<ICity[]>([])

    const [countrySelected, setCountrySelected] = useState<ICountry | undefined>(Country.getAllCountries().find((s) => s.isoCode == "VN"));
    const [stateSelected, setStateSelected] = useState<IState>();
    const [citySelected, setCitySelected] = useState<ICity>();

    const refState = useRef<HTMLSelectElement>(null);
    const [isCollapse, setIsCollapse] = useState<boolean>(true);

    useEffect(() => {
        setStates(State.getStatesOfCountry(countrySelected?.isoCode))
    }, [countrySelected])

    useEffect(() => {
        if (countrySelected?.isoCode && stateSelected?.isoCode) {
            setCitys(City.getCitiesOfState(countrySelected?.isoCode, stateSelected?.isoCode))
        }
    }, [stateSelected, countrySelected])

    useEffect(() => {
        setAddress((citySelected?.name || "...") + " - " + (stateSelected?.name || "...") + " - " + (countrySelected?.name || "..."));
        console.log("Change State or Country to: " + countrySelected?.name + " " + stateSelected?.name + " " + citySelected?.name)
    }, [stateSelected, countrySelected, citySelected])

    useEffect(() => {
        setCountrys(Country.getAllCountries())
    }, [])


    return (
        <Fragment>
            <div className="relative px-8 py-4 md:px-10 xl:px-20 dark:bg-[#18191a] dark:text-white min-h-screen">
                <div>
                    <Link to={"/"}>
                        <img className="w-auto h-[56px] rounded-full object-cover" src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=418" alt="Logo" />
                        <label htmlFor="" className="hidden">My Project</label>
                    </Link>
                </div>
                <button onClick={() => setIsCollapse(!isCollapse)} className="flex justify-between items-center py-2 border-t-2 border-b-2 w-full px-2">
                    <div>
                        <span className="text-sm text-blue-400 underline underline-offset-2">{isCollapse ? 'Ẩn thông tin đơn hàng' : 'Hiện thông tin đơn hàng'}</span>
                        <span>{isCollapse ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}</span>
                    </div>
                    <div className="text-red-600 text-[14px]">
                        <span>169.000₫</span>
                    </div>
                </button>
                <div className="grid grid-cols-12 py-2 gap-2 border-b items-center">
                    <input className="col-span-8 py-2 px-2 focus:outline-none border text-sm" placeholder="Mã giảm giá" />
                    <button className="col-span-4 p-2 bg-gray-300 rounded-sm text-sm">Sử dụng</button>
                </div>
                <div>
                    <div className="text-sm">
                        <div className="py-2 text-[18px] font-semibold">
                            <label>Thông tin giao hàng</label>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-blue-500 underline underline-offset-2">Bạn đã có tài khoản?</span>
                            <span>Đăng nhập</span>
                        </div>
                    </div>
                    <div>
                        <InputWithFocusDiv required={true} label="Họ tên" placeholder="Vui lòng nhập họ tên"></InputWithFocusDiv>
                        <InputWithFocusDiv required={true} label="Email" placeholder="Vui lòng nhập email"></InputWithFocusDiv>
                        <InputWithFocusDiv required={true} label="Số điện thoại" placeholder="Vui lòng số điện thoại"></InputWithFocusDiv>
                        <InputWithFocusDiv required={true} label="Địa chỉ" placeholder="Vui lòng nhập địa chỉ">
                            <span className="text-sm">{address}</span>
                        </InputWithFocusDiv>
                        <SelectWithFocusDiv value={countrySelected?.name} onChange={(el) => setCountrySelected(countrys.filter((s) => s.name === el.target.value)[0])} options={countrys} label="Nước"></SelectWithFocusDiv>
                        <SelectWithFocusDiv locked={states.length > 0 ? false : true} value={stateSelected?.name || undefined} onChange={(el) => setStateSelected(states.filter((s) => s.name === el.target.value)[0])} ref={refState} options={states} label="Tỉnh"></SelectWithFocusDiv>
                        <SelectWithFocusDiv locked={citys.length > 0 ? false : true} onChange={(el) => setCitySelected(citys.filter((s) => s.name === el.target.value)[0])} options={citys} label="Thành phố"></SelectWithFocusDiv>
                    </div>
                    <div className="py-2 text-[18px] font-semibold">
                        <label>Phương thức vận chuyển</label>
                    </div>
                    <div className="text-[15px] border-2 p-2 rounded-md">
                        <form>
                            <div className="flex gap-2 py-1">
                                <input type="radio" id="rdo1" name="deliveryType" checked />
                                <label htmlFor="rdo1">Giao hàng tận nơi</label>
                            </div>
                            <div className="flex gap-2 py-1">
                                <input type="radio" id="rdo2" name="deliveryType" />
                                <label htmlFor="rdo2">Đồng giá nội thành</label>
                            </div>
                        </form>
                    </div>
                    <div className="py-2 text-[18px] font-semibold">
                        <label>Phương thức thanh toán</label>
                    </div>
                    <div className="text-[15px] border-2 p-2 rounded-md">
                        <div className="flex flex-col gap-2 py-1">
                            <div className="flex gap-2 py-1">
                                <input type="radio" id="rdoPayment1" name="paymentMethod" checked />
                                <label htmlFor="rdoPayment1">Thanh toán khi nhận hàng</label>
                            </div>
                            <div className="flex gap-2 py-1">
                                <input type="radio" id="rdoPayment2" name="paymentMethod" />
                                <label htmlFor="rdoPayment2">Chuyển khoản ngân hàng</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <button className="bg-black w-full py-4 font-thin rounded-md text-white text-sm">Hoàn tất đơn hàng</button>
                    </div>
                </div>
            </div>
        </Fragment >
    );
};

export default CheckOutComponent;
