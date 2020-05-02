import React, {useEffect, useState} from 'react';
import LineChart from "./LineChart";
import ChildSelection from "../ChildSelection";

function Line({inputData, days, types}) {

    const [type, setType] = useState({})
    const updateType = (e) => {
        e.preventDefault()
        setType(p => ({
            ...p,
            [e.target.value]: !p[e.target.value]
        }))
    }
    useEffect(() => {

        setType({[types[0]]: true})
    }, [inputData, types])


    if (Object.keys(inputData).length < 1) return ('Loading...')
    return (
        <div className='barD'>

            <ChildSelection types={types} btnClick={updateType}/>

            <LineChart data={inputData} days={days} type={type}/>

        </div>
    );
}

export default Line;