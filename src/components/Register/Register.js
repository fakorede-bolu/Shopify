import React, { Component } from 'react';
import bolu from "./bolu.jpeg";
import './Register.css';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailRegister = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordRegister = (event) => {
        this.setState({ password: event.target.value })
    }

    onNameRegister = (event) => {
        this.setState({ name: event.target.value })
    }

    onSubmitButton = () => {
        if (this.state.email !== '' && this.state.name !== '' && this.state.password !== '') {
            fetch('http://localhost:8080/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            }).then(response => response.json())
                .then(user => {
                    if (user.userid) {
                        this.props.newUser(user)
                        this.props.onRouteChange('Home')
                    }
                })
        }
       
    }
    render() {
        return (
            <div className="loginBox">
                <div className="glass">
                    <img src={bolu} alt="user" className="user"/>
                    <h3 className="user-header">Register</h3>
                    <div>
                        <div className="inputBox">
                            <input type="text" name="" placeholder="Name" onChange={this.onNameRegister}/>
                        </div>
                        <div className="inputBox">
                            <input type="email" name="" placeholder="Email" onChange={this.onEmailRegister}/>
                        </div>
                        <div className="inputBox">
                            <input type="password" name="" placeholder="Password" onChange={this.onPasswordRegister}/>
                        </div>
                            <input type="submit" value="Register" onClick={this.onSubmitButton}/>
                    </div>
                    <div className="footer">
                        <span className="footer-qed">Already have an account?</span> 
                        <button type="submit" value="Login" onClick={() => { this.props.onRouteChange('SignIn')}} className="signin"> Login </button>
                    </div>
                </div>
            </div>
        )
    }
}
