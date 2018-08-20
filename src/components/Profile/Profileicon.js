import React, { Component } from 'react';
import './Profileicon.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import bolu from "./bolu.jpeg";


export default class Profileicon extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <div >
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        <div className="avatar" >
                            <img src={bolu} alt="user" className="avatar-img" />
                            <p className="avatar-name"> {this.props.name}</p>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu right> 
                        <DropdownItem header><p>{`@ ${this.props.name}`}</p></DropdownItem>
                        <DropdownItem onClick={() => this.props.onRouteChange('SignOut')}>Signout</DropdownItem> 
                        <DropdownItem onClick={() => this.props.toggleModal()}>View Profile</DropdownItem> 
                    </DropdownMenu> 
                </Dropdown>
                
            </div>
        )
    }
}
