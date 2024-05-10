package com.myapp.app.response.oauth;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class FacebookTokenResponse {
    private String access_token;
    private String token_type;
    private String expires_in;
}
