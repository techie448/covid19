import React, {useEffect, useState} from 'react';
import Charts from "./Components/Charts/Charts";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loading from "./Components/loading";

function App() {
    const [count, setCount] = useState({})
    const [latestDataset, setLatestDataset] = useState({})
    const [source, setSource] = useState({})
    useEffect(() => {

        fetch('https://pomber.github.io/covid19/timeseries.json')
            .then((response) => response.json())
            .then(dataset => {
                const latestDataset = {}
                let count = {
                    confirmed: 0,
                    deaths: 0,
                    recovered: 0
                }

                for (const key in dataset) {
                    if (dataset.hasOwnProperty(key)) {
                        latestDataset[key] = dataset[key].filter((d, i, arr) => {
                            if ((i === arr.length - 1)) Object.keys(d).slice(1).forEach(a => count[a] += d[a])
                            let date = d.date.split("-");
                            d.date = new Date(date[0], date[1] - 1, date[2]);
                            return (i === arr.length - 1)
                        })
                    }

                }
                setCount(count)
                setLatestDataset(latestDataset)
                setSource(dataset)
            })


    }, [])
    if (Object.keys(source).length < 1) return <Loading/>
    return (
        <div className="App">
            <Header count={count}/>
            <Charts latestDataset={latestDataset} dataset={source}/>
            <Footer/>
        </div>
    );
}

export default App;
