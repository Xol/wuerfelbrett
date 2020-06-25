import React from 'react'
import DiceArea from './DiceArea'

interface Props {
    timestamp: number,
    username: string,
    rollResults: Array<DieResult>
}

interface DieResult {
    identifier: string,
    result: number
}

function DiceScore(props:Props) {   
    const time = new Intl.DateTimeFormat('de-DE', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})
                        .format(props.timestamp)
                        .split(' ')[1]

    return(
        <div> { time } { props.username } rolls: <DiceArea rollResults={ props.rollResults } /> </div>        
    )
}

export default DiceScore