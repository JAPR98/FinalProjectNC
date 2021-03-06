package mx.edu.j2se.perez.CarRentalSystem.repository;
import mx.edu.j2se.perez.CarRentalSystem.entities.Car;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends CrudRepository<Car,String> {

    @Transactional(readOnly = true)
    Optional<Car> findById(String s);

    @Query(value = "{call getAllAvailableCars(:start, :end, :class, :lprice, :hprice, :priceOrder)}", nativeQuery = true)
    List<Car> getAllAvailableCars(@Param("start") String start,
                                  @Param("end") String end,
                                  @Param("class") String carClass,
                                  @Param("lprice") String lowestPrice,
                                  @Param("hprice") String highestPrice,
                                  @Param("priceOrder") String priceOrder);

    @Query(value = "SELECT c FROM Car c ORDER BY c.pricePerDay ASC")
    List<Car> orderByPriceAsc();

    @Query(value = "SELECT c FROM Car c ORDER BY c.pricePerDay DESC")
    List<Car> orderByPriceDesc();
}