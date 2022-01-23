package mx.edu.j2se.perez.CarRentalSystem.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ClientDTO implements Serializable {

    private String email;

    private String password;

}
