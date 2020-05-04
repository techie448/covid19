import React, {useEffect, useRef} from 'react';
import useResizeObserver from "../../Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleBand, scaleLinear, scaleOrdinal} from 'd3-scale'
import {max} from 'd3-array'
import {easeBackIn, easeCircle, easeLinear, easeQuad} from 'd3-ease'
import {schemeCategory10} from 'd3-scale-chromatic'
import {interpolate, interpolateDate} from 'd3-interpolate'
import {timeFormat} from 'd3-time-format'
import {format} from 'd3-format'
// eslint-disable-next-line no-unused-vars
import {transition} from "d3-transition";
import {axisBottom, axisTop} from "d3-axis";


function RaceChart({data, currDate, startDate, reset}) {

    const svgRef = useRef()
    const wrapperDivRef = useRef()
    const xAxisRef = useRef()
    const dimensions = useResizeObserver(wrapperDivRef)
    useEffect(() => {
        const margin = {
            top: 30,
            bottom: 20,
            left: 20,
            right: 20
        }
        const svg = select(svgRef.current)
        if (!dimensions) return
        let {width, height} = dimensions;

        const yScale = scaleBand()
            .paddingInner(0.1)
            .domain(data.map((v, i) => i))
            .range([(margin.top) * 2, height * 0.8])

        const xScale = scaleLinear()
            .domain([0, max(data, e => e.value) * 1.1])
            .range([0, width - margin.right - margin.left])
        let accent = scaleOrdinal(schemeCategory10);
        svg
            .selectAll('.bar')
            .data(data, (e, i) => e.country)
            .join(enter => enter.append('rect').attr('y', (v, i) => yScale(i))
            )
            .attr('class', 'bar')
            .attr('fill', d => accent(d.value))
            .attr('x', margin.left + 1)
            .attr('height', yScale.bandwidth())
            .transition()
            .attr('opacity', 0.8)
            .attr('width', e => xScale(e.value))
            .attr('y', (v, i) => yScale(i))
            .duration(1000)
            .ease(easeLinear)
        const xAxis = axisTop()
            .scale(xScale)
            .ticks(5)
            .tickSize(-(height - margin.top - margin.bottom))
            .tickFormat(format(".0s"))
            .tickSizeOuter(0)

        select(xAxisRef.current)
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .style('font-size', '13px')
            .transition()
            .duration(1000)
            .ease(easeLinear)
            .call(xAxis)
        svg.selectAll('.label')
            .data(data)
            .join(enter => enter.append('text').attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.4)
            )
            .attr('class', 'label')
            .attr('x', margin.left * 2)
            .style('font-size', '13px')
            .transition()
            .duration(1000)
            .ease(easeLinear)
            .attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.4)
            .tween("text", function (d) {
                let i = interpolate(+(this.textContent.replace(',', '')), d.value);
                return function (t) {
                    select(this).text(Math.round(i(t)).toLocaleString());
                };
            });


        svg.selectAll('.label2')
            .data(data, (e, i) => e.country)
            .join(enter => enter.append('text').attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.8)
            )
            .attr('class', 'label2')
            .attr('x', margin.left * 2)
            .text(e => `${e.country}`)
            .style('font-size', '13px')
            .transition()
            .duration(1000)
            .ease(easeLinear)
            .attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.8)
        var formatTime = timeFormat("%a %d %b, %y %H:%M");

        // svg.selectAll('.l3')
        //     .data([currDate])
        //     .join('text')
        //     .attr('class', 'l3')
        //     .attr('x', width*0.75)
        //     .attr('y', height / 1.2)
        //     .text(d => formatTime(d))
        //     .transition()
        //     .duration(1000)
        //     .ease(easeLinear)
        //     .tween("text", function (d) {
        //         let i = interpolateDate(new Date(this.textContent), d);
        //         return function (t) {
        //             select(this).text(formatTime(i(t)));
        //         };
        //     });


    }, [currDate, data, dimensions])

    return (
        <div className='raceDD' ref={wrapperDivRef}>

            <svg ref={svgRef}>
                <g ref={xAxisRef}/>
            </svg>
            <div className='date'>{currDate.toDateString()}</div>
        </div>
    );
}

export default RaceChart;