package com.myapp.app.response.oauth;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class GithubProfileResponse {
    private String login;
    private String id;
    private String node_id;
    private String html_url;
    private String name;
}
