import React, {useEffect, useRef, useState} from 'react';
import useResizeObserver from "../../Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleLinear, scaleTime} from 'd3-scale'
import {extent, max} from 'd3-array'
import {timeFormat} from 'd3-time-format'
import {axisBottom, axisLeft} from 'd3-axis'
import {line} from 'd3-shape'

function LineChart({data, days, type}) {
    const svgRef = useRef()
    const xAxisRef = useRef()
    const yAxisRef = useRef()
    const wrapperDivRef = useRef()
    const dimensions = useResizeObserver(wrapperDivRef)

    const [lines, setLines] = useState({})


    useEffect(() => {
        const margin = {
            top: 20,
            bottom: 20,
            left: 50,
            right: 5
        }
        if (!dimensions) return
        const {width, height} = dimensions;

        const xScale = scaleTime().range([margin.left, width - margin.right]);
        const yScale = scaleLinear().range([height - margin.bottom, margin.top]);
        const lineG = line()
        const xAxis = axisBottom().scale(xScale)
            .tickFormat(timeFormat('%d %b'))
        const yAxis = axisLeft().scale(yScale);

        const lineData = data.slice(-days);
        const dateDomain = extent(lineData, d => d.date);
        const confirmedMax = max(lineData, d => d.confirmed);
        xScale.domain(dateDomain)
        yScale.domain([0, confirmedMax])
        lineG.x(d => xScale(d.date))
        lineG.y(d => yScale(d.confirmed))
        const confirmed = (lineG(lineData))
        lineG.y(d => yScale(d.deaths))
        const deaths = (lineG(lineData))
        lineG.y(d => yScale(d.recovered))
        const recovered = (lineG(lineData))
        setLines({confirmed: confirmed, deaths: deaths, recovered: recovered})
        select(xAxisRef.current).call(xAxis).attr('transform', `translate(0,${height - margin.bottom})`);
        select(yAxisRef.current).call(yAxis).attr('transform', `translate(${margin.left},0)`);


    }, [data, type, dimensions, days])

    return (
        <div ref={wrapperDivRef}>
            <svg ref={svgRef}>
                {Object.keys(type).map(b => type[b] ? (
                    <path d={lines[b]} fill='none' stroke='black' strokeWidth='2.5px' key={type}/>
                    ) : ''
                )}
                <g>
                    <g ref={xAxisRef}/>
                    <g ref={yAxisRef}/>
                </g>
            </svg>
        </div>
    );
}

export default LineChart;