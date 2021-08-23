package com.example.pruebadigitalwareback.services;

import com.example.pruebadigitalwareback.models.entity.Aircraft;
import com.example.pruebadigitalwareback.repositories.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AircraftService {
    @Autowired
    AircraftRepository aircraftRepository;

    public ArrayList<Aircraft> getAll() {
        return (ArrayList<Aircraft>) aircraftRepository.findAll();
    }

    public Aircraft save(Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    public Aircraft update(Aircraft aircraft, Long id) {
        aircraft.setId(id);
        return aircraftRepository.save(aircraft);
    }

    public Boolean delete(Long id) {
        try {
            aircraftRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Optional<Aircraft> getById(Long id){
        return aircraftRepository.findById(id);
    }

    public Aircraft getByName(String name){
        return aircraftRepository.findByName(name);
    }

    public List<Aircraft> findByAvailable(Boolean available){
        return aircraftRepository.findByAvailable(available);
    }

}
