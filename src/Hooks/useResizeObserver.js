import {useEffect, useState} from "react";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null)
    useEffect(() => {
        const target = ref.current
        const resizeObserver = new ResizeObserver((el) => {
            el.forEach(e => {
                setDimensions(e.contentRect)
            })
        })
        resizeObserver.observe(target)
        return () => {
            resizeObserver.unobserve(target)
        }
    }, [ref])
    return dimensions;
}

export default useResizeObserver