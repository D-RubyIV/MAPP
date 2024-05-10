package com.myapp.app.response.oauth;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FacebookProfileResponse {
    private String app_id;
    private String user_id;
    private String application;
}
