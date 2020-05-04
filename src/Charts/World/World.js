import React, {useEffect, useState} from 'react';
import WorldMap from "./WorldMap";
import land from '../../world.json'
import ChildSelection from "../ChildSelection";

function World({inputData, types}) {

    const [data, setData] = useState({})
    const [type, setType] = useState(null)
    useEffect(() => {
        setData(inputData)
        setType(types[0])
    }, [inputData, types])
    const updateType = (e) => {
        e.preventDefault()
        setType(e.target.value)
    }
    if (Object.keys(data).length < 1) return ('Loading...')
    return (
        <div className='worldD'>
            <div>
                <ChildSelection types={types} btnClick={updateType} selected={type}/>
            </div>
            <WorldMap data={data} world={land} type={type}/>
        </div>
    );
}

export default World;