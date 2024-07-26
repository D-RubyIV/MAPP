package com.example.app.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

//@Component
//public class WebSocketAuthInterceptor implements ChannelInterceptor {
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//
//        System.out.println("WSS");
//
//        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
//            String token = accessor.getFirstNativeHeader("Authorization");
//            // Verify token and set authentication
//            if (token != null && token.startsWith("Bearer ")) {
//                String jwtToken = token.substring(7);
//                // Perform token validation and authentication logic
//                // e.g., set Authentication in SecurityContext
//            }
//        }
//
//        return message;
//    }
//}
