CREATE TABLE car(
    carID VARCHAR(10) PRIMARY KEY,
    class VARCHAR(30) NOT NULL,
    brand VARCHAR(30) NOT NULL,
    model VARCHAR(30) NOT NULL,
    year VARCHAR(4) NOT NULL,
    transmission VARCHAR(20) NOT NULL,
    color VARCHAR(15) NOT NULL,
    priceperday FLOAT NOT NULL
);

CREATE TABLE client(
    email VARCHAR(319) PRIMARY KEY,
    password VARCHAR(10)
);

CREATE TABLE rental(
    rentalID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(319) NOT NULL,
    carID VARCHAR(10),
    start_time DATE NOT NULL,
    end_time DATE NOT NULL,
    total_price float NOT NULL DEFAULT 0.0,
    rental_status VARCHAR(20) DEFAULT 'RENTED' NOT NULL,
    CONSTRAINT fk_Car FOREIGN KEY (email) REFERENCES client(email),
    CONSTRAINT fk_Client FOREIGN KEY (carID) REFERENCES car(carID)
);

DROP TABLE car;
DROP TABLE client;
DROP TABLE rental;
DROP TRIGGER rentalActions;

CREATE TRIGGER rentalActions
    BEFORE INSERT ON rental FOR EACH ROW
    BEGIN
        SET new.total_price = (SELECT priceperday FROM car WHERE carID = new.carID) *
                             DATEDIFF(new.end_time, new.start_time); #Time that the will be rented
    end;

#Some cars
DELETE FROM car WHERE TRUE;
INSERT INTO car (CARID, CLASS, BRAND, MODEL, YEAR, TRANSMISSION, COLOR, PRICEPERDAY)
       VALUES ('13ADSS9J0','Sedan', 'Audi', 'A3', '2006','Automatic', 'Red', '125');
INSERT INTO car (CARID, CLASS, BRAND, MODEL, YEAR, TRANSMISSION, COLOR, PRICEPERDAY)
       VALUES ('13ADCS9J0','Compact', 'Toyota', 'Corolla', '2020','Automatic', 'White', '100');
INSERT INTO car (CARID, CLASS, BRAND, MODEL, YEAR, TRANSMISSION, COLOR, PRICEPERDAY)
       VALUES ('13ADPS9J0','Pick Up', 'Chevrolet', 'Colorado', '2018','Automatic', 'Black', '150');
INSERT INTO car (CARID, CLASS, BRAND, MODEL, YEAR, TRANSMISSION, COLOR, PRICEPERDAY)
       VALUES ('13ADPS9J1','Pick Up', 'Ford', 'F-150', '2016','Automatic', 'Black', '170');
INSERT INTO car (CARID, CLASS, BRAND, MODEL, YEAR, TRANSMISSION, COLOR, PRICEPERDAY)
       VALUES ('13ADSP9J0','Sport', 'Chevrolet', 'Camaro ZL1', '2020','Manual', 'Red', '160');
INSERT INTO car (CARID, CLASS, BRAND, MODEL, YEAR, TRANSMISSION, COLOR, PRICEPERDAY)
       VALUES ('13ADSP9J1','Sport', 'Chevrolet', 'Corvette Stingray', '2019','Automatic', 'Blue', '200');
INSERT INTO car (CARID, CLASS, BRAND, MODEL, YEAR, TRANSMISSION, COLOR, PRICEPERDAY)
       VALUES ('13ADSP9J2','Sport', 'Ford', 'Shelby GT500', '2021','Automatic', 'Blue', '190');

#Some clients
DELETE FROM client WHERE TRUE;
INSERT INTO client VALUES ('japerezro@hotmail.com', '1234567890');
INSERT INTO client VALUES ('mayra@gmail.com', 'qwerty');
INSERT INTO client VALUES ('cckjons@yahoo.com', 'abcdef');

#Some transactions
DELETE FROM rental WHERE TRUE;

INSERT INTO rental (email, carID, start_time, end_time)
VALUES ('japerezro@hotmail.com','13ADSS9J0', '2021-01-01', '2021-01-05');
INSERT INTO rental (email, carID, start_time, end_time, rental_status)
VALUES ('japerezro@hotmail.com','13ADPS9J1', '2021-01-09', '2021-01-12', 'RETURNED');

