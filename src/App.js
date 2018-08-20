import React, { Component } from 'react';
import './App.css';

import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Top from './components/Top/Top';
import Input from './components/Input/Input';
import Item from './components/Item/Item';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile'

const initialState = {
  type: 'inc',
  description: '',
  value: '',
  route: 'SignIn',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    userid: '',
    name: '',
    email: '',
    totalincome: 0,
    totalexpense: 0
  },
  budgetList: {
    inc: [],
    exp: []
  }
}


class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.userid) {
          fetch(`http://localhost:8080/profile/${data.userid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => response.json())
          .then(user => {
            if (user && user.email) {
              this.newUser(user)
              this.onRouteChange('Home');
              fetch('http://localhost:8080/incomearrays', { 
                  method: 'post',                        
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      userid: this.state.user.userid
                  })
              }).then(response => response.json())
                  .then(incomearrays => {
                      this.incomeArrays(incomearrays)
                  })
              fetch('http://localhost:8080/expensearrays', { 
                  method: 'post',                      
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userid: this.state.user.userid
                  })
              }).then(response => response.json())
                  .then(expensearrays => {
                      this.expenseArrays(expensearrays)
                  })
            }
          })
        }
      })
      .catch(console.log)
    }
  }

  newUser = (data) => {
    this.setState(Object.assign(this.state.user, {
        userid: data.userid,
        name: data.name,
        email: data.email,
        totalincome: parseInt(data.totalincome, 10),
        totalexpense: parseInt(data.totalexpense, 10)

    }))
  }

  incomeArrays = (data) => {
    this.setState(Object.assign(this.state.budgetList, {
      inc: data
    }))
  }

  expenseArrays = (data) => {
    this.setState(Object.assign(this.state.budgetList, {
      exp: data
    }))
  }

  typeChange = (e) => {
    this.setState({type: e.target.value})
  }

  desChange = (e) => {
    this.setState({description: e.target.value})
  }
  
  valChange = (e) => {
    this.setState({ value: parseFloat(e.target.value) })
  }

  AddIncItem = () => {
    fetch('http://localhost:8080/incitem', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: this.state.user.userid,
        incid: (this.state.budgetList.inc.length - 1) + 1,
        type: this.state.type,
        description: this.state.description,
        value: this.state.value
      })
    }).then(response => response.json())
      .then(item => {
        console.log(item);
        this.state.budgetList.inc.push({
          userid: item.userid,
          id: item.incid, // 6 -1
          type: item.type,
          description: item.description,
          value: item.value
        })
        this.Inctotals() 
      })
      
      console.log(this.state.budgetList.inc);
  }
   

  AddExpItem = () => {
      let percentage = 0;

      if (this.state.totalincome === 0) {
        percentage = 0
      } else {
        percentage = Math.round((this.state.value / this.state.user.totalincome) * 100)
      }
        
      
    fetch('http://localhost:8080/expitem', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: this.state.user.userid,
        expid: (this.state.budgetList.exp.length - 1) + 1,
        type: this.state.type,
        description: this.state.description,
        value: this.state.value,
        percentage: percentage
      })
    }).then(response => response.json())
      .then(item => {
        console.log(item);
        this.state.budgetList.exp.push({
          
          userid: item.userid,
          id: item.expid, 
          type: item.type,
          description: item.description,
          value: item.value,
          percentage: item.percentage
        })
        this.Exptotals()
      })
      
      this.setState({ type: "inc", description: "", value: "" })
      console.log(this.state.budgetList.exp)
  }
  onSubmit = () => {
    if (this.state.description !== '' && this.state.value !== '') {
      if (this.state.type === 'inc') {
        this.AddIncItem()
       
      } else if (this.state.type === 'exp') {
        this.AddExpItem();
        
      }
      this.setState({ type: "inc", description: "", value: "" })
    }
  }  

  Inctotals = () => {
    fetch('http://localhost:8080/income', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: this.state.user.userid
      })
    }).then(response => response.json())
    .then(totals => {
      console.log(totals);
      this.setState(Object.assign(this.state.user, { totalincome: totals }))
      fetch('http://localhost:8080/incomearrays', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userid: this.state.user.userid
        })
      }).then(response => response.json())
        .then(incomearrays => {
          this.incomeArrays(incomearrays)
        })
    })
  }
  Exptotals = () => {
    fetch('http://localhost:8080/expense', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: this.state.user.userid
      })
    }).then(response => response.json())
      .then(totals => {
        console.log(totals);
        this.setState(Object.assign(this.state.user, { totalexpense: totals }))
        fetch('http://localhost:8080/expensearrays', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userid: this.state.user.userid
          })
        }).then(response => response.json())
          .then(expensearrays => {
            this.expenseArrays(expensearrays)
          })
      })
  }


  DelIncItem = (id) => {
    const ids = this.state.budgetList.inc.map((item) => {
      return (item.incid)
    })
    console.log(id);
    const index = ids.indexOf(id);
    console.log(index);
    fetch('http://localhost:8080/incdelete', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        incid: id,
        userid: this.state.user.userid
      })
    }).then(response => response.json())
      .then(value => {
       let newIncTotal = this.state.user.inc - value;
        this.setState(Object.assign(this.state.user, { totalincome: newIncTotal }))
        this.Inctotals();  
      })
    this.state.budgetList.inc.splice(index, 1);
    
  }

  DelExpItem = (id) => {
    const ids = this.state.budgetList.exp.map((item) => {
      return (item.expid)
    })
    const index = ids.indexOf(id);
    fetch('http://localhost:8080/expdelete', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expid: id,
        userid: this.state.user.userid
      })
    }).then(response => response.json())
      .then(value => {
        let newExpTotal = this.state.user.exp - value;
        this.setState(Object.assign(this.state.user, { totalexpense : newExpTotal }))
        this.Exptotals();
      })
    this.state.budgetList.exp.splice(index, 1)
    
  }
  

   onRouteChange = (route) => {
     if (route === 'SignOut') {
       return this.setState(initialState)
     } else if (route === "Home") {
       this.setState({isSignedIn: true})
     }
    this.setState({route: route})
  }

  toggleModal = () => {
    this.setState(prevState => ({
      isProfileOpen: !this.state.isProfileOpen
    })) 
  }

  render() {
    return (
      <div>
        {this.state.route === 'Home' ?
          <div className="App">
            { this.state.isProfileOpen &&
              <Modal> 
                <Profile isProfileOpen={this.state.isProfileOpen} toggleModal = {this.toggleModal} user = {this.state.user}
                newUser = {this.newUser}/>  
              </Modal>
            }
            <Top totalInc={this.state.user.totalincome} totalExp={this.state.user.totalexpense} onRouteChange={this.onRouteChange} name  = {this.state.user.name} isSignedIn = {this.state.isSignedIn} toggleModal={this.toggleModal}/>
            <Input value={this.state.value} type={this.state.type} description={this.state.description} typeChange={this.typeChange} desChange={this.desChange} valChange={this.valChange} onSubmit={this.onSubmit} />
            <Item Income={this.state.budgetList.inc} Expense={this.state.budgetList.exp} DelIncItem={this.DelIncItem} DelExpItem={this.DelExpItem} />
          </div>
          : (
              this.state.route === 'SignIn' ?
              <Signin onRouteChange={this.onRouteChange} newUser={this.newUser} incomeArrays={this.incomeArrays} expenseArrays={this.expenseArrays}/>
              : <Register onRouteChange={this.onRouteChange} newUser={this.newUser} incomeArrays={this.incomeArrays}/>
            )
        }
      </div>
    );
  }
}

export default App;
