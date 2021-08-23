package com.example.pruebadigitalwareback.controllers;

import com.example.pruebadigitalwareback.models.entity.Aircraft;
import com.example.pruebadigitalwareback.models.entity.Rentals;
import com.example.pruebadigitalwareback.models.entity.UserAuth;
import com.example.pruebadigitalwareback.services.AircraftService;
import com.example.pruebadigitalwareback.services.RentalService;
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
@RequestMapping("/rental")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @Autowired
    private AircraftService aircraftService;

    @PostMapping
    public ResponseEntity save(@RequestBody Rentals rentals) {
        Map<String, Object> response = new HashMap();
        Rentals saveRentals = rentalService.save(rentals);
        Aircraft aircraft = saveRentals.getAircraft();
        aircraft.setAvailable(false);
        aircraftService.save(aircraft);
        response.put("id", saveRentals);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity get() {
        Map<String, Object> response = new HashMap();
        response.put("data", rentalService.getAll());
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
