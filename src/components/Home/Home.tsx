import { useMemo } from "react"
import { useCoding } from "../../context/CodingContext"
import { useRuns } from "../../context/RunsContext"
import ActivitiesSlider from "./ActivitiesSwiper"

const Home = () => {
    const { runs } = useRuns()
    const { coding } = useCoding()

    const runTime = useMemo(() => {
        let time = 0
        runs.forEach(run => time += run.minutes)
        return time
    }, [runs])

    const codingTime = useMemo(() => {
        let time = 0
        coding.forEach(run => time += run.minutes)
        return time
    }, [runs])

    return (
        <>
            <ActivitiesSlider />
            <h1 className="text-center  text-5xl my-8">General Statistics</h1>
            <h2 className="text-center  text-2xl">Time spent running: </h2>
            <p className="text-center  text-2xl"><span className="font-semibold text-3xl tracking-widest">{runTime}</span> minutes</p>
            <p className="text-center  text-2xl"><span className="font-semibold text-3xl tracking-widest">{(runTime/60).toFixed(2)}</span> hours</p>
            <p className="text-center  text-2xl"><span className="font-semibold text-3xl tracking-widest">{(runTime/60/24).toFixed(2)}</span> days</p>
            <h2 className="text-center  text-2xl mt-8">Time spent coding: </h2>
            <p className="text-center  text-2xl"><span className="font-semibold text-3xl tracking-widest">{codingTime}</span> minutes</p>
            <p className="text-center  text-2xl"><span className="font-semibold text-3xl tracking-widest">{(codingTime/60).toFixed(2)}</span> hours</p>
            <p className="text-center  text-2xl"><span className="font-semibold text-3xl tracking-widest">{(codingTime/60/24).toFixed(2)}</span> days</p>
        </>
    )
}

export default Home