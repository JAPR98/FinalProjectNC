package mx.edu.j2se.perez.CarRentalSystem.services.implementation;

import mx.edu.j2se.perez.CarRentalSystem.entities.Car;
import mx.edu.j2se.perez.CarRentalSystem.repository.CarRepository;
import mx.edu.j2se.perez.CarRentalSystem.services.interfaces.CarService;
import mx.edu.j2se.perez.CarRentalSystem.utils.Helpers;
import mx.edu.j2se.perez.CarRentalSystem.dto.CarDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class CarImplementation implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Override
    public List<CarDTO> findAll() {
        List<CarDTO> dto = new ArrayList<>();
        Iterable<Car> cars = this.carRepository.findAll();
        for (Car cr : cars) {
            CarDTO carDTO = Helpers.modelMapper().map(cr, CarDTO.class);
            dto.add(carDTO);
        }
        return dto;
    }

    @Override
    public List<CarDTO> getAllAvailableCars(String startDate, String endDate, String carClass, String lowestPrice, String highestPrice,String priceOrder) {
        List<CarDTO> dto = new ArrayList<>();
        Iterable<Car> cars = this.carRepository.getAllAvailableCars(startDate, endDate, carClass, lowestPrice, highestPrice, priceOrder);
        for (Car cr : cars) {
            CarDTO carDTO = Helpers.modelMapper().map(cr, CarDTO.class);
            dto.add(carDTO);
        }
        return dto;
    }

    @Override
    public CarDTO findById(String id) {
        Optional<Car> car = this.carRepository.findById(id);
        if (!car.isPresent()) {
            return null;
        }
        return Helpers.modelMapper().map(car.get(), CarDTO.class);
    }

    @Override
    public void save(CarDTO carDTO) {
        Car car = Helpers.modelMapper().map(carDTO, Car.class);
        this.carRepository.save(car);
    }

    @Override
    public void saveAll(List<CarDTO> carDTOList) {
        List<Car> cars = new ArrayList<>();
        for (CarDTO carDTO : carDTOList) {
            Car cr = Helpers.modelMapper().map(carDTO, Car.class);
            cars.add(cr);
        }
        this.carRepository.saveAll(cars);
    }

    @Override
    public void deleteById(String id) {
        this.carRepository.deleteById(id);
    }

    @Override
    public List<CarDTO> find(float price) {
        return null;
    }
}
