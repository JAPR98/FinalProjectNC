package mx.edu.j2se.perez.CarRentalSystem.repository;

import mx.edu.j2se.perez.CarRentalSystem.entities.Client;
import mx.edu.j2se.perez.CarRentalSystem.entities.Rental;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalRepository extends CrudRepository<Rental, Integer> {

    @Query(value = "SELECT r FROM Rental r WHERE r.email LIKE :email")
    List<Rental> getRentalsPerClient(@Param("email") String email);

    @Query(value = "{call renting(:email, :carID, :start, :end )}", nativeQuery = true)
    Optional<Rental> rent(@Param("email") String email,
                          @Param("carID") String carID,
                          @Param("start") String start,
                          @Param("end") String end);

    @Query(value = "{call canceling(:rentalID)}", nativeQuery = true)
    void canceling(@Param("rentalID") String rentalID);
}
