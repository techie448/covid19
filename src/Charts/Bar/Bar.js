import React, {useEffect, useState} from 'react';
import BarChart from "./BarChart";

function Bar({inputData}) {

    const [data, setData] = useState({})
    const [type, setType] = useState('confirmed')
    const [days, setDays] = useState(40)

    useEffect(() => {
        setData(inputData)
    }, [inputData])


    if (Object.keys(inputData).length < 1) return ('Loading...')
    return (
        <div className='barD'>

            <BarChart data={data} type={type} days={days}/>

        </div>
    );
}

export default Bar;