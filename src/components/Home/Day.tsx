import { DayOfActivity } from "./Home"
import runIcon from '../../icons/running_icon.png'
import codeIcon from '../../icons/code_icon.png'

type PropsType = {
    item: DayOfActivity
}

const Day = ({ item }: PropsType) => {
    return (
        <div className="bg-slate-500 rounded-xl p-2 md:p-6 text-center">
            <p className="font-semibold text-xl md:text-2xl">{item.day.slice(-5)}</p>
            <div>
                <div className="flex justify-center gap-4 md:gap-8 items-center mt-4">
                    <img className="h-8 md:h-10" src={runIcon} alt="Run Icon" />
                    {item.running ? <p>✅</p> : <p>❌</p>}
                </div>
                {item.running && <p className='font-orbitron text-lg md:text-2xl'>{Math.floor(item.minutes.running/60)}:{String(item.minutes.running % 60).padStart(2,'0')}</p>}
            </div>
            <div>
                <div className="flex justify-center gap-4 md:gap-8 items-center mt-4">
                    <img className="h-8 md:h-10" src={codeIcon} alt="Code Icon" />
                    {item.coding ? <p>✅</p> : <p>❌</p>}
                </div>
                {item.coding && <p className='font-orbitron text-lg md:text-2xl'>{Math.floor(item.minutes.coding/60)}:{String(item.minutes.coding % 60).padStart(2,'0')}</p>}
            </div>
        </div>
    )
}

export default Day