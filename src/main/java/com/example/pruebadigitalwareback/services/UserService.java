package com.example.pruebadigitalwareback.services;

import com.example.pruebadigitalwareback.models.entity.Rentals;
import com.example.pruebadigitalwareback.models.entity.Role;
import com.example.pruebadigitalwareback.models.entity.UserAuth;
import com.example.pruebadigitalwareback.repositories.UserAuthRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserAuthService {

    private Logger logger = LoggerFactory.getLogger(UserAuth.class);

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserAuth userAuth = userAuthRepository.findByUsername(s);

        if (userAuth == null) {
            logger.error("El usuario no esta registrado en el sistema");
            throw new UsernameNotFoundException("El usuario no esta registrado en el sistema");
        }

        List<GrantedAuthority> grantedAuthorities = userAuth.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return new User(userAuth.getUsername(), userAuth.getPassword(), userAuth.getStatus(),
                true, true, true, grantedAuthorities);
    }

    @Override
    public UserAuth findByUsername(String userName) {
        return userAuthRepository.findByUsername(userName);
    }

    @Override
    public Optional<UserAuth> findById(Long id) {
        return userAuthRepository.findById(id);
    }

    @Override
    public UserAuth save(UserAuth user) {
        return userAuthRepository.save(user);
    }

    @Override
    public UserAuth update(UserAuth user, Long id) {
        UserAuth updateUser = user;
        updateUser.setId(id);
        return userAuthRepository.save(updateUser);
    }

    @Override
    public void deleteById(Long id) {
        userAuthRepository.deleteById(id);
    }

    @Override
    public List<UserAuth> findByRoles(Role rol) {
        return userAuthRepository.findByRoles(rol);
    }

    public ArrayList<UserAuth> getAll() {
        return (ArrayList<UserAuth>) userAuthRepository.findAll();
    }

}
