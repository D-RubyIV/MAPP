import { Action } from "../manage/model/Method";
import { Label } from "../manage/model/Label";
import { Type } from "../manage/model/Type";

export function RenderInputRow(label: Label, handleOnChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void, object: any, foreignObject: { [key: string]: any[] }, action: any) {
    const disable = action === Action.DETAIL ? true : false
    const classNameInput = `${action === Action.DETAIL?"bg-blue-100":""} text-[15px] bg- block w-full rounded-md border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 border-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
    if (label.type === Type.STRING) {
        return (
            <div>
                <label htmlFor={label.attribute} className='text-sm'>{label.name}:</label>
                <input onChange={handleOnChange} disabled={disable} name={label.attribute} value={object ? object[label.attribute] || "" : ""} type="text" className={classNameInput} />
            </div>
        )
    }
    else if (label.type === Type.NUMBER) {
        if (label.attribute === "id" && (action === Action.CREATE || action === Action.UPDATE)) {
            return <></>
        }
        else {
            return (
                <div>
                    <label htmlFor={label.attribute} className='text-sm'>{label.name}:</label>
                    <input onChange={handleOnChange} disabled={disable} name={label.attribute} value={object ? object[label.attribute] || "" : ""} type="number" className={classNameInput} />
                </div>
            )
        }
    }
    else if (label.type === Type.BOOLEAN) {
        return (
            <div>
                <label htmlFor={label.attribute} className='text-sm'>{label.name}:</label>
                <select
                    title="select"
                    disabled={disable}
                    name={label.attribute}
                    className={classNameInput}
                    onChange={handleOnChange}
                    value={object ? object[label.attribute] === true || object[label.attribute] === "true" ? "true" : "false" : ""}
                >
                    <option>Please select your option</option>
                    <option value={"true"}>True</option>
                    <option value={"false"}>False</option>
                </select>
            </div>
        );
    }
    else if (label.type === Type.OBJECT) {
        var value = object && object[label.attribute] && object[label.attribute].hasOwnProperty("id") ? object[label.attribute].id : "";
        return (
            <div>
                <label htmlFor={label.name} className='text-sm'>{label.name}:</label>
                <select
                    title="select"
                    disabled={disable}
                    name={label.attribute}
                    onChange={handleOnChange}
                    className={classNameInput}
                    value={value}
                >
                    <option>Please select your option</option>
                    {
                        Array.isArray(foreignObject[label.attribute]) && foreignObject[label.attribute].map((item, index) => (
                            <option key={index} value={item.id}>{item.hasOwnProperty("name") ? item.name : item.hasOwnProperty("username") ? item.username : item.id}</option>
                        ))
                    }

                </select>
            </div>
        );
    }
    return null;
};

