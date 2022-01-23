package mx.edu.j2se.perez.CarRentalSystem.services.interfaces;

import mx.edu.j2se.perez.CarRentalSystem.dto.RentalDTO;
import mx.edu.j2se.perez.CarRentalSystem.entities.Rental;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RentalService {

    List<RentalDTO> findAll();

    List<RentalDTO> getRentalsPerClient(String email);

    RentalDTO findById(int id);

    RentalDTO rent(String email, String carID, String start, String end);

    void save(RentalDTO rentalDTO);

    void saveAll(List<RentalDTO> rentalDTOList);

    void deleteById(int id);

    List<RentalDTO> find(float price);
}
