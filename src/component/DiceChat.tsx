import React, { Component } from 'react'
import DiceScore from './DiceScore'

interface Props { }

interface State {
    username: string,
    pastThrows:Array<{
        sides: number|null, 
        timestamp: number|null
    }>
}

class DiceChat extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props)
        this.state = {
            username: 'HardcodedUsername',
            pastThrows: [{
                sides: null, 
                timestamp: null
            }]
        }
    }

    createDiceScore(index: number) {
        const pastThrows = this.state.pastThrows[index]
        const username = this.state.username

        if(pastThrows.sides === null || pastThrows.timestamp === null) {
            return
        }

        return <DiceScore 
                    timestamp={pastThrows.timestamp}
                    username={username}
                    sides={pastThrows.sides} />
    }

    rollDice(min: number,  max: number): number {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
        
        return randomNumber
    }

    handleClick() {
        const addedThrows = this.state.pastThrows.slice();
        
        addedThrows.push({
            sides: this.rollDice(1,6),
            timestamp: Date.now()
        })

        this.setState({
            pastThrows: addedThrows,
        })
    }

    render(){       
        const pastThrows = this.state.pastThrows;

        if(this.state.username !== null){

            const throws = pastThrows.map( (pastThrows, index) => {
                return (
                    this.createDiceScore(index)
                )
            })

            return(
                <div className="game-board">
                    <div className="chat"><u>Score board</u>
                        <br />
                        { throws }
                    </div>
                    <div className="control"><u>Player control</u>
                        <br />
                        <button onClick = {() => this.handleClick()} >Roll dice</button>
                    </div>
                </div>
            )
        }
        return(
            <div>Unknown user</div>
        )
    }
    
}

export default DiceChat