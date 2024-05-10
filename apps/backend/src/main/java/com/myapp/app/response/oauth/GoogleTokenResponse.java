package com.myapp.app.response.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class GoogleTokenResponse {
    private String access_token;
    private int expires_in;
    private String token_type;
    private String id_token;
}
