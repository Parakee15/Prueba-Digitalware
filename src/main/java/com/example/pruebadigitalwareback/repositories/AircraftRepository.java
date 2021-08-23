package com.example.pruebadigitalwareback.repositories;

import com.example.pruebadigitalwareback.models.entity.Aircraft;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AircraftRepository extends CrudRepository<Aircraft, Long> {
    Aircraft findByName(String userName);
    List<Aircraft> findByAvailable(Boolean available);

}
