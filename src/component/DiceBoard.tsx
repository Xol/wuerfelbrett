import React, { Component, FormEvent, ChangeEvent } from 'react'
import DiceScore from './DiceScore'

interface Props { }

interface State {
    username: string,
    rollHistory:Array<{
        rollResults: Array<DieResult>,
        timestamp: number
    }>,
    diceSelection: Array<Die>
}

interface Die {
    identifier: string,
    max: number,
    amount: number
}

interface DieResult {
    identifier: string,
    result: number
}

class DiceBoard extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props)
        this.state = {
            username: 'HardcodedUsername',
            rollHistory: [{
                rollResults: [], 
                timestamp: 0
            }],
            diceSelection: [{identifier:"D6",max:6,amount:0}, {identifier:"D10",max:10,amount:0}, {identifier:"D20",max:20,amount:0}]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createDiceScore(index: number) {
        const currentRoll = this.state.rollHistory[index]
        const username = this.state.username

        if(currentRoll.rollResults.length === 0 || currentRoll.timestamp === 0) {
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

    handleChange(event:ChangeEvent<HTMLInputElement>, index:number){
        const newDiceAmount = Number(event.target.value)
        const diceSelection = this.state.diceSelection.slice()
        const currentSelection = diceSelection[index]

        currentSelection.amount = newDiceAmount

        this.setState({
            diceSelection: diceSelection
        })
    }

    handleSubmit(event:FormEvent) {
        const rollResults = this.state.rollHistory.slice()
        const diceSelection = this.state.diceSelection.slice()
        const newDiceRolls = Array<DieResult>()

        for(let i = 0; i < diceSelection.length; i++){
            const currentDice = diceSelection[i]
            for(let j = 0; j < currentDice.amount; j++){
                newDiceRolls.push({identifier:currentDice.identifier, result:this.rollDice(1,currentDice.max)})
            }
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
        const diceSelection = this.state.diceSelection

        if(this.state.username !== null){

            const rolls = pastRolls.map( (pastRoll, index) => {
                return (
                    this.createDiceScore(index)
                )
            })

            const diceInputFields = diceSelection.map((die, index) => {
                return (
                    <label>
                        {die.identifier} amount: <input value={die.amount} type="number" min={0} onChange={(event) => this.handleChange(event,index)}></input>
                        <p />
                    </label>
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
                            {diceInputFields}
                            <br />
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