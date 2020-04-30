import React, {useEffect, useState} from 'react';
import dataset from './timeseries.json'
import Race from "./Charts/Race/Race";
import Line from "./Charts/Line/Line";
import Bar from "./Charts/Bar/Bar";
import World from "./Charts/World/World";

function Charts(props) {

    const [data, setData] = useState({})
    const [latestDataset, setLatestDataset] = useState({})
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)


    useEffect(() => {
        const defaultCountry = 'Canada'
        const latestDataset = {}

        for (const key in dataset) {
            latestDataset[key] = dataset[key].filter((d, i, arr) => {
                d.date = new Date(d.date)

                return (i === arr.length - 1)
            })


        }
        const defaultCountryObj = dataset[defaultCountry];
        const days = defaultCountryObj.length
        const startDate = defaultCountryObj[0].date
        const endDate = defaultCountryObj[days - 1].date
        setStartDate(startDate)
        setEndDate(endDate)
        setData(dataset)
        setLatestDataset(latestDataset)


    }, [])

    if (Object.keys(data).length < 1) return ('loading')
    return (
        <div className='charts'>
            <Race inputData={data} startDate={startDate} endDate={endDate}/>
            <Line inputData={data['Canada']}/>
            <Bar inputData={data['Canada']}/>
            <World inputData={latestDataset}/>
        </div>
    );
}

export default Charts;