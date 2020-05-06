import {useEffect, useRef} from "react";

const useInterval = (func, time) => {

    const savedFunc = useRef()

    useEffect(() => {
        savedFunc.current = func
    }, [func])

    useEffect(() => {
        const tick = () => savedFunc.current()
        if (time !== null) {
            let inst = setInterval(tick, time)
            return () => clearInterval(inst)
        }


    }, [time])
}

export default useInterval