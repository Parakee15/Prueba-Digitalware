package com.example.pruebadigitalwareback.models.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "rentals")
public class Rentals implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rentals_seq")
//    @SequenceGenerator(name = "rentals_seq", allocationSize = 1, sequenceName = "rentals_seq")
    private Long id;

    @Column(length = 100)
    private String location;

    @Column(name = "departure_date")
    private Date departureDate;

    @Column(name = "arrival_date")
    private Date arrivalDate;

    @ManyToOne
    private Aircraft aircraft;

    @ManyToMany()
    @JoinTable(name = "rental_passengers")
    private List<UserAuth> passengers;

    private static final long serialVersionUID = 1L;

    public Aircraft getAircraft() {
        return aircraft;
    }

    public void setAircraft(Aircraft aircraft) {
        this.aircraft = aircraft;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public List<UserAuth> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<UserAuth> passengers) {
        this.passengers = passengers;
    }
}
