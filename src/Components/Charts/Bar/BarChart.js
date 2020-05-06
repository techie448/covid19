import React, {useEffect, useRef} from 'react';
import useResizeObserver from "../../Cutom Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleLinear, scaleTime} from 'd3-scale'
import {extent, max} from 'd3-array'
import {timeFormat} from 'd3-time-format'
import {axisBottom, axisLeft} from 'd3-axis'
import {format} from "d3-format";


function BarChart({data, days, type, selectedClass}) {
    const svgRef = useRef()
    const wrapperDivRef = useRef()
    const xAxisRef = useRef()
    const yAxisRef = useRef()
    const dimensions = useResizeObserver(wrapperDivRef)

    useEffect(() => {
        const margin = {
            top: 40,
            bottom: 20,
            left: 50,
            right: 50
        }
        const svg = select(svgRef.current)
        if (!dimensions) return
        const {width, height} = dimensions;

        const barData = data.slice(-days).map(d => {
            return {
                date: d.date,
                input: d[type]
            }
        });
        const gap = 1.15;
        const bar = (width - margin.left - margin.right) / barData.length / gap;
        const xScale = scaleTime().range([margin.left, width - margin.right]);
        const yScale = scaleLinear().range([height - margin.top, margin.top]);
        const xAxis = axisBottom().scale(xScale).ticks(5)
            .tickFormat(timeFormat('%d %b'))


        const yAxis = axisLeft().scale(yScale).ticks(7).tickFormat(format(".2s"))
        ;
        const dateDomain = extent(barData, d => d.date);
        const inputMax = max(barData, d => d.input);
        xScale.domain(dateDomain)
        yScale.domain([0, inputMax])

        select(xAxisRef.current)
            .call(xAxis)
            .style('font-size', 'calc(5px + 1vmin)')
            .attr('transform', `translate(0,${height - margin.top + 1})`);

        select(yAxisRef.current)
            .call(yAxis)
            .style('font-size', 'calc(5px + 1vmin)')
            .attr('transform', `translate(${margin.left},1)`);

        svg
            .selectAll('.rect')
            .data(barData)
            .join(enter => enter.append('rect'))
            .attr('class', `rect ${selectedClass}`)
            .attr('x', (d, i) => margin.left + 2 + +(i * bar * gap))
            .attr('y', d => {
                return yScale(d.input)
            })
            .attr('height', d => {
                return height - yScale(d.input) - margin.top
            })
            .attr('width', bar)


    }, [selectedClass, data, days, dimensions, type])
    return (
        <div ref={wrapperDivRef} className={'dd'}>
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