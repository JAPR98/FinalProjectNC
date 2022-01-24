import React, { Component } from 'react';
import axios from 'axios';

export default class Review extends Component {

    state = {
        rentals: []
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
                { params: { email: data.get('userID') }})
            if (Object.keys(res.data).length === 0) {
                window.alert("This user is not registered")
            } else {
                this.setState({
                    rentals: res.data
                })
            }
        }
    }

    render() {
        return (
            <div className="container autosize">
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
                                        <tr key={rental.rentalID}  role='button'>
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