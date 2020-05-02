import React from 'react';

function Info({endDate, count}) {
    return (
        <div> emojiss
            total cases : {count.confirmed}
            recovered : {count.recovered}
            deaths : {count.deaths}
            currently infected : {count.confirmed - count.recovered - count.deaths}
        </div>
    );
}

export default Info;