package mx.edu.j2se.perez.CarRentalSystem.services.implementation;


import mx.edu.j2se.perez.CarRentalSystem.dto.CarDTO;
import mx.edu.j2se.perez.CarRentalSystem.entities.Car;
import mx.edu.j2se.perez.CarRentalSystem.entities.Client;
import mx.edu.j2se.perez.CarRentalSystem.repository.ClientRepository;
import mx.edu.j2se.perez.CarRentalSystem.services.interfaces.ClientService;
import mx.edu.j2se.perez.CarRentalSystem.utils.Helpers;
import mx.edu.j2se.perez.CarRentalSystem.dto.ClientDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ClientImplementation implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<ClientDTO> findAll() {
        List<ClientDTO> dto = new ArrayList<>();
        Iterable<Client> clients = this.clientRepository.findAll();
        for (Client cl : clients) {
            ClientDTO clientDTO = Helpers.modelMapper().map(cl, ClientDTO.class);
            dto.add(clientDTO);
        }
        return dto;
    }

    @Override
    public ClientDTO findById(String id) {
        Optional<Client> client = this.clientRepository.findById(id);
        if (!client.isPresent()) {
            return null;
        }
        return Helpers.modelMapper().map(client.get(), ClientDTO.class);
    }

    @Override
    public ClientDTO isRegistered(String email, String password) {
        Optional<Client> client = this.clientRepository.isRegistered(email, password);
        if (!client.isPresent()) {
            return null;
        }
        return Helpers.modelMapper().map(client.get(), ClientDTO.class);
    }

    @Override
    public ClientDTO register(String email, String password) {
        Optional<Client> client = this.clientRepository.register(email, password);
        if (!client.isPresent()) {
            return null;
        }
        return Helpers.modelMapper().map(client.get(), ClientDTO.class);
    }

    @Override
    public void save(ClientDTO clientDTO) {
        Client client = Helpers.modelMapper().map(clientDTO, Client.class);
        this.clientRepository.save(client);
    }

    @Override
    public void saveAll(List<ClientDTO> clientDTOList) {
        List<Client> clients = new ArrayList<>();
        for (ClientDTO clientDTO : clientDTOList) {
            Client cl = Helpers.modelMapper().map(clientDTO, Client.class);
            clients.add(cl);
        }
        this.clientRepository.saveAll(clients);
    }
}
