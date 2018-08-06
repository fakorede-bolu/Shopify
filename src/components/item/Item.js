import React, {Component} from 'react'


class Item extends Component {
    render() {

       const IncItem = this.props.Income.map((value, index) => {
            return (
                <div className="income__list" key={index}>
                    <div className="item clearfix" id="income-0"><div className="item__description">{value.description}</div>
                        <div className="right clearfix">
                            <div className="item__value" >+{value.value}</div>
                            <div className="item__delete">
                                <button className="item__delete--btn" onClick={() => this.props.DelIncItem(value.incid)}><i className="ion-ios-close-outline"></i>Del</button>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        })
        const ExpItem = this.props.Expense.map((value, index) => {
            return (
                <div className="expenses__list" key={index}>
                    <div className="item clearfix" id="expense-0">
                        <div className="item__description">{value.description}</div>
                        <div className="right clearfix">
                            <div className="item__value" >- {value.value}</div>
                            <div className="item__percentage">{value.percentage}%</div>
                            <div className="item__delete">
                                <button className="item__delete--btn" onClick={() => this.props.DelExpItem(value.expid)}><i className="ion-ios-close-outline"></i>del</button>
                            </div>
                        </div>
                    </div>        
                </div>
            )
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