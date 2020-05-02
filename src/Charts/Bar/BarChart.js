import React, {useEffect, useRef} from 'react';
import useResizeObserver from "../../Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleLinear, scaleTime} from 'd3-scale'
import {extent, max} from 'd3-array'
import {timeFormat} from 'd3-time-format'
import {axisBottom, axisLeft} from 'd3-axis'


function BarChart({data, days, type}) {
    const svgRef = useRef()
    const wrapperDivRef = useRef()
    const xAxisRef = useRef()
    const yAxisRef = useRef()
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

        data = data.slice(-days)
        data = data.map(d => {
            return {
                date: d.date,
                input: d[type]
            }
        });
        const gap = 1.15;
        const bar = (width - margin.left - margin.right) / data.length / gap;
        const xScale = scaleTime().range([margin.left, width - margin.right]);
        const yScale = scaleLinear().range([height - margin.bottom, margin.top]);
        const xAxis = axisBottom().scale(xScale)
            .tickFormat(timeFormat('%d %b'))
        const yAxis = axisLeft().scale(yScale);
        const dateDomain = extent(data, d => d.date);
        const inputMax = max(data, d => d.input);
        xScale.domain(dateDomain)
        yScale.domain([0, inputMax])

        select(xAxisRef.current)
            .call(xAxis)
            .attr('transform', `translate(0,${height - margin.bottom})`);

        select(yAxisRef.current)
            .call(yAxis)
            .attr('transform', `translate(${margin.left},0)`);

        svg
            .selectAll('.rect')
            .data(data)
            .join(enter => enter.append('rect'))
            .attr('class', 'rect')
            .attr('x', (d, i) => margin.left + (i * bar * gap))
            .attr('y', d => {
                return yScale(d.input)
            })
            .style('fill', 'blue')
            .attr('height', d => {
                return height - yScale(d.input) - margin.bottom
            })
            .attr('width', bar)


    }, [data, days, dimensions, type])

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

export default BarChart;