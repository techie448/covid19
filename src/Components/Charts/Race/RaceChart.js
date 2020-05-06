import React, {useEffect, useRef} from 'react';
import useResizeObserver from "../../Cutom Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleBand, scaleLinear, scaleOrdinal} from 'd3-scale'
import {max} from 'd3-array'
import {easeLinear} from 'd3-ease'
import {schemeCategory10} from 'd3-scale-chromatic'
import {interpolate} from 'd3-interpolate'
import {format} from 'd3-format'
// eslint-disable-next-line no-unused-vars
import {transition} from "d3-transition";
import {axisTop} from "d3-axis";


function RaceChart({data, currDate}) {

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
            .data(data)
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
            .tickSize(-(height * 0.8))
            .tickFormat(format(".2s"))
            .tickSizeOuter(0)

        select(xAxisRef.current)
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .style('font-size', 'calc(5px + 1vmin)')
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
            .style('font-size', 'calc(5px + 1vmin)')
            .transition()
            .duration(1000)
            .ease(easeLinear)
            .attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.4)
            .tween("text", function (d) {
                let i = interpolate(+(this.textContent.split(',').join('')), d.value);
                return function (t) {
                    select(this).text(Math.round(i(t)).toLocaleString());
                };
            });


        svg.selectAll('.label2')
            .data(data)
            .join(enter => enter.append('text').attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.8)
            )
            .attr('class', 'label2')
            .attr('x', margin.left * 2)
            .text(e => `${e.country}`)
            .style('font-size', 'calc(5px + 1vmin)')
            .transition()
            .duration(1000)
            .ease(easeLinear)
            .attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.8)

    }, [currDate, data, dimensions])

    return (
        <div className={'RaceDD'} ref={wrapperDivRef}>

            <svg ref={svgRef}>
                <g ref={xAxisRef}/>
            </svg>
        </div>
    );
}

export default RaceChart;