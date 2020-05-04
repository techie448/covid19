import React, {useEffect, useState} from 'react';
import RaceChart from "./RaceChart";
import useInterval from "../../Hooks/useInterval";
import ChildSelection from "../ChildSelection";
import userEvent from "@testing-library/user-event";

function Race({inputData, startDate, endDate, types}) {

    // todo add buttons to change conf death etc. and add button to reset and replay race

    const [type, setType] = useState(null)
    const [currDate, setCurrDate] = useState(startDate)
    const [begin, setBegin] = useState(true)
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
            .slice(0, 10))

    }, [currDate, type, inputData])
    const updateType = (e) => {
        e.preventDefault()
        setType(e.target.value)
        setBegin(false)
        setCurrDate(startDate)

    }
    const resetGraph = (e) => {
        e.preventDefault()
        if (e.target.value === 'start') setBegin(true)
        if (e.target.value === 'pause') setBegin(false)
        if (e.target.value === 'reset') {
            setCurrDate(startDate)
            setBegin(false)
        }

    }

    useInterval(() => {
        if (begin && !(currDate.getTime() === endDate.getTime())) {
            setCurrDate(new Date(currDate.setDate(currDate.getDate() + 1)))
        }
    }, 1000)

    if (Object.keys(data).length < 1) return ('Loading...')
    return (
        <div className='raceD'>
            <div className={'buttonsGrp'}>

                <div className={'buttons'}>
                    <button onClick={resetGraph} value='reset' className={'redBtn'}>reset</button>
                    <button onClick={resetGraph} value='start' className={'greenBtn'}>start</button>
                    <button onClick={resetGraph} value='pause' className={'blueBtn'}>pause</button>
                </div>
                <ChildSelection types={types} btnClick={updateType} selected={type}/>

            </div>
            <RaceChart data={data} startDate={startDate} currDate={currDate}/>

        </div>
    );
}

export default Race;