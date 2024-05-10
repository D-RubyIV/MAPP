package com.myapp.app.response.oauth;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class GithubTokenResponse {
    private String access_token;
    private String token_type;
    private String scope;
}
