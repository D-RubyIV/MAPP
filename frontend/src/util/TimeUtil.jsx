const TimeUtil = () => {
    const convertTimeStampToDateTime = (currentTimestamp) => {
        let date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(currentTimestamp);
        return date;
    }

    return {
        convertTimeStampToDateTime: convertTimeStampToDateTime
    };
}

export default TimeUtil;
