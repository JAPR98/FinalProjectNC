package mx.edu.j2se.perez.CarRentalSystem.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class  RentalDTO implements Serializable {

    private Integer rentalID;

    private String email;

    private String carID;

    private Date startTime;

    private Date endTime;

    private float totalPrice;

    private String rentalStatus;
}
