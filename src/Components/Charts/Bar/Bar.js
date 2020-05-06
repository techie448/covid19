import React, {useEffect, useState} from 'react';
import BarChart from "./BarChart";
import ChildSelection from "../Builder Components/ChildSelection";
import Loading from "../../loading";

function Bar({inputData, days, types, classes}) {

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


    if (Object.keys(inputData).length < 1) return <Loading/>
    return (
        <div className='barD'>
            <div className={'buttonsGrp'}>
                <ChildSelection types={types} btnClick={updateType} selected={type}/>
            </div>
            <BarChart data={data} type={type} days={days} selectedClass={classes[type]}/>

        </div>
    );
}

export default Bar;