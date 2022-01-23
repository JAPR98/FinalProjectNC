import React, { Component } from 'react';
import axios from 'axios';

export default class Rental extends Component {

    state = {
        cars: [],
        start_date: '',
        start_date_fetch: '',
        end_date_fetch: '',
        end_date: '',
        car_class: 'null',
        car_class_fetch: '',
        lowestPrice: '0',
        highestPrice: '999999',
        orderType: 'asc',
        queryMade: '0'
    }

    async componentDidMount() {
        var res = await axios.get('http://localhost:8090/cars/getAll');
        this.setState({
            cars: res.data
        })
    }

    onChangeStartDate = (event) => {
        this.setState({
            start_date: event.target.value
        })
    }

    onChangeEndDate = (event) => {
        this.setState({
            end_date: event.target.value
        })
    }

    onChangeClass = (event) => {
        this.setState({
            car_class: event.target.value
        })
    }

    onChangeLowestPrice = (event) => {
        this.setState({
            lowestPrice: event.target.value
        })
    }

    onChangeHighestPrice = (event) => {
        this.setState({
            highestPrice: event.target.value
        })
    }

    onChangeOrderType = (event) => {
        this.setState({
            orderType: event.target.value
        })
    }


    onSubmit = async e => {
        e.preventDefault();
        if (this.state.start_date === "" || this.state.end_date === "") {
            window.alert('You must enter an start and end date');
        } else {
            if (this.state.start_date >= this.state.end_date) {
                window.alert('The end date must be later than the start date')
            } else {
                var res = await axios.get("http://localhost:8090/cars/getAllAvailable",
                    { params: { start: this.state.start_date, end: this.state.end_date, class: this.state.car_class } })
                this.setState({
                    cars: res.data,
                    start_date_fetch: this.state.start_date,
                    end_date_fetch: this.state.end_date,
                    car_class_fetch: this.state.car_class,
                    queryMade: '1'
                })
            }
        }
    }

    filterCars = async e => {
        e.preventDefault();
        if (this.state.queryMade === '0') {
            window.alert('First you need to do a consult, then you can filter it')
        } else {
            if (isNaN(this.state.lowestPrice) === true || isNaN(this.state.highestPrice) === true) {
                window.alert('The lowestPrice and highestPrice must be numbers');
            } else {
                console.log(this.state.lowestPrice, this.state.highestPrice)
                if (this.state.lowestPrice > this.state.highestPrice) {
                    window.alert('The lowestPrice must be lower than the highestPrice');
                } else {
                    var res = await axios.get("http://localhost:8090/cars/getAllAvailable",
                        {
                            params: {
                                start: this.state.start_date_fetch,
                                end: this.state.end_date_fetch,
                                class: this.state.car_class_fetch,
                                lprice: this.state.lowestPrice,
                                hprice: this.state.highestPrice,
                                priceOrder: this.state.orderType
                            }
                        })
                    this.setState({
                        cars: res.data,
                    })
                }
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <div className="card card-body text-white bg-secondary mb-2">
                            <h3>
                                Get All Cars
                            </h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label for="startDate">Start Date</label>
                                    <input type="date" className="form-control" id="startDate" onChange={this.onChangeStartDate} />
                                </div>
                                <div className="form-group mb-4">
                                    <label for="endDate">End Date</label>
                                    <input type="date" className="form-control" id="endDate" onChange={this.onChangeEndDate} />
                                </div>
                                <div className="form-group mt-1">
                                    <select className="custom-select form-control" id="className" onChange={this.onChangeClass}>
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
                                    <input type="text" className="form-control" id="lowestPrice" placeholder="Lowest price" onChange={this.onChangeLowestPrice} />
                                </div>
                                <div className="form-group mb-1">
                                    <input type="text" className="form-control" id="highestPrice" placeholder="Highest price" onChange={this.onChangeHighestPrice} />
                                </div>
                                <div className="form-group">
                                    <label for="orderType">Order by price</label>
                                    <select className="custom-select form-control" id="orderType" onChange={this.onChangeOrderType}>
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
                        <table className="table table-bordered table-striped table-secondary">
                            <thead>
                                <tr>
                                    <th scope="col">Car ID</th>
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
                                        <tr key={car.id}>
                                            <th scope="row">{car.carID}</th>
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