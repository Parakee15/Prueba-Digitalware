package com.example.pruebadigitalwareback.repositories;

import com.example.pruebadigitalwareback.models.entity.Role;
import com.example.pruebadigitalwareback.models.entity.UserAuth;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserAuthRepository extends CrudRepository<UserAuth, Long> {

    public UserAuth findByUsername(String userName);

    public List<UserAuth> findByRoles(Role rol);


}
