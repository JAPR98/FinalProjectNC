package mx.edu.j2se.perez.CarRentalSystem.entities;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "rental")
public class Rental implements Serializable{

    @Id
    @Column(name = "rentalID")
    private int rentalID;

    @Column(name = "email")
    private String email;

    @Column(name = "carID")
    private String carID;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_time")
    private Date startTime;

    @Temporal(TemporalType.DATE)
    @Column(name = "end_time")
    private Date endTime;

    @Column(name = "total_price")
    private float totalPrice;

    @Column(name = "rental_status")
    private String rentalStatus;
}
