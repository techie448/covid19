import React, {useEffect, useState} from 'react';
import Charts from "./Charts/Charts";
import dataset from './timeseries.json'
import Header from "./Header";

function App() {

    const [count, setCount] = useState({})
    const [latestDataset, setLatestDataset] = useState({})
    const [source, setSource] = useState({})

    useEffect(() => {
        const latestDataset = {}
        let count = {
            confirmed: 0,
            deaths: 0,
            recovered: 0
        }

        for (const key in dataset) {
            latestDataset[key] = dataset[key].filter((d, i, arr) => {
                if ((i === arr.length - 1)) Object.keys(d).slice(1).forEach(a => count[a] += d[a])
                let date = d.date.split("-");
                d.date = new Date(date[0], date[1] - 1, date[2]);
                return (i === arr.length - 1)
            })


        }
        setCount(count)
        setLatestDataset(latestDataset)
        setSource(dataset)

    }, [])
    if (Object.keys(source).length < 1) return ('loading')
    return (
        <div className="App">
            <Header count={count}/>
            <Charts latestDataset={latestDataset} dataset={source}/>
            <footer>
                Rishabh Kharbanda
                made with love ..technol..
            </footer>
        </div>
    );
}

export default App;
