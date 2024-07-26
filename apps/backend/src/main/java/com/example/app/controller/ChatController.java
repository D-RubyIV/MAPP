package com.example.app.controller;

import java.security.Principal;
import java.time.Instant;

import com.example.app.model.UserEntity;
import com.example.app.record.Message;
import com.example.app.record.User;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Controller
public class ChatController {

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public String sendMessage(String message, StompHeaderAccessor headerAccessor) {
        Principal authentication = headerAccessor.getUser();

        if (authentication != null) {
            Principal user = headerAccessor.getUser();
            System.out.println("User Email: " + user.getName());
        } else {
            System.out.println("Authentication is null");
        }

        return message;
    }

    @EventListener
    public void handleSessionConnectEvent(SessionConnectEvent event) {
        System.out.println("Session Connect Event");
    }

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent event) {
        System.out.println("Session Disconnect Event");
    }

    @MessageMapping("/message")
    public void getMessage(Message message) throws Exception {
        Message newMessage = new Message(new User(null, message.user().serialId(), message.user().username()), message.receiverId(), message.comment(), message.action(), Instant.now());
        System.out.println(newMessage);
    }

    @MessageMapping("/private-message")
    public void getPrivateMessage(Message message) throws Exception {
        Message newMessage = new Message(new User(null, message.user().serialId(), message.user().username()), message.receiverId(), message.comment(), message.action(), Instant.now());
        System.out.println(newMessage);

    }

}