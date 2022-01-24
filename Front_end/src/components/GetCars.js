import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


export default class GetCars extends Component {

    state = {
        cars: [],
        start_date: '',
        end_date: '',
        car_class: '',
        queryMade: '0',
        show: false,
        car: {},
        message: ""
    }

    async componentDidMount() {
        var res = await axios.get('http://localhost:8090/cars/getAll');
        this.setState({
            cars: res.data
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        var data = new FormData();
        data.append("startDate", document.getElementById("startDate").value);
        data.append("endDate", document.getElementById("endDate").value);
        data.append("className", document.getElementById("className").value);

        if (data.get('startDate') === "" || data.get('endDate') === "") {
            window.alert('You must enter an start and end date');
        } else {
            if (data.get('startDate') >= data.get('endDate')) {
                window.alert('The end date must be later than the start date')
            } else {
                var res = await axios.get("http://localhost:8090/cars/getAllAvailable",
                    { params: { start: data.get('startDate'), end: data.get('endDate'), class: data.get('className') } })
                this.setState({
                    cars: res.data,
                    start_date: data.get('startDate'),
                    end_date: data.get('endDate'),
                    car_class: data.get('className'),
                    queryMade: '1'
                })
            }
        }
    }

    filterCars = async e => {
        e.preventDefault();
        var data = new FormData();
        if (document.getElementById("lPrice").value === '') {
            data.append("lPrice", '0');
        } else {
            data.append("lPrice", document.getElementById("lPrice").value);
        }
        if (document.getElementById("hPrice").value === '') {
            data.append("hPrice", '999999');
        } else {
            data.append("hPrice", document.getElementById("hPrice").value);
        }
        data.append("orderType", document.getElementById("orderType").value);

        if (this.state.queryMade === '0') {
            window.alert('First you need to do a consult, then you can filter it')
        } else {
            if (isNaN(data.get('lPrice')) === true || isNaN(data.get('hPrice')) === true) {
                window.alert('The lowestPrice and highestPrice must be numbers');
            } else {
                if (data.get('lPrice') > data.get('hPrice')) {
                    window.alert('The lowestPrice must be lower than the highestPrice');
                } else {
                    var res = await axios.get("http://localhost:8090/cars/getAllAvailable",
                        {
                            params: {
                                start: this.state.start_date,
                                end: this.state.end_date,
                                class: this.state.car_class,
                                lprice: data.get('lPrice'),
                                hprice: data.get('hPrice'),
                                priceOrder: data.get('orderType')
                            }
                        })
                    this.setState({
                        cars: res.data,
                    })
                }
            }
        }
    }

    rentCar = async (carID) => {
        if (this.state.queryMade === '0') {
            window.alert("To rent a car, the time frame must be specified");
        } else {
            var res = await axios.get("http://localhost:8090/cars/getByID",
                {
                    params: {
                        id: carID
                    }
                })
            this.setState({
                car: res.data,
                show: true,
            })
        }
    }

    renting = async () => {
        var data = new FormData();
        data.append("email", document.getElementById("email").value);
        data.append("carID", this.state.car.carID);
        data.append("start", this.state.start_date);
        data.append("end", this.state.end_date);
        if (data.get('email') === '') {
            window.alert("If you want to rent the car, you must specify your email");
        } else {
            var res = await axios.get("http://localhost:8090/client/find",
                {
                    params: {
                        email: data.get('email'),
                    }
                })
            if (Object.keys(res.data).length === 0) {
                window.alert("The user is not registered")
            } else {
                res = await axios.post("http://localhost:8090/rental/rent", {}, {
                    headers: {
                        email: data.get('email'),
                        carID: data.get('carID'),
                        start: data.get('start'),
                        end: data.get('end')
                    }
                }
                )
                if (Object.keys(res.data).length === 0) {
                    window.alert("The car is already rented for this time frame")   
                } else {
                    window.alert("Car rented successfully!\n\nYou can review the order details by using the following order ID: "+res.data.rentalID)
                }
            }
        }
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    render() {
        return (
            <div className="container autosize">
                <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Rent this car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            <>
                                <table className="table table-bordered table-striped table-secondary table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Model</th>
                                            <th scope="col">Year</th>
                                            <th scope="col">Color</th>
                                            <th scope="col">Price/day</th>
                                            <th scope="col">Total </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{this.state.car.model}</td>
                                        <td>{this.state.car.year}</td>
                                        <td>{this.state.car.color}</td>
                                        <td>{this.state.car.pricePerDay}</td>
                                        <td>{((new Date(this.state.end_date) -
                                            new Date(this.state.start_date)) / 86400000) *  //Day in milliseconds
                                            parseInt(this.state.car.pricePerDay, 10)}</td>
                                    </tbody>
                                </table>
                                <form>
                                    <div className="form-group">
                                        <label for="email">Type your Email address to continue</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" />
                                    </div>
                                </form>
                            </>
                        }
                        <h3></h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.renting}>
                            Rent the car
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <div className="card card-body text-white bg-secondary mb-2">
                            <h3>
                                Get All Cars
                            </h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label for="startDate">Start Date</label>
                                    <input type="date" className="form-control" id="startDate" />
                                </div>
                                <div className="form-group mb-4">
                                    <label for="endDate">End Date</label>
                                    <input type="date" className="form-control" id="endDate" />
                                </div>
                                <div className="form-group mt-1">
                                    <select className="custom-select form-control" id="className">
                                        <option value="null" selected>Choose a car class</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Compact">Compact</option>
                                        <option value="Pick Up">Pick Up</option>
                                        <option value="Sport">Sport</option>
                                    </select>
                                </div>
                                <div className="container container-fluid">
                                    <button type="submit" className="btn btn-primary mt-3">Consult</button>
                                </div>
                            </form>
                        </div>
                        <div className="card card-body text-white bg-secondary">
                            <form onSubmit={this.filterCars}>
                                <div className="form-group mb-2">
                                    <input type="text" className="form-control" id="lPrice" placeholder="Lowest price" />
                                </div>
                                <div className="form-group mb-1">
                                    <input type="text" className="form-control" id="hPrice" placeholder="Highest price" />
                                </div>
                                <div className="form-group">
                                    <label for="orderType">Order by price</label>
                                    <select className="custom-select form-control" id="orderType">
                                        <option value="asc">Ascending</option>
                                        <option value="desc">descending</option>
                                    </select>
                                </div>
                                <div className="container container-fluid">
                                    <button type="submit" className="btn btn-primary mt-3">Filter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8 mt-4">
                        <div className="card mx-auto mb-1">
                            <div className="card card-body bg-secondary text-center text-white">
                                <h4 className="card-text ">Double click on the car that you would like to rent</h4>
                            </div>
                        </div>
                        <table className="table table-bordered table-striped table-secondary table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Class</th>
                                    <th scope="col">Brand</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Transmission</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Price/day</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.cars.map(car => (
                                        <tr key={car.carID} onDoubleClick={() => this.rentCar(car.carID)} role='button'>
                                            <td>{car.carClass}</td>
                                            <td>{car.brand}</td>
                                            <td>{car.model}</td>
                                            <td>{car.year}</td>
                                            <td>{car.transmission}</td>
                                            <td>{car.color}</td>
                                            <td>{car.pricePerDay}</td>
                                        </tr>)
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    };
}