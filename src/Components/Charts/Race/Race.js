import React, {useEffect, useState} from 'react';
import RaceChart from "./RaceChart";
import useInterval from "../../Cutom Hooks/useInterval";
import ChildSelection from "../Builder Components/ChildSelection";
import Loading from "../../loading";

function Race({inputData, startDate, endDate, types}) {

    const [type, setType] = useState(null)
    const [currDate, setCurrDate] = useState(endDate)
    const [begin, setBegin] = useState(false)
    const [data, setData] = useState({})
    useEffect(() => {
        setType(types[0])

    }, [types])
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
            .slice(0,10)
        )

    }, [currDate, type, inputData])
    const updateType = (e) => {
        e.preventDefault()
        setType(e.target.value)
    }
    const resetGraph = (e) => {
        e.preventDefault()
        if (e.target.value === 'start') {
            setCurrDate(startDate)
            setBegin(true)
        }
        else if (e.target.value === 'pause') setBegin(!begin)
        else if (e.target.value === 'end') {
            setCurrDate(endDate)
            setBegin(false)
        }

    }

    useInterval(() => {
        if (begin && !(currDate.getTime() === endDate.getTime())) {
            setCurrDate(new Date(currDate.setDate(currDate.getDate() + 1)))
        }
    }, 1000)

    if (Object.keys(data).length < 1) return <Loading/>
    return (
        <div className='raceD'>
            <div className={'titleWrapper'}>
                <div className={'title'}>
                    <div className={'text'}> World Race Chart</div>
                </div>
                <div className={'buttonsGrp'}>
                    <div className={'buttons'}>
                        <button onClick={resetGraph} value='start' className={'blueBtn'}>begin</button>
                        <button onClick={resetGraph} value='pause'>pause/play</button>
                        <button onClick={resetGraph} value='end' className={'redBtn'}>end</button>
                    </div>
                    <ChildSelection types={types} btnClick={updateType} selected={type}/>

                </div>
            </div>
            <RaceChart data={data} startDate={startDate} currDate={currDate}/>
            <div className='date'>{currDate.toDateString()}</div>
        </div>
    );
}

export default Race;