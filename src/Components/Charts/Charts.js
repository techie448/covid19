import React, {useEffect, useState} from 'react';
import Race from "./Race/Race";
import Line from "./Line/Line";
import Bar from "./Bar/Bar";
import World from "./World/World";
import Selection from "./Builder Components/Selection";
import Loading from "../loading";

function Charts({dataset, latestDataset}) {

    const [data, setData] = useState({})
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [country, setCountry] = useState(null)
    const [days, setDays] = useState(0)
    const [maxDays, setMaxDays] = useState(0)
    const [countries, setCountries] = useState([])
    const [types, setTypes] = useState([])
    const [classes] = useState({
        'confirmed': 'blueBtn',
        'deaths': 'redBtn',
        'recovered': 'greenBtn'
    })

    useEffect(() => {
        const defaultCountry = 'Canada'


        const defaultCountryObj = dataset[defaultCountry];
        const totalDays = defaultCountryObj.length
        const startDate = defaultCountryObj[0].date
        const endDate = defaultCountryObj[totalDays - 1].date
        setTypes(Object.keys(defaultCountryObj[0]).slice(1))
        setStartDate(startDate)
        setEndDate(endDate)
        setData(dataset)
        setCountry(defaultCountry)
        setDays(20)
        setMaxDays(totalDays)
        setCountries(Object.keys(dataset))

    }, [dataset])
    const updateCountry = (e) => setCountry(e.target.value)

    const updateDays = (e) => setDays(e.target.value)


    if (Object.keys(data).length < 1) return <Loading/>
    return (
        <div className='charts'>
            <Race inputData={data} startDate={startDate} endDate={endDate} types={types}/>
            <div className='lbD'>
                <div className={'titleWrapper'}>
                    <div className={'title'}>
                        <div className={'text'}>Historical Data</div>
                    </div>
                    <div className={'buttonsGrp'}>
                        <Selection updateCountry={updateCountry} updateDays={updateDays} country={country} days={days}
                                   countries={countries} maxDays={maxDays}/></div>
                </div>
                <div className='libDCharts'>
                    <Line inputData={data[country]} days={days} types={types} classes={classes}/>
                    <Bar inputData={data[country]} days={days} types={types} classes={classes}/>
                </div>
            </div>

            <World inputData={latestDataset} types={types}/>
        </div>
    );
}

export default Charts;