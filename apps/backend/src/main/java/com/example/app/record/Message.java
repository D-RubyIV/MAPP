package com.example.app.record;

import java.time.Instant;

public record Message(User user, String receiverId, String comment, Action action, Instant timestamp) {

}
