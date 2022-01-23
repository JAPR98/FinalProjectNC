package mx.edu.j2se.perez.CarRentalSystem.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CarDTO implements Serializable {

    private String carID;

    private String carClass;

    private String brand;

    private String model;

    private String year;

    private String transmission;

    private String color;

    private float pricePerDay;
}