ALTER TABLE rental AUTO_INCREMENT = 0;

SELECT * FROM Car ORDER BY priceperday ASC;

SELECT * FROM CAR  WHERE class LIKE 'sport' ORDER BY class ASC;

SELECT * FROM car c WHERE c.carID NOT IN (SELECT rental.carID FROM rental
WHERE NOT (('2021-01-09' < start_time OR end_time < '2021-01-05') OR rental_status LIKE 'RETURNED'));

#------------------------------------Some procedures----------------------------------------------------#

DROP PROCEDURE getAllAvailableCars;
DELIMITER ;;
CREATE PROCEDURE getAllAvailableCars(
IN start VARCHAR(10),
IN end VARCHAR(10),
IN class VARCHAR(30),
IN lowestprice VARCHAR(6),
IN highestprice VARCHAR(6),
IN priceOrder VARCHAR(6))
BEGIN
    IF priceOrder like 'asc' THEN
        IF class NOT LIKE 'null' THEN
            SELECT * FROM car c WHERE c.carID NOT IN (SELECT rental.carID FROM rental
            WHERE NOT ((end < start_time OR end_time < start) OR rental_status LIKE 'RETURNED'))
            AND c.class LIKE class AND CAST(lowestprice AS UNSIGNED INTEGER) <= c.priceperday AND
            CAST(highestprice AS UNSIGNED INTEGER) >= c.priceperday ORDER BY c.priceperday ASC;
        ELSE
            SELECT * FROM car c WHERE c.carID NOT IN (SELECT rental.carID FROM rental
            WHERE NOT ((end < start_time OR end_time < start) OR rental_status LIKE 'RETURNED'))
            AND CAST(lowestprice AS UNSIGNED INTEGER) <= c.priceperday AND
            CAST(highestprice AS UNSIGNED INTEGER) >= c.priceperday
            ORDER BY c.priceperday ASC;
        END IF;
    ELSE
        IF class NOT LIKE 'null' THEN
            SELECT * FROM car c WHERE c.carID NOT IN (SELECT rental.carID FROM rental
            WHERE NOT ((end < start_time OR end_time < start) OR rental_status LIKE 'RETURNED'))
            AND c.class LIKE class AND CAST(lowestprice AS UNSIGNED INTEGER) <= c.priceperday AND
            CAST(highestprice AS UNSIGNED INTEGER) >= c.priceperday ORDER BY c.priceperday DESC;
        ELSE
            SELECT * FROM car c WHERE c.carID NOT IN (SELECT rental.carID FROM rental
            WHERE NOT ((end < start_time OR end_time < start) OR rental_status LIKE 'RETURNED'))
            AND CAST(lowestprice AS UNSIGNED INTEGER) <= c.priceperday AND
            CAST(highestprice AS UNSIGNED INTEGER) >= c.priceperday
            ORDER BY c.priceperday DESC;
        END IF;
    END IF;
END
;;

DROP PROCEDURE register;
DELIMITER ;;
CREATE PROCEDURE register(IN email VARCHAR(319), IN car_ID VARCHAR )
BEGIN
    IF email NOT IN (SELECT c.email FROM client c) THEN
        INSERT INTO client VALUES (email, password);
        SELECT * FROM client WHERE client.email LIKE email;
    ELSE
        SELECT * FROM client WHERE client.email LIKE '/';
    END IF;
END
;;

DROP PROCEDURE renting;
DELIMITER ;;
CREATE PROCEDURE renting(
IN email_ VARCHAR(319),
IN carID_ VARCHAR(10),
IN start VARCHAR(10),
IN end VARCHAR(10))
BEGIN
    IF carID_ IN (SELECT c.carID FROM car c WHERE c.carID NOT IN (SELECT rental.carID FROM rental
    WHERE NOT ((end < start_time OR end_time < start) OR rental_status LIKE 'RETURNED'))) THEN
        INSERT INTO rental(email, carID, start_time, end_time) VALUES (email_, carID_, start, end);
        SELECT * FROM rental ORDER BY rental.rentalID DESC LIMIT 1;
    ELSE
        SELECT * FROM rental WHERE rentalID = 0;
    END if;
END
;;