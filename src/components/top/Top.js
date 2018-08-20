import React from "react";
import Navigation from "../Navigation/Navigation"

const Top = ({totalInc, totalExp, onRouteChange, name, isSignedIn, toggleModal}) => {
       
        let budget;
        if (totalInc !== 0 && totalInc > totalExp) {
            budget = `+${totalInc - (totalExp)}`
        } else if (totalInc < totalExp) {
            budget = `${totalInc - (totalExp)}`
        } else if (totalExp === 0 && totalInc === 0) {
            budget = `0.00`
        } else if (totalExp > totalInc) {
            budget = `-${totalExp}`
        }

      
        let TotalInc;
        if (totalInc === 0) {
            TotalInc = `0.00`
        } else {
            TotalInc = totalInc
        }

        let TotalExp;
        if (totalExp === 0) {
            TotalExp = `0.00`
        } else {
            TotalExp = totalExp
        }

        let percentage;
        if (totalInc === 0 || totalExp > totalInc) {
            percentage = `0%`
         } else if (totalInc > totalExp) {
            percentage = `${Math.round((totalExp / totalInc) * 100)} %`;
        }
        
       

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // const day = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        
        return (
            <div>
                <div className="top">
                    <div className="top-nav">
                        <Navigation onRouteChange={onRouteChange} name={name} isSignedIn={isSignedIn} toggleModal={toggleModal}/>
                    </div>
                    <div className="budget">
                        <div className="budget__title">
                            Available Budget in <span className="budget__title--month">{month}, {year}</span>:
                        </div>

                        <div className="budget__value"> {budget} </div>

                        <div className="budget__income clearfix">
                            <div className="budget__income--text">Income</div>
                            <div className="right">
                                <div className="budget__income--value">+{ TotalInc } </div>
                                <div className="budget__income--percentage">&nbsp;</div>
                            </div>
                        </div>
                        <div className="budget__expenses clearfix">
                            <div className="budget__expenses--text">Expenses</div>
                            <div className="right clearfix">
                                <div className="budget__expenses--value">-{ TotalExp }</div>
                                <div className="budget__expenses--percentage">{percentage}</div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        )
}

export default Top;
