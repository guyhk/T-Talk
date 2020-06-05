import React, { Component } from 'react';


function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6);
    });
  }
  
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
 
  

export class Cube extends Component {

    render() {
        return (
          
          <div className="cube_inner_container">
             
            <div className="dice" onClick={rollDice}>
              <ol className="die-list even-roll" data-roll="1" id="die-1">
                <li className="die-item" data-side="1"></li>
                <li className="die-item" data-side="2"></li>
                <li className="die-item" data-side="3"></li>
                <li className="die-item" data-side="4"></li>
                <li className="die-item" data-side="5"></li>
                <li className="die-item" data-side="6"></li>
              </ol>
              <h4  style={{textAlign:"center"}}>לחץ על הקובייה להטלה</h4>
            </div>
            </div>
        );
    }
} 