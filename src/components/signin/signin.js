import React, { Component } from 'react';
import bolu from "./bolu.jpeg";
import './Signin.css';


export default class Signin extends Component {
    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }

    }


    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    saveAuthTokenSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    onSubmitSignIn = () => {
       
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
                if (user.userId && user.success === 'true') {
                    console.log(user.token);
                    this.saveAuthTokenSession(user.token)
                        fetch(`http://localhost:8080/profile/${user.userId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': user.token
                            }
                        })
                            .then(response => response.json())
                            .then(user => {
                                if (user && user.email) {
                                    this.props.newUser(user)
                                    this.props.onRouteChange('Home');
                                    fetch('http://localhost:8080/incomearrays', {
                                        method: 'post',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            userid: user.userid
                                        })
                                    }).then(response => response.json())
                                        .then(incomearrays => {
                                            this.props.incomeArrays(incomearrays)
                                        })
                                    fetch('http://localhost:8080/expensearrays', {
                                        method: 'post',
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
                
                    
                } //final for if statemnt 
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