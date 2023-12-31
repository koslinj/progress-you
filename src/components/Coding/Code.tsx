import { CodeType } from '../../context/CodingContext'
import { useTheme } from '../../context/ThemeContext'
import timerIcon from '../../icons/timer_icon.png'
import dateIcon from '../../icons/date_icon.png'
import Difficulty from './Difficulty'

type PropsType = {
    code: CodeType
}
const Code = ({code}: PropsType) => {
    const {color} = useTheme()
    return (
        <div className={`${color} p-6 rounded-xl hover:scale-110 duration-200`}>
            <h2 className='text-3xl text-center mb-4'>{code.language}</h2>
            <div className='flex justify-between gap-6 items-center mb-4'>
                <img className='h-10' src={timerIcon} alt="Timer Icon" />
                <p className='text-2xl'>{Math.floor(code.minutes/60)}:{String(code.minutes % 60).padStart(2,'0')}:00</p>
            </div>
            <div className='flex justify-between gap-4 items-center mb-4'>
                <img className='h-10' src={dateIcon} alt="Date Icon" />
                <p className='text-xl'>{code.day}</p>
            </div>
            <Difficulty difficulty={code.difficulty} />
        </div>
    )
}

export default Code