export const RenderValueColumn = (data: any) => {
    if (data && typeof data === "boolean") {
        return data==true ? "True" : "False"
    }
    else if (data && typeof data === "object") {
        return data.hasOwnProperty("name") ? data.name : data.id
    }
    else if (data) {
        return renderLongString(data, 24)
    }
}

const renderLongString = (chuoi: string, length: number) => {
    const chuoiJavaScript = chuoi.toString();
    if (chuoiJavaScript.length <= length) {
        return chuoiJavaScript;
    } else {
        return chuoiJavaScript.substring(0, length) + '...';
    }
}