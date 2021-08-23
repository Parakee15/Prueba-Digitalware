package com.example.pruebadigitalwareback.models.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "aircraft")
public class Aircraft implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "aircraft_seq")
//    @SequenceGenerator(name = "aircraft_seq", allocationSize = 1, sequenceName = "aircraft_seq")
    private Long id;

    @Column(length = 50)
    private String name;

    @ColumnDefault("1")
    private Boolean available;

    private static final long serialVersionUID = 1L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
