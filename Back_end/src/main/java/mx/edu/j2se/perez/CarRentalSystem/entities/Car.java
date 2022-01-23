package mx.edu.j2se.perez.CarRentalSystem.entities;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "car")
public class Car implements Serializable {

    @Id
    @Column(name = "CarID")
    private String carID;

    @Column(name = "class")
    private String carClass;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "year")
    private String year;

    @Column(name = "transmission")
    private String transmission;

    @Column(name = "color")
    private String color;

    @Column(name = "priceperday")
    private float pricePerDay;
}