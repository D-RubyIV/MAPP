package com.example.app.common;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Status {
    @JsonProperty("Pending")
    Pending,
    @JsonProperty("Success")
    Success,
}
