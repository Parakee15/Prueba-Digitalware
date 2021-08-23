package com.example.pruebadigitalwareback.controllers;

import com.example.pruebadigitalwareback.models.entity.Aircraft;
import com.example.pruebadigitalwareback.models.entity.Role;
import com.example.pruebadigitalwareback.services.AircraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"*"})
@Controller
@RequestMapping("/aircraft")
public class AircraftController {

    @Autowired
    private AircraftService aircraftService;

    @GetMapping()
    public ResponseEntity getAll() {
        Map<String, Object> response = new HashMap();
        response.put("data", aircraftService.getAll());
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity save(@RequestBody Aircraft aircraft) {
        Map<String, Object> response = new HashMap();
        if (aircraftService.getByName(aircraft.getName()) != null) {
            response.put("error", "Aereonave duplicada");
            return new ResponseEntity(response, HttpStatus.MULTIPLE_CHOICES);
        }
        aircraft.setAvailable(true);
        response.put("id", aircraftService.save(aircraft).getId());
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity update(@PathVariable("id") Long id, @RequestBody Aircraft aircraft) {
        Map<String, Object> response = new HashMap();
        Optional<Aircraft> optionalAircraft = aircraftService.getById(id);
        if (optionalAircraft.isEmpty()) {
            response.put("error", "Registro no encontrado");
            return new ResponseEntity(response, HttpStatus.NOT_FOUND);
        }

        aircraft.setAvailable(optionalAircraft.get().getAvailable());
        response.put("data", aircraftService.update(aircraft, id));
        return new ResponseEntity(response, HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap();
        if (aircraftService.getById(id).isEmpty()) {
            response.put("error", "Registro no encontrado");
            return new ResponseEntity(response, HttpStatus.NOT_FOUND);
        }

        if (aircraftService.delete(id)) {
            return new ResponseEntity(null, HttpStatus.OK);
        } else {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/available/{id}")
    public ResponseEntity getByRole(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap();
        Boolean available = id == 1 ? true : false;
        response.put("data", aircraftService.findByAvailable(available));
        return new ResponseEntity(response, HttpStatus.OK);
    }
}