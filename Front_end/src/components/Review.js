import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

export default class Review extends Component {

    state = {
        rentals: [],
        rental: {},
        car: {},
        show: false
    }

    onSubmitRentalID = async e => {
        e.preventDefault();
        var data = new FormData();
        data.append("rentalID", document.getElementById("rentalID").value);
        if (data.get("rentalID") === "") {
            window.alert("You must especify the rental ID")
        } else {
            var res = await axios.get("http://localhost:8090/rental/getByID",
                { params: { rentalID: data.get('rentalID') } })
            if (Object.keys(res.data).length === 0) {
                window.alert("The rental ID is not valid")
            } else {
                this.setState({
                    rentals: [res.data]
                })
            }
        }
    }

    onSubmitUserID = async e => {
        e.preventDefault();
        var data = new FormData();
        data.append("userID", document.getElementById("userID").value);
        if (data.get("userID") === "") {
            window.alert("You must especify the user email")
        } else {
            var res = await axios.get("http://localhost:8090/rental/getPerClient",
                { params: { email: data.get('userID') } })
            if (Object.keys(res.data).length === 0) {
                window.alert("This user is not registered")
            } else {
                this.setState({
                    rentals: res.data
                })
            }
        }
    }

    editRental = async (rentalID) => {
        var res1 = await axios.get("http://localhost:8090/rental/getByID",
            {
                params: {
                    rentalID: rentalID,
                }
            })
        var res2 = await axios.get("http://localhost:8090/cars/getByID",
            {
                params: {
                    id: res1.data.carID
                }
            })
        this.setState({
            rental: res1.data,
            car: res2.data,
            show: true,
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    canceling = async () => {
        var data = new FormData();
        data.append("email", this.state.rental.email);
        data.append("password", document.getElementById("password").value);
        var date = new Date();
        var currentDate = date.getFullYear()+"-"+date.getMonth() + 1+"-"+ date.getDate()
        if (currentDate >= this.state.rental.startTime) {
            window.alert("Rentals can only be cancelled up to 1 day before the start date.")
        } else {
            if (this.state.rental.rentalStatus === "CANCELED") {
                window.alert("This rental is already canceled")
            } else {
                if (data.get('password') === '') {
                    window.alert("If you want to cancel a rental, you must type the password");
                } else {
                    var res = await axios.post("http://localhost:8090/client/authenticate", {}, {
                        headers: {
                            email: data.get('email'),
                            password: data.get('password'),
                        }
                    })
                    if (Object.keys(res.data).length === 0) {
                        window.alert("The password is incorrect. Please try again")
                    } else {
                        res = await axios.post("http://localhost:8090/rental/cancel", {}, {
                            headers: {
                                rentalID: this.state.rental.rentalID
                            }
                        })
                        window.alert("Rental canceled successfully")
                    }
                }
            }
        }
    }


    render() {
        return (
            <div className="container autosize">
                <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit the rental</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            <>
                                <table className="table table-bordered table-striped table-secondary table-hover" style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Car Model</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End date</th>
                                            <th scope="col">Total price</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{this.state.car.model}</td>
                                        <td>{this.state.rental.startTime}</td>
                                        <td>{this.state.rental.endTime}</td>
                                        <td>{this.state.rental.totalPrice}</td>
                                        <td>{this.state.rental.rentalStatus}</td>
                                    </tbody>
                                </table>
                                <form>
                                    <div className="form-group">
                                        <label for="email">Type the password of the account used to rent this car</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter yor password" />
                                    </div>
                                </form>
                            </>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.canceling}>
                            Cancel the rental
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="row">
                    <div className="col-md-3 mt-4">
                        <div className="card card-body text-white bg-secondary mb-2">
                            <h3>
                                Get rental details
                            </h3>
                        </div>
                        <div className="card card-body text-white bg-secondary mb-2">
                            <form onSubmit={this.onSubmitRentalID}>
                                <div className="form-group">
                                    <label for="rentalID">By rental ID</label>
                                    <input type="text" className="form-control" id="rentalID" placeholder="Type the rental ID" />
                                </div>
                                <div className="container container-fluid">
                                    <button type="submit" className="btn btn-primary mt-3">Consult</button>
                                </div>
                            </form>
                        </div>
                        <div className="card card-body text-white bg-secondary mb-2">
                            <form onSubmit={this.onSubmitUserID}>
                                <div className="form-group mt-2">
                                    <label for="userID">By user email</label>
                                    <input type="text" className="form-control" id="userID" placeholder="Type the user email" />
                                </div>
                                <div className="container container-fluid">
                                    <button type="submit" className="btn btn-primary mt-3">Consult</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-9 mt-4">
                        <table className="table table-bordered table-striped table-secondary table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">RentalID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Start time</th>
                                    <th scope="col">End time</th>
                                    <th scope="col">Total price</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.rentals.map(rental => (
                                        <tr key={rental.rentalID} role='button' onDoubleClick={() => this.editRental(rental.rentalID)}>
                                            <td>{rental.rentalID}</td>
                                            <td>{rental.email}</td>
                                            <td>{rental.startTime}</td>
                                            <td>{rental.endTime}</td>
                                            <td>{rental.totalPrice}</td>
                                            <td>{rental.rentalStatus}</td>
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