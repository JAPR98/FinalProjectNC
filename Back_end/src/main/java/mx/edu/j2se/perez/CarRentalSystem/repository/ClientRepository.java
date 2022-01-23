package mx.edu.j2se.perez.CarRentalSystem.repository;
import mx.edu.j2se.perez.CarRentalSystem.entities.Car;
import mx.edu.j2se.perez.CarRentalSystem.entities.Client;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;  

@Repository
public interface ClientRepository extends CrudRepository<Client, String> {

    @Transactional(readOnly = true)
    Optional<Client> findById(String s);

    @Query(value = "SELECT c FROM Client c WHERE c.email LIKE :email AND c.password LIKE :password")
    Optional<Client> isRegistered(@Param("email") String email, @Param("password") String password);

    @Query(value = "{call register(:email, :password)}", nativeQuery = true)
    Optional<Client> register(@Param("email") String email, @Param("password") String password);
}
