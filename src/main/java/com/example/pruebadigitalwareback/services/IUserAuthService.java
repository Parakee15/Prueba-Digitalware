package com.example.pruebadigitalwareback.services;

import com.example.pruebadigitalwareback.models.entity.Role;
import com.example.pruebadigitalwareback.models.entity.UserAuth;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface IUserAuthService extends UserDetailsService {

    public UserAuth save(UserAuth user);

    public UserAuth findByUsername(String userName);

    public Optional<UserAuth> findById(Long id);

    public UserAuth update(UserAuth user, Long id);

    public void deleteById(Long id);

    public List<UserAuth> findByRoles(Role rol);

}
