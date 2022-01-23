package mx.edu.j2se.perez.CarRentalSystem.entities;

import lombok.Data;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "client")
public class Client implements Serializable{

    @Id
    @Column(name = "email")
    private String email;


    @Column(name = "password")
    private String password;
}
