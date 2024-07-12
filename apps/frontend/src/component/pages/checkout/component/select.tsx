import { ICity, ICountry, IState } from 'country-state-city';
import React, { useState } from 'react';
import { cn } from '../../../../lib/util';
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';


interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    label: string
    options: IState[] | ICity[] | ICountry[],
    locked?: boolean
}

const SelectWithFocusDiv = React.forwardRef<HTMLSelectElement, IProps>(

    ({ label, locked, options, className, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        return (
            <div
                className={`p-2 mt-2 rounded-md flex flex-col border-2  ${isFocused ? 'ring-1 ring-blue-500' : ''} `}
            >
                <label className='text-[12.5px] font-semibold text-gray-500 flex justify-between items-center'>
                    <span>{label}</span>
                    <span className='text-sm'>{locked ? <LockOutlined color="disabled" sx={{ fontSize: 20 }} /> : <LockOpenOutlined color="primary" sx={{ fontSize: 20 }}/>}</span>
                </label>
                <select disabled={locked} ref={ref} {...props} className={cn("focus:outline-none text-sm ", className)} onFocus={handleFocus} onBlur={handleBlur}>
                    <option defaultChecked>
                        ---------
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        );

    }
)

export default SelectWithFocusDiv;
