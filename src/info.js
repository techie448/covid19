import React from 'react';
import {ReactComponent as Confirmed} from "./virus.svg";
import {ReactComponent as Fight} from "./fight.svg";
import {ReactComponent as Recovered} from "./medical.svg";
import {ReactComponent as Death} from "./death.svg";
import CountUp from 'react-countup';

function Info({endDate, count}) {
    return (
        <div className="info">
            <div className='c out'>
                <Confirmed/>
                <p><CountUp end={count.confirmed}/></p>
                <p>Tested Positive</p>
                <div className='c box'></div>
            </div
            >
            <div className='r out'><Recovered/> <p><CountUp end={count.recovered}/></p> <p> Recovered</p>
                <div className='r box'></div>
            </div>

            <div className='d out'><Death/> <p><CountUp end={count.deaths}/></p> <p> Deaths</p>
                <div className='d box'></div>
            </div>

            <div className='c out'><Fight/><p><CountUp end={count.confirmed - count.recovered - count.deaths}/></p>
                <p>Fighting</p>

                <div className='box f'>
                    <div className='box r'></div>
                    <div className='box c'></div>
                    <div className='box d'></div>
                </div>
            </div>
        </div>
    );
}

export default Info;