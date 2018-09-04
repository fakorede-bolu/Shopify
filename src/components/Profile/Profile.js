import React from 'react';
import "./Profile.css";
import bolu from "./bolu.jpeg"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name
    }
  }

  onFormChange = (event) => {
    this.setState({name: event.target.value})
  }

  onProfileUpdate = (data) => {
    fetch(`http://localhost:8080/profile/${this.props.user.userid}`, {
      method: 'POST',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ formInput: data})
    }).then(response => {
      if (response.status === 200 || response.status === 304) {
        this.props.toggleModal();
        this.props.newUser({...this.props.user, ...data })
        
      }
      
    }).catch(console.log)
  }

  render() {
    const {user, toggleModal} = this.props;
    const {name} = this.state
    return (

 
      <div className="profile-modal">
        <div className="glass profile-box">
          <p className="cancel" onClick={toggleModal}>X</p>
          <div className="user-header">
            <img src={bolu} alt="user" className="user-img" />
            <p> {this.state.name} </p>
          </div>
          <div className="balance">
            <h3 className="balance-text">Your available balance is:</h3>
            <h4 className="balance-price"> {user.totalincome - user.totalexpense} </h4>
          </div>
          <div className="form">
            <div className="glass">
              <h3> Update your username here </h3>
              <div className="inputBox">
                <label htmlFor="user-name">Name:</label>
                <input type="text" name="user-name" placeholder={user.name} onChange={this.onFormChange} />
              </div>
              <div className="btn">
                <input type="submit" value="Update" className="Update"   onClick={() => this.onProfileUpdate({name})} />
                <input type="submit" value="Cancel" className="Skip" onClick={this.onSubmitSignIn} />
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Profile;