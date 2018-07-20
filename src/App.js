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

  AddItem = () => {

    if (this.state.type === 'inc') {
      this.state.budgetList.inc.push({
        Id:  (this.state.budgetList.inc.length - 1) + 1,
        Type: this.state.type,
        Description: this.state.description,
        Value: this.state.value
      })
      this.setState({ type: "inc", description: "", value: "" })

      console.log(this.state.budgetList.inc);
   
    } else if (this.state.type === 'exp') {
      this.state.budgetList.exp.push({
        Id: (this.state.budgetList.exp.length-1) + 1,
        Type: this.state.type,
        Description: this.state.description,
        Value: this.state.value
      })
      this.setState({ type: "inc", description: "", value: "" })

      console.log(this.state.budgetList.exp);
    }
   
  }

  
  onSubmit = () => {
    this.AddItem();
    this.Inctotals();
    this.Exptotals()
  }

  keyPress = (event) => {
    if (event.keyCode === 13) {
      // console.log('value', event.target.value);
      this.AddItem();
      this.totals()
    }
  }
  

  Inctotals = () => {
    let sum = 0;
    
     this.state.budgetList.inc.map((increase) => {
        return (sum += increase.Value)
      })
      this.setState({inc: sum})
    } 

  Exptotals = () => {
    let sum = 0;
      this.state.budgetList.exp.map((increase) => {
        return (sum += increase.Value)
      })
    this.setState({ exp: sum })
    }
     

  DelIncItem = (id) => {
    const ids = this.state.budgetList.inc.map((item) => {
      return item.Id
    })
    const index = ids.indexOf(id);
    this.state.budgetList.inc.splice(index, 1)
    this.Inctotals();
  }

  DelExpItem = (id) => {
    const ids = this.state.budgetList.exp.map((item) => {
      return item.Id
    })
    const index = ids.indexOf(id);
    this.state.budgetList.exp.splice(index, 1)
    this.Exptotals();
  }
  
  render() {
    return (
      <div className="App">
        <Top totalInc={this.state.inc} totalExp={this.state.exp} budget={this.state.budget} percent = {this.state.percentage}/>
        <Input value = {this.state.value} type = {this.state.type} description = {this.state.description} typeChange = {this.typeChange} desChange = {this.desChange} valChange = {this.valChange} onSubmit = {this.onSubmit} onKeyPress = {this.keyPress}/>
        <Item Income={this.state.budgetList.inc} Expense={this.state.budgetList.exp} DelIncItem = {this.DelIncItem} DelExpItem={this.DelExpItem}/>
      </div>
    );
  }
}

export default App;
