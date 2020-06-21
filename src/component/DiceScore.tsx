import React, { Component } from 'react'

import w61 from '../static/w6-1.svg';
import w62 from '../static/w6-2.svg';
import w63 from '../static/w6-3.svg';
import w64 from '../static/w6-4.svg';
import w65 from '../static/w6-5.svg';
import w66 from '../static/w6-6.svg';

interface Props {
    timestamp: number,
    username: string,
    sides: number
}

function DiceScore(props:Props) {
    const diceW6 = [w61, w62, w63, w64, w65, w66]
    
    const readableTimeStamp = new Intl.DateTimeFormat('de-DE', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(props.timestamp)

    return(
        <div>
            {readableTimeStamp.split(' ')[1]} { props.username } rolls: <img src={ diceW6[props.sides-1] } className="dice" alt="W6" />
        </div>        
    )
}

export default DiceScore