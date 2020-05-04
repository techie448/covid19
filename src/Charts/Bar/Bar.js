import React, {useEffect, useState} from 'react';
import BarChart from "./BarChart";
import ChildSelection from "../ChildSelection";

function Bar({inputData, days, types}) {

    const [data, setData] = useState({})
    const [type, setType] = useState(null)
    const updateType = (e) => {
        e.preventDefault()
        setType(e.target.value)
    }
    useEffect(() => {
        setData(inputData)
        setType(types[0])
    }, [types, inputData])


    if (Object.keys(inputData).length < 1) return ('Loading...')
    return (
        <div className='barD'>

            <ChildSelection types={types} btnClick={updateType} selected={type}/>

            <BarChart data={data} type={type} days={days}/>

        </div>
    );
}

export default Bar;