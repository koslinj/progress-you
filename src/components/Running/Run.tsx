import { RunType } from '../../context/RunsContext'
import { useTheme } from '../../context/ThemeContext'
import distanceIcon from '../../icons/distance_icon.png'
import timerIcon from '../../icons/timer_icon.png'
import dateIcon from '../../icons/date_icon.png'

type PropsType = {
    run: RunType
}

const Run = ({run}: PropsType) => {
    const { color } = useTheme()
    
    return (
        <div className={`${color} p-6 rounded-xl hover:scale-110 duration-200`}>
            <div className='flex justify-between gap-4 items-center mb-4'>
                <img className='h-10' src={distanceIcon} alt="Distance Icon" />
                <p className='text-xl'>{run.km}km</p>
            </div>
            <div className='flex justify-between gap-4 items-center mb-4'>
                <img className='h-10' src={timerIcon} alt="Timer Icon" />
                <p className='text-xl'>{Math.floor(run.minutes / 60)}:{String(run.minutes % 60).padStart(2,'0')}</p>
            </div>
            <div className='flex justify-between gap-4 items-center'>
                <img className='h-10' src={dateIcon} alt="Date Icon" />
                <p className='text-xl'>{run.day}</p>
            </div>
        </div>
    )
}

export default Run