package com.example.pruebadigitalwareback.controllers;

import com.example.pruebadigitalwareback.models.entity.Role;
import com.example.pruebadigitalwareback.models.entity.UserAuth;
import com.example.pruebadigitalwareback.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @GetMapping(path = "/{id}")
    public ResponseEntity getById(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap();
        Optional<UserAuth> user = userService.findById(id);
        if (user.isEmpty()) {
            response.put("error", "Usuario no encontrado");
            return new ResponseEntity(response, HttpStatus.NOT_FOUND);
        }
        response.put("data", user.get());
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody UserAuth user) {
        Map<String, Object> response = new HashMap();
        if (userService.findByUsername(user.getUsername()) != null) {
            response.put("error", "Usuario duplicado");
            return new ResponseEntity(response, HttpStatus.MULTIPLE_CHOICES);
        }
        user.setStatus(true);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        List<Role> roles = new ArrayList<>();
        Role rol = new Role();
        rol.setId(2L);
        roles.add(rol);
        user.setRoles(roles);
        response.put("id", userService.save(user).getId());
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping("/role/{id}")
    public ResponseEntity getByRole(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap();
        Role rol = new Role();
        rol.setId(id);
        response.put("data", userService.findByRoles(rol));
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity get() {
        Map<String, Object> response = new HashMap();
        response.put("data", userService.getAll());
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
