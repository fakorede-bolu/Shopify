import React, { Component } from 'react';
import './App.css';
import Top from './components/top/Top';
import Input from './components/input/Input';
import Item from './components/item/Item';

class App extends Component {
  constructor() {
    super()
    this.state = {
      budgetList: {
        inc: [],
        exp: []
      },
      type: 'inc',
      description: '',
      value: '',
      inc: 0,
      exp: 0
    }
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

  componentDidMount() {
    fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(console.log)
  }
  AddIncItem = () => {
    fetch('http://localhost:8080/incitem', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: (this.state.budgetList.inc.length - 1) + 1,
        type: this.state.type,
        description: this.state.description,
        value: this.state.value
      })
    }).then(response => response.json())
      .then(item => {
        console.log(item);
        this.state.budgetList.inc.push({
          Id: item.Id, // 6 -1
          Type: item.Type,
          Description: item.Description,
          Value: item.Value
        })
      })
      
      console.log(this.state.budgetList.inc);
   
  }
   

  AddExpItem = () => {
      let percentage;

      if (this.state.inc === 0) {
        percentage = 0
      } else {
        percentage = Math.round((this.state.value / this.state.inc) * 100)
      }
      
    fetch('http://localhost:8080/expitem', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: (this.state.budgetList.exp.length - 1) + 1,
        type: this.state.type,
        description: this.state.description,
        value: this.state.value,
        percentage: percentage
      })
    }).then(response => response.json())
      .then(item => {
        console.log(item);
        this.state.budgetList.exp.push({
          Id: item.Id, // 6 -1
          Type: item.Type,
          Description: item.Description,
          Value: item.Value,
          Percentage: item.Percentage
        })
      })
      this.setState({ type: "inc", description: "", value: "" })

      console.log(this.state.budgetList.exp);
  }
  onSubmit = () => {
    if (this.state.description !== '' && this.state.value !== '') {
      if (this.state.type === 'inc') {
        this.AddIncItem()
      } else {
        this.AddExpItem()
      }
      this.Inctotals();
      this.Exptotals();
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
        type: this.state.type,
        description: this.state.description,
        value: this.state.value
      })
    }).then(response => response.json())
    .then(totals => {
      console.log(totals);
      this.setState({inc: totals})})
  }
  Exptotals = () => {
    fetch('http://localhost:8080/expense', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: this.state.type,
        description: this.state.description,
        value: this.state.value
      })
    }).then(response => response.json())
      .then(totals => {
        console.log(totals);
        this.setState({ exp: totals })
      })
  }


  DelIncItem = (id) => {
    const ids = this.state.budgetList.inc.map((item) => {
      return (item.Id, item.Value)
    })
    const index = ids.indexOf(id);
    fetch('http://localhost:8080/incdelete', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: index
      })
    }).then(response => response.json())
      .then(value => this.setState({ inc: value }))
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

  render() {
    return (
      <div className="App">
        <Top totalInc = {this.state.inc} totalExp = {this.state.exp} budget = {this.state.budget} percent = {this.state.percentage} />
        <Input value = {this.state.value} type = {this.state.type} description = {this.state.description} typeChange = {this.typeChange} desChange = {this.desChange} valChange = {this.valChange} onSubmit = {this.onSubmit} onKeyPress = {() => this.keyPress}/>
        <Item Income = {this.state.budgetList.inc} Expense = {this.state.budgetList.exp} DelIncItem = { this.DelIncItem} DelExpItem = { this.DelExpItem}/>
      </div>
    );
  }
}

export default App;
