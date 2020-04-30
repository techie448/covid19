import React, {useEffect, useRef, useState} from 'react';
import useResizeObserver from "../../Hooks/useResizeObserver";
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {max, min} from 'd3-array'
import {geoMercator, geoPath} from 'd3-geo'

function WorldMap({data, type, world}) {
    const svgRef = useRef()
    const wrapperDivRef = useRef()
    const dimensions = useResizeObserver(wrapperDivRef)
    const [sel, setSel] = useState(null)

    useEffect(() => {
        if (!dimensions) return
        const svg = select(svgRef.current)
        const minV = min(Object.entries(data), d => d[1][0][type]);
        const maxV = max(Object.entries(data), d => d[1][0][type]);
        const cscale = scaleLinear()
            .domain([minV, 30000, maxV])
            .range(['#fff', '#ff9090', '#ff5050'])

        const projection = geoMercator()
            .fitSize([dimensions.width, dimensions.height], sel || world)
            .precision(100)


        const pathGen = geoPath().projection(projection)


        svg.selectAll('.country')
            .data(world.features)
            .join('path')
            .on('click', d => {
                return setSel(sel === d ? null : d)
            })
            .attr('class', 'country')
            .transition()

            .attr('fill', f =>
                (data[f.properties.name]) ? cscale(data[f.properties.name][0][type])
                    : '#fff'
            )
            .attr('d', f => pathGen(f))

        svg.selectAll(".label")
            .data([sel])
            .join('text')
            .attr('class', 'label')
            .text(
                f =>
                    f &&
                    f.properties.name + ': ' + ((data[f.properties.name]) ? (data[f.properties.name][0][type])
                    : 0)
            )
            .attr('x', 10)
            .attr('y', 25)

    }, [data, dimensions, type, world, sel])

    return (
        <div ref={wrapperDivRef} style={{marginBottom: '2rem'}}>
            <svg ref={svgRef} style={{backgroundColor: '#c5e8ff'}}>
            </svg>
        </div>
    );
}

export default WorldMap;