import React, {useEffect, useState} from 'react';
import RaceChart from "./RaceChart";
import useInterval from "../../Hooks/useInterval";

function Race({inputData, startDate, endDate}) {

    const [type, setType] = useState('confirmed')
    const [currDate, setCurrDate] = useState(startDate)
    const [begin, setBegin] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        if (!inputData || Object.keys(inputData).length < 1) return

        setData(Object.entries(inputData)
            .map(d => {
                return ({
                    country: d[0],
                    value: d[1].filter(d => {
                            return d.date.getTime() === currDate.getTime()
                        }
                    )[0][type]
                })
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 10))

    }, [currDate, type, inputData])

    useInterval(() => {
        if (begin && !(currDate.getTime() === endDate.getTime())) {
            setCurrDate(new Date(currDate.setDate(currDate.getDate() + 1)))
        }
    }, 1000)

    if (Object.keys(data).length < 1) return ('Loading...')
    return (
        <div className='raceD'>

            <RaceChart data={data} startDate={startDate} currDate={currDate}/>

        </div>
    );
}

export default Race;