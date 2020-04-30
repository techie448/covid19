import React, {useEffect, useRef} from 'react';
import useResizeObserver from "../../Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleBand, scaleLinear, scaleOrdinal} from 'd3-scale'
import {max} from 'd3-array'
import {easeLinear} from 'd3-ease'
import {schemePastel2} from 'd3-scale-chromatic'
import {interpolate, interpolateDate} from 'd3-interpolate'
import {timeFormat} from 'd3-time-format'
// eslint-disable-next-line no-unused-vars
import {transition} from "d3-transition";


function RaceChart({data, currDate, startDate}) {
    const svgRef = useRef()
    const wrapperDivRef = useRef()
    const dimensions = useResizeObserver(wrapperDivRef)
    useEffect(() => {
        const svg = select(svgRef.current)
        if (!dimensions) return
        const {width, height} = dimensions;
        const yScale = scaleBand()
            .paddingInner(0.1)
            .domain(data.map((v, i) => i))
            .range([0, dimensions.height])

        const xScale = scaleLinear()
            .domain([0, max(data, e => e.value)])
            .range([0, dimensions.width])
        var accent = scaleOrdinal(schemePastel2);
        svg
            .selectAll('.bar')
            .data(data, (e, i) => e.country)
            .join(enter => enter.append('rect').attr('y', (v, i) => yScale(i))
                .attr('width', e => xScale(e.value))
            )
            .attr('class', 'bar')
            .attr('fill', d => accent(d.value))
            .attr('x', 0)
            .attr('height', yScale.bandwidth())
            .transition()
            .attr('width', e => xScale(e.value))
            .attr('y', (v, i) => yScale(i))
            .duration(1000)
            .ease(easeLinear)

        svg.selectAll('.label')
            .data(data, (e, i) => e.country)
            .join(enter => enter.append('text').attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.4)
            )
            .attr('class', 'label')
            .attr('x', 10)
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
            .attr('x', 10)
            .text(e => `${e.country}`)
            .style('font-size', '13px')
            .transition()
            .duration(1000)
            .ease(easeLinear)
            .attr('y', (e, i) => yScale(i) + yScale.bandwidth() * 0.8)
        var formatTime = timeFormat("%a %d %b, %y %H:%M");
        svg.selectAll('.l3')
            .data([currDate])
            .join('text')
            .attr('class', 'l3')
            .style('font-size', '23px')
            .attr('x', width - 250)
            .attr('y', height - 150)
            .text(d => formatTime(d))
            .transition()
            .duration(1000)
            .ease(easeLinear)
            .tween("text", function (d) {
                let i = interpolateDate(new Date(this.textContent), d);
                return function (t) {
                    select(this).text(formatTime(i(t)));
                };
            });


    }, [currDate, data, dimensions])

    return (
        <div ref={wrapperDivRef}>
            <svg ref={svgRef}>
            </svg>
        </div>
    );
}

export default RaceChart;