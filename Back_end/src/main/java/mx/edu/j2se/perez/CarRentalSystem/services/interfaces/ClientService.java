package mx.edu.j2se.perez.CarRentalSystem.services.interfaces;

import mx.edu.j2se.perez.CarRentalSystem.dto.ClientDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientService {

    List<ClientDTO> findAll();

    ClientDTO isRegistered(String email, String password);

    ClientDTO register(String email, String password);

    void save(ClientDTO clientDTO);

    void saveAll(List<ClientDTO> clientDTOList);

    List<ClientDTO> find(float price);


}
