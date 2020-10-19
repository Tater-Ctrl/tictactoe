import React from 'react';
import './tictac.css';

let switchPlayer = true;
let gameOver = false;
let crossArray = [];
let circleArray = [];
let clickedArray = [];
let boxFull = 0;
const boxArray = document.getElementsByClassName('gameBox');

export class TicTac extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: 'Tic Tac Tåsan',
            restart: 'Restart',
            circleScore: 0,
            crossScore: 0
        };
    }
    handleClick = (value) => {
        if(switchPlayer && !clickedArray.includes(value) && !gameOver) {
            switchPlayer = !switchPlayer;
            boxArray[value].innerHTML = `<img src=${require('./cross.png')} />`;
            crossArray.push(value);
            clickedArray.push(value);
            boxFull++;
            this.winCheck();
        } else if(!switchPlayer && !clickedArray.includes(value) && !gameOver) {
            switchPlayer = !switchPlayer;
            boxArray[value].innerHTML = `<img src=${require('./circle.png')} />`;
            circleArray.push(value);
            clickedArray.push(value);
            boxFull++;
            this.winCheck();
        }
    }

    winCheck = () => {
        crossArray.sort();
        circleArray.sort();
        winRequirements.forEach(element => {
            var crossWin = 0;
            var circleWin = 0;
            for( let i = 0; i < crossArray.length; i++) {
                if(crossArray.includes(element[i])) {
                    crossWin++;
                }

                if(crossWin > 2) {
                    gameOver = true;
                    this.setState({headline: "Cross Wins!"});
                    this.setState({restart: 'Play Again?'});
                    this.setState({crossScore: this.state.crossScore + 1});
                    return
                }
            }
            for( let i = 0; i < circleArray.length; i++) {
                if(circleArray.includes(element[i])) {
                    circleWin++;
                }
                
                if (circleWin > 2) {
                    gameOver = true;
                    this.setState({headline: "Circle Wins!"})
                    this.setState({restart: 'Play Again?'});
                    this.setState({circleScore: this.state.circleScore + 1});
                    return
                } 
            }
            if(boxFull > 8 && !gameOver) {
                this.setState({headline: "It's a Draw!"});
            }
        });
    }
    resetGame = () => {
        switchPlayer = true;
        this.setState({headline: "Tic Tac Tåsan"});
        this.setState({restart: 'Restart'});
        gameOver = false;
        for( let i = 0; i < boxArray.length; i++) {
            boxArray[i].innerHTML = '';
        }
        circleArray = [];
        crossArray = [];
        clickedArray = [];
        boxFull = 0;
    }
    resetScore = () => {
        this.setState({crossScore: 0});
        this.setState({circleScore: 0});
    }

    render() {
        return(
            <div className="main">
                <h3>{this.state.headline}</h3>
                <table>
                    <thead>
                        <tr className="topRow">
                            <td className="gameBox" onClick={() => this.handleClick(0)}></td>
                            <td className="gameBox" onClick={() => this.handleClick(1)}></td>
                            <td className="gameBox" onClick={() => this.handleClick(2)}></td>
                        </tr>
                        <tr className="middleRow">
                            <td className="gameBox" onClick={() => this.handleClick(3)}></td>
                            <td className="gameBox" onClick={() => this.handleClick(4)}></td>
                            <td className="gameBox" onClick={() => this.handleClick(5)}></td>
                        </tr>
                        <tr className="bottomRow">
                            <td className="gameBox" onClick={() => this.handleClick(6)}></td>
                            <td className="gameBox" onClick={() => this.handleClick(7)}></td>
                            <td className="gameBox" onClick={() => this.handleClick(8)}></td>
                        </tr>
                    </thead>
                </table>
                <button onClick={this.resetGame}>{this.state.restart}</button>
                <table className="scoreboard">
                    <thead>
                        <tr>
                            <td colSpan="2">Scoreboard</td>
                        </tr>
                        <tr>
                            <th>X</th>
                            <th>O</th>

                        </tr>
                        <tr>
                            <td>{this.state.crossScore}</td>
                            <td>{this.state.circleScore}</td>
                        </tr>
                    </thead>
                </table>
                <button onClick={this.resetScore}>Reset Score</button>
            </div>
        )
    }
}

const winRequirements = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

