import { useCoding } from "../context/CodingContext"
import { useRuns } from "../context/RunsContext"


const Home = () => {
    const { coding } = useCoding()
    const { runs } = useRuns()
    const dates: string[] = []
    coding.forEach(item => {
        dates.push(item.day)
    })
    runs.forEach(item => {
        dates.push(item.day)
    })
    dates.sort((a, b) => {
        const date_a = new Date(a).getTime()
        const date_b = new Date(b).getTime()
        return date_a - date_b
    })

    return (
        <div>
            {dates.map((item, i) => {
                return <p key={i}>{item}</p>
            })}
        </div>
    )
}

export default Home