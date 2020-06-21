import React, { Component, FormEvent, ChangeEvent } from 'react'
import DiceScore from './DiceScore'

interface Props { }

interface State {
    username: string,
    rollHistory:Array<{
        rollResults: Array<number>,
        timestamp: number
    }>,
    diceAmount: number
}

class DiceBoard extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props)
        this.state = {
            username: 'HardcodedUsername',
            rollHistory: [{
                rollResults: Array(), 
                timestamp: 0
            }],
            diceAmount: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createDiceScore(index: number) {
        const currentRoll = this.state.rollHistory[index]
        const username = this.state.username

        if(currentRoll.rollResults.length === 0 || currentRoll.timestamp === 1) {
            return
        }

        return <DiceScore 
                    timestamp={currentRoll.timestamp}
                    username={username}
                    rollResults={currentRoll.rollResults} />
    }

    rollDice(min: number,  max: number): number {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
        
        return randomNumber
    }

    handleChange(event:ChangeEvent<HTMLInputElement>){
        const newDiceAmount = Number(event.target.value)
        this.setState({
          diceAmount: newDiceAmount
        })
    }

    handleSubmit(event:FormEvent) {
        const rollResults = this.state.rollHistory.slice()
        const diceAmount = this.state.diceAmount
        const newDiceRolls = Array(diceAmount)

        for(let i = 0; i < diceAmount; i++){
            newDiceRolls.push(this.rollDice(1,6))
        }
        
        rollResults.push({
            rollResults: newDiceRolls,
            timestamp: Date.now(),
        })

        this.setState({
            rollHistory: rollResults,
        })

        event.preventDefault()
    }

    render(){       
        const pastRolls = this.state.rollHistory

        if(this.state.username !== null){

            const rolls = pastRolls.map( (pastRoll, index) => {
                return (
                    this.createDiceScore(index)
                )
            })

            return(
                <div className="game-board">
                    <div className="chat"><u>Score board</u>
                        <br />
                        { rolls }
                    </div>
                    <div className="control"><u>Player control</u>
                        <br />
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                D6 amount: <input value={this.state.diceAmount} type="number" onChange={this.handleChange} min="1"/>
                            </label>
                            <input type="submit" value="Roll" />
                        </form>
                    </div>
                </div>
            )
        }
        return(
            <div>Unknown user</div>
        )
    }
}

export default DiceBoard