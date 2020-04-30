import React, {useEffect, useState} from 'react';
import WorldMap from "./WorldMap";
import land from '../../world.json'

function World({inputData}) {

    const [data, setData] = useState({})
    const [type, setType] = useState('confirmed')
    useEffect(() => {
        setData(inputData)
    }, [inputData, type])

    if (Object.keys(data).length < 1) return ('Loading...')
    return (
        <div>
            <h1> World Map Geo</h1>
            <WorldMap data={data} world={land} type={type}/>
        </div>
    );
}

export default World;