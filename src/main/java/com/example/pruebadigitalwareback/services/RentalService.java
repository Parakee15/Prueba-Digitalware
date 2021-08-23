package com.example.pruebadigitalwareback.services;


import com.example.pruebadigitalwareback.models.entity.Rentals;
import com.example.pruebadigitalwareback.repositories.RentalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RentalService {

    @Autowired
    RentalsRepository rentalsRepository;

    public ArrayList<Rentals> getAll() {
        return (ArrayList<Rentals>) rentalsRepository.findAll();
    }

    public Rentals save(Rentals aircraft) {
        return rentalsRepository.save(aircraft);
    }
}
