package mx.edu.j2se.perez.CarRentalSystem.services.implementation;

import mx.edu.j2se.perez.CarRentalSystem.entities.Rental;
import mx.edu.j2se.perez.CarRentalSystem.repository.RentalRepository;
import mx.edu.j2se.perez.CarRentalSystem.services.interfaces.RentalService;
import mx.edu.j2se.perez.CarRentalSystem.utils.Helpers;
import mx.edu.j2se.perez.CarRentalSystem.dto.RentalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class RentalImplementation implements RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Override
    public List<RentalDTO> findAll() {
        List<RentalDTO> dto = new ArrayList<>();
        Iterable<Rental> rentals = this.rentalRepository.findAll();
        for (Rental rl : rentals) {
            RentalDTO rentalDTO = Helpers.modelMapper().map(rl, RentalDTO.class);
            dto.add(rentalDTO);
        }
        return dto;
    }

    @Override
    public List<RentalDTO> getRentalsPerClient(String email) {
        List<RentalDTO> dto = new ArrayList<>();
        Iterable<Rental> rentals = this.rentalRepository.getRentalsPerClient(email);
        for (Rental rl : rentals) {
            RentalDTO rentalDTO = Helpers.modelMapper().map(rl, RentalDTO.class);
            dto.add(rentalDTO);
        }
        return dto;
    }

    @Override
    public RentalDTO findById(int id) {
        Optional<Rental> rental = this.rentalRepository.findById(id);
        if (!rental.isPresent()) {
            return null;
        }
        return Helpers.modelMapper().map(rental.get(), RentalDTO.class);
    }

    @Override
    public RentalDTO rent(String email, String carID, String start, String end) {
        Optional<Rental> rental = this.rentalRepository.rent(email, carID, start, end);
        if (!rental.isPresent()) {
            return null;
        }
        return Helpers.modelMapper().map(rental.get(), RentalDTO.class);
    }

    @Override
    public void save(RentalDTO rentalDTO) {
        Rental rental = Helpers.modelMapper().map(rentalDTO, Rental.class);
        this.rentalRepository.save(rental);
    }

    @Override
    public void saveAll(List<RentalDTO> rentalDTOList) {
        List<Rental> rentals = new ArrayList<>();
        for (RentalDTO rentalDTO : rentalDTOList) {
            Rental rl = Helpers.modelMapper().map(rentalDTO, Rental.class);
            rentals.add(rl);
        }
        this.rentalRepository.saveAll(rentals);
    }

    @Override
    public void deleteById(int id) {
        this.rentalRepository.deleteById(id);
    }

    @Override
    public List<RentalDTO> find(float price) {
        return null;
    }
}
