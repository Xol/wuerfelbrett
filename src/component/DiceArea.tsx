import React, { Component } from 'react'

import w61 from '../static/w6-1.svg';
import w62 from '../static/w6-2.svg';
import w63 from '../static/w6-3.svg';
import w64 from '../static/w6-4.svg';
import w65 from '../static/w6-5.svg';
import w66 from '../static/w6-6.svg';

interface Props {
    rollResults: Array<number>
}

function DiceArea(props:Props) {
    const diceW6 = [w61, w62, w63, w64, w65, w66]
    const results = props.rollResults.map((rollResult, index) => {
        return <img src={ diceW6[rollResult-1] } className="dice" alt="W6" />
    })

    return <span> { results } </span>
    
}

export default DiceArea