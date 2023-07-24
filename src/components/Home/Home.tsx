import { useMemo } from "react"
import { useCoding } from "../../context/CodingContext"
import { useRuns } from "../../context/RunsContext"
import ActivitiesSlider from "./ActivitiesSlider"

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
            <h1 className="text-center font-orbitron text-5xl my-8">General Statistics</h1>
            <h2 className="text-center font-orbitron text-2xl">Time spent running: </h2>
            <p className="text-center font-orbitron text-2xl">{runTime} minutes</p>
            <p className="text-center font-orbitron text-2xl">{(runTime/60).toFixed(2)} hours</p>
            <p className="text-center font-orbitron text-2xl">{(runTime/60/24).toFixed(2)} days</p>
            <h2 className="text-center font-orbitron text-2xl mt-8">Time spent coding: </h2>
            <p className="text-center font-orbitron text-2xl">{codingTime} minutes</p>
            <p className="text-center font-orbitron text-2xl">{(codingTime/60).toFixed(2)} hours</p>
            <p className="text-center font-orbitron text-2xl">{(codingTime/60/24).toFixed(2)} days</p>
        </>
    )
}

export default Home