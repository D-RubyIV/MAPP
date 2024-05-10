package com.myapp.app.response.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class GoogleProfileResponse {
    private String azp;
    private String aud;
    private String sub;
    private String scope;
    private String exp;
    private String expires_in;
    private String email;
    private String email_verified;
    private String access_type;
}
