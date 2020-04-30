import React, {useEffect, useRef} from 'react';
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
    const margin = {
        top: 20,
        bottom: 20,
        left: 50,
        right: 5
    }


    useEffect(() => {
        const svg = select(svgRef.current)
        if (!dimensions) return
        const {width, height} = dimensions;

        const xScale = scaleTime().range([margin.left, width - margin.right]);
        const yScale = scaleLinear().range([height - margin.bottom, margin.top]);
        const lineG = line()
        const xAxis = axisBottom().scale(xScale)
            .tickFormat(timeFormat('%d %b'))
        const yAxis = axisLeft().scale(yScale);

        data = data.slice(-days);
        const dateDomain = extent(data, d => d.date);
        const confirmedMax = max(data, d => d.confirmed);
        xScale.domain(dateDomain)
        yScale.domain([0, confirmedMax])
        lineG.x(d => xScale(d.date))
        lineG.y(d => yScale(d.confirmed))
        const confirmed = lineG(data)
        lineG.y(d => yScale(d.deaths))
        const deaths = lineG(data)
        lineG.y(d => yScale(d.recovered))
        const recovered = lineG(data)

        svg.append('path')
            .attr('d', confirmed)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('stroke-width', '2.5px')
        svg.append('path')
            .attr('d', deaths)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', '2.5px')
        svg.append('path')
            .attr('d', recovered)
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', '2.5px')

        select(xAxisRef.current).call(xAxis).attr('transform', `translate(0,${height - margin.bottom})`);
        select(yAxisRef.current).call(yAxis).attr('transform', `translate(${margin.left},0)`);


    }, [data, dimensions])

    return (
        <div ref={wrapperDivRef}>
            <svg ref={svgRef}>
                <g>
                    <g ref={xAxisRef}/>
                    <g ref={yAxisRef}/>
                </g>
            </svg>
        </div>
    );
}

export default LineChart;