import React, {useEffect, useRef, useState} from 'react';
import LineChart from "./LineChart";
import Loading from "../../loading";

function Line({inputData, days, types, classes}) {
    const lineDRef = useRef()
    const [type, setType] = useState({})
    const updateType = (e) => {
        e.preventDefault()
        setType(p => ({
            ...p,
            [e.target.value]: !p[e.target.value]
        }))
    }
    useEffect(() => {
        setType({
            [types[0]]: true,
            [types[1]]: false,
            [types[2]]: false
        })
    }, [inputData, types])


    if (Object.keys(inputData).length < 1) return <Loading/>
    return (
        <div className='lineD' ref={lineDRef}>
            <div className={'buttonsGrp'}>
                <div className={'buttons'}>
                    {Object.keys(type).map(b => (
                            <button className={type[b] ? classes[b] : 'A'} onClick={updateType} value={b}
                                    key={b}>{b}</button>
                        )
                    )}
                </div>
            </div>
            <LineChart data={inputData} days={days} type={type} classes={classes}/>

        </div>
    );
}

export default Line;