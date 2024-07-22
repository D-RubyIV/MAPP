package com.example.app.model;

import com.example.app.common.EMessageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageEntity {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private EMessageStatus status;
}
