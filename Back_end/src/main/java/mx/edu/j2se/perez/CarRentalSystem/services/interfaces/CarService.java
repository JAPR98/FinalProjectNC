package mx.edu.j2se.perez.CarRentalSystem.services.interfaces;
import mx.edu.j2se.perez.CarRentalSystem.dto.CarDTO;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public interface CarService {

    List<CarDTO> findAll();

    List<CarDTO> getAllAvailableCars(String startDate, String endDate, String carClass, String lowestPrice, String highestPrice, String priceOrder) ;

    CarDTO findById(String id);

    void save(CarDTO carDTO);

    void saveAll(List<CarDTO> carDTOList);

    void deleteById(String id);

    List<CarDTO> find(float price);
}
