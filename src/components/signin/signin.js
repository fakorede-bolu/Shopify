import React, { Component } from 'react';
import bolu from "./bolu.jpeg";
import './signin.css';


export default class Signin extends Component {
    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }

    }

    // EVENT LISTNERS FOR EMAIL AND PASSWORD

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        // run a fetch to connect with the backend and normally, fetch does a get request by default but we want to do a post request, hence, we can pass a second parameter which is the object to fetch just to specify the kind of request we are making 
        fetch('http://localhost:8080/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                console.log(user);
                if (user.userid) {
                    this.props.newUser(user);
                    this.props.onRouteChange('Home');
                    fetch('http://localhost:8080/incomearrays', { //on the back end, both my income and expense will
                        method: 'post',                        // be one url of items
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userid: user.userid
                        })
                    }).then(response => response.json())
                        .then(incomearrays => {
                            this.props.incomeArrays(incomearrays)
                        })
                    fetch('http://localhost:8080/expensearrays', { //on the back end, both my income and expense will
                        method: 'post',                        // be one url of items
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userid: user.userid
                        })
                    }).then(response => response.json())
                        .then(expensearrays => {
                            this.props.expenseArrays(expensearrays)
                        })
                }
            })

    }
    render() {
        return (
            <div className="loginBox">
                <div className="glass">
                    <img src={bolu} alt="user" className="user" />
                    <h3 className="user-header">Welcome back!</h3>
                    <div>
                        <div className="inputBox">
                            <input type="email" name="" placeholder="Email" onChange={this.onEmailChange}/>
                        </div>
                        <div className="inputBox">
                            <input type="password" name="" placeholder="Password" onChange={this.onPasswordChange}/>
                        </div>
                        <input type="submit" value="Signin" onClick={this.onSubmitSignIn}/>
                    </div>
                    <div className="footer">
                        <span className="footer-qed">Do not have an account?</span>
                        <button type="submit" value="Login" onClick={() => { this.props.onRouteChange('Register') }} className="Register"> Register here! </button>
                    </div>
                </div>
            </div>
        )
    }
}