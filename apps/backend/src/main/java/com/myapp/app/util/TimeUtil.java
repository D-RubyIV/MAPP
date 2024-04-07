package com.myapp.app.util;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.logging.SimpleFormatter;

public class TimeUtil {
    public Long getIsoTime(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String timestamp = sdf.format(new Date());
        System.out.println(timestamp);
        return Long.valueOf(timestamp);
    }
}
