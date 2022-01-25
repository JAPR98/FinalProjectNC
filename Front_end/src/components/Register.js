import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    onSubmit = async e => {
        e.preventDefault();
        var data = new FormData();
        data.append("email", document.getElementById("email").value);
        data.append("password", document.getElementById("password").value);

        if (data.get('email') === "" || data.get('password') === "") {
            window.alert('You must enter an email and a password');
        } else {
            var res = await axios.get("http://localhost:8090/client/find",
                { params: { email: data.get('email') } })
            if (Object.keys(res.data).length !== 0) {
                window.alert("This user is already registered")
            } else {
                var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                if (!emailRegex.test(data.get("email"))) {
                    window.alert("Please provide a valild email address");
                } else {
                    res = await axios.post("http://localhost:8090/client/register", {}, {
                        headers: {
                            email: data.get('email'),
                            password: data.get('password'),
                        }
                    })
                    if (Object.keys(res.data) !== 0) {
                        window.alert("User registered successfully!")
                    } else {
                        window.alert("Something went wrong")
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="card card-body text-white bg-secondary mx-auto" style={{ width: '40%' }}>
                    <h3>
                        User registration
                    </h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" onSubmit={this.onSubmit}>
                            <label for="email">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter your email address" />
                        </div>
                        <div className="form-group mb-4 mt-2">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                        </div>
                        <div className="container container-fluid">
                            <button type="submit" className="btn btn-primary mt-3">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };
}
