package com.myapp.app.dto;

import com.myapp.app.model.RoleModel;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    @NotNull(message = "username is requires")
    private String username;
    @NotNull(message = "email is requires")
    private String email;
    @NotNull(message = "password is requires")
    private String password;
    @NotNull(message = "phone is requires")
    private String phone;
    @NotNull(message = "fullName is requires")
    private String fullName;
    @NotNull(message = "balance is requires")
    private float balance;
    @NotNull(message = "enabled is requires")
    private boolean enabled;
    @NotNull(message = "role is requires")
    private RoleModel roleModel;

}
