package com.myapp.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.myapp.app.enums.Provider;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Data
@Table(name = "tbl_user")
@ToString
public class UserModel extends BaseModel implements UserDetails {
    private String username;
    private String email;
    private String fingerprint;
    private String password;
    private String phone;
    private String fullName;
    private float balance;
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    private Provider provider;
    @JsonIgnore
    private String verificationCode;
    @ManyToOne
    @JoinColumn(name="role_id", nullable=false)
    private RoleModel roleModel;
    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Stream.of(roleModel).map(s -> new SimpleGrantedAuthority(s.getCode())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
