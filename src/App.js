import React, { Component } from 'react';
import './App.css';
import Register from './components/Register/Register';
import Signin from './components/signin/signin';
import Top from './components/top/Top';
import Input from './components/input/Input';
import Item from './components/item/Item';

class App extends Component {
  constructor() {
    super()
    this.state = {
      
      type: 'inc',
      description: '',
      value: '',
      route: 'SignIn',
      user: {
        userid: '',
        name: '',
        email: '',
        inc: 0,
        exp: 0
      },
      budgetList: {
        inc: [],
        exp: []
    },
    }
  }

  newUser = (data) => {
    this.setState(Object.assign(this.state.user, {
        userid: data.userid,
        name: data.name,
        email: data.email,
        inc: parseInt(data.totalincome, 10),
        exp: parseInt(data.totalexpense, 10)

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

  // componentDidMount() {
  //   fetch('http://localhost:8080/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }
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
          id: item.incid, // 6 -1
          type: item.type,
          description: item.description,
          value: item.value
        })
      })
      
      console.log(this.state.budgetList.inc);
   
  }
   

  AddExpItem = () => {
      let percentage = 0;

      if (this.state.inc === 0) {
        percentage = 0
      } else {
        percentage = Math.round((this.state.value / this.state.inc) * 100)
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
          id: item.expid, 
          type: item.type,
          description: item.description,
          value: item.value,
          percentage: item.percentage
        })
      })
      this.setState({ type: "inc", description: "", value: "" })

      console.log(this.state.budgetList.exp);
  }
  onSubmit = () => {
    if (this.state.description !== '' && this.state.value !== '') {
      if (this.state.type === 'inc') {
        this.AddIncItem()
        this.Inctotals();
      } else if (this.state.type === 'exp') {
        this.AddExpItem();
        this.Exptotals();
      }
       
      
      
      this.setState({ type: "inc", description: "", value: "" })
    }
  }  

  keyPress = (event) => {
    if (event.keyCode === 13) {
      // console.log('value', event.target.value);
      this.AddItem();
    }
  }
  

  Inctotals = () => {
    // let sum = 0;
    fetch('http://localhost:8080/income', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: this.state.user.userid
      })
    }).then(response => response.json())
    .then(totals => {
      console.log(totals);
      this.setState(Object.assign(this.state.user, { inc: totals }))
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
        this.setState(Object.assign(this.state.user, { exp: totals }))
      })
  }


  DelIncItem = (id) => {
    const ids = this.state.budgetList.inc.map((item) => {
      return (item.id)
    })
    const index = ids.indexOf(id);
    fetch('http://localhost:8080/incdelete', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: index
      })
    }).then(response => response.json())
      .then(value => {
       let newIncTotal = this.state.inc - value;
        this.setState({ inc: newIncTotal });
      })
    this.state.budgetList.inc.splice(index, 1)
    this.Inctotals();
  }

  DelExpItem = (id) => {
    const ids = this.state.budgetList.exp.map((item) => {
      return (item.Id)
    })
    const index = ids.indexOf(id);
    fetch('http://localhost:8080/expdelete', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: index
      })
    }).then(response => response.json())
      .then(value => this.setState({exp: value }))
    this.state.budgetList.exp.splice(index, 1)
    this.Exptotals();
  }
  
        //   const ids = this.state.budgetList.exp.map((item) => {
        //     return item.Id
        //   })
        //   const index = ids.indexOf(id);
        //   this.state.budgetList.exp.splice(index, 1)
        //   this.Exptotals();
        //}

   onRouteChange = (route) => {
    this.setState({route: route})
  }

  render() {
    return (
      <div>
        {this.state.route === 'Home' ?
          <div className="App">
            <Top totalInc={this.state.user.inc} totalExp={this.state.user.exp} />
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
