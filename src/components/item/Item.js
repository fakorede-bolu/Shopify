import React, {Component} from 'react';


class Item extends Component {
     
    render() {
       const IncItem = this.props.Income.map((value, index) => {
           if (value.Type === 'inc' && value.Description !== '' && value.Value !== '') {
                return (
                    <div className="income__list" key={index}>
                        <div className="item clearfix" id="income-0"><div className="item__description">{value.Description}</div>
                            <div className="right clearfix">
                                <div className="item__value" >+ {value.Value}</div>
                                <div className="item__delete">
                                    <button className="item__delete--btn" onClick={()=> this.props.DeleteItem(value.Type, index)}><i className="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>
                    </div> 
   
            )} else {
                return value;
            }
       })
        const ExpItem = this.props.Expense.map((value, index) => {
            if (value.Type === 'exp' && value.Description !== '' && value.Value !== '') {
                return (
                    <div className="expenses__list" key={index}>
                        <div className="item clearfix" id="expense-0">
                            <div className="item__description">{value.Description}</div>
                            <div className="right clearfix">
                                <div className="item__value" >- {value.Value}</div>
                                <div className="item__percentage">21%</div>
                                <div className="item__delete">
                                    <button className="item__delete--btn" onClick={() => this.props.DeleteItem(value.Type, index)}><i className="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>        
                    </div>
                )} else {
                return value;
                }
        })

        return (
            <div className="bottom">
                <div className="container clearfix">
                    <div className="income">
                        <h2 className="icome__title">Income</h2>
                            {IncItem}
                    </div>

                    <div className="expenses">
                        <h2 className="expenses__title">Expenses</h2>
                            {ExpItem}
                    </div>    
                </div>            
            </div>
        )
    }
}

export default Item;