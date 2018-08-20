import React from 'react';
import "./Navigation.css";
import Profileicon from '../Profile/Profileicon';

 const Navigation = ({onRouteChange, name, isSignedIn, toggleModal}) => {
    if (isSignedIn) {
        return (
            <div className="profile">
                <Profileicon onRouteChange={onRouteChange} name={name} toggleModal={toggleModal}/>
            </div>
        )
    }
    
}
    
export default Navigation;