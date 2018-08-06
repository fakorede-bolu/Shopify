import React, {Component} from 'react';

class Input extends Component {
    
    
    render() {
        return (
            <div className="bottom">
                <div className="add">
                    <div className="add__container" >
                        <select className="add__type" value={this.props.type}  onChange={this.props.typeChange}>
                            <option value="inc" >+</option>
                            <option value="exp">-</option>
                        </select>
                        <input type="text" className="add__description" placeholder="Add description" onChange={this.props.desChange} value={this.props.description} />
                        <input type="number" className="add__value" placeholder="Value" onChange={this.props.valChange} value={this.props.value} />
                        <button type="submit" className="add__btn" onClick={this.props.onSubmit} >Submit</button>
                        
                    </div>
                </div> 
            </div>
        )
    }
}

export default Input;