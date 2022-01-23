package mx.edu.j2se.perez.CarRentalSystem;
import mx.edu.j2se.perez.CarRentalSystem.dto.ClientDTO;
import mx.edu.j2se.perez.CarRentalSystem.services.interfaces.CarService;
import mx.edu.j2se.perez.CarRentalSystem.services.interfaces.ClientService;
import mx.edu.j2se.perez.CarRentalSystem.services.interfaces.RentalService;
import mx.edu.j2se.perez.CarRentalSystem.dto.CarDTO;
import mx.edu.j2se.perez.CarRentalSystem.dto.RentalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/")
public class RequestController {

    @Autowired
    private CarService carService;

    @Autowired
    private ClientService clientService;

    @Autowired
    private RentalService rentalService;

    @GetMapping(value = "/cars/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAll() {
        return ResponseEntity.ok(this.carService.findAll());
    }

    @GetMapping(value = "/cars/getAllAvailable", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getAllAvailableCars(@RequestParam(value = "start",
            defaultValue = "null") String start, @RequestParam(value = "end",
            defaultValue = "null") String end,  @RequestParam(value = "class",
            defaultValue = "null") String carClass, @RequestParam(value = "lprice",
            defaultValue = "0") String lowestPrice, @RequestParam(value = "hprice",
            defaultValue = "999999") String highestPrice, @RequestParam(value = "priceOrder",
            defaultValue = "null") String priceOrder) {
        return ResponseEntity.ok(this.carService.getAllAvailableCars(start, end, carClass,
                lowestPrice, highestPrice,  priceOrder));
    }

    @GetMapping(value = "/cars/getByID", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getCarByID(@RequestParam(value = "id",
            defaultValue = "null") String id) {
        if (id.equals("null")) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } else {
            CarDTO car = this.carService.findById(id);
            if (car != null) {
                return ResponseEntity.ok(car);
            } else {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        }
    }

    @GetMapping(value = "/client/isRegistered", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> isRegisterd(@RequestParam(value = "email",
            defaultValue = "null") String email, @RequestParam(value = "password",
            defaultValue = "null") String password) {
        ClientDTO client = this.clientService.isRegistered(email, password);
        if (client == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok(client);
        }
    }

    @PostMapping(value = "/client/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> register(@RequestHeader(value = "email",
            defaultValue = "null") String email, @RequestHeader(value = "password",
            defaultValue = "null") String password) {
        ClientDTO client = this.clientService.register(email, password);
        if (client == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok(client);
        }
    }

    @GetMapping(value = "/rental/getByID", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getRentalByID(@RequestParam(value = "id",
            defaultValue = "null") String id) {
        if (id.equals("null" )) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } else {
            RentalDTO rental = this.rentalService.findById(Integer.parseInt(id));
            if (rental != null) {
                return ResponseEntity.ok(rental);
            } else {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        }
    }

    @GetMapping(value = "/rental/getPerClient", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> insertRental(@RequestParam(value = "email",
            defaultValue = "null") String email) {
        if (email.equals("null")) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } else {
            return ResponseEntity.ok(this.rentalService.getRentalsPerClient(email));
        }
    }

    @PostMapping(value = "/rental/rent", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> rent(@RequestHeader(value = "email",
            defaultValue = "null") String email, @RequestHeader(value = "carID",
            defaultValue = "null") String carID,  @RequestHeader(value = "start",
            defaultValue = "null") String start,  @RequestHeader(value = "end",
            defaultValue = "null") String end) {
        RentalDTO rental = this.rentalService.rent(email,carID, start, end);
        if (rental == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            return ResponseEntity.ok(rental);
        }
    }
}