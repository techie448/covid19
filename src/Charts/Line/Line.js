import React, {useEffect, useState} from 'react';
import LineChart from "./LineChart";

function Line({inputData}) {

    const [data, setData] = useState({})
    const [type, setType] = useState('confirmed')
    const [days, setDays] = useState(40)
    useEffect(() => {
        setData(inputData)
    }, [inputData])


    if (Object.keys(inputData).length < 1) return ('Loading...')
    return (
        <div className='barD'>

            <LineChart data={data}/>

        </div>
    );
}

export default Line;