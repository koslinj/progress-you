import { useRuns } from '../../context/RunsContext'
import Countdown from '../Countdown';
import NewRun from './NewRun';
import Run from './Run';


const Running = () => {

    const { runs } = useRuns()

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl mb-4 mt-2 italic'>Running</h1>
            <div className='flex justify-center items-center gap-8 flex-wrap'>
                {runs ? runs.map((run, i) => {
                    return <Run run={run} key={i}/>
                }) : <h2>Loading...</h2>}
            </div>
            <Countdown />
            <NewRun />
        </div>
    )
}

export default Running