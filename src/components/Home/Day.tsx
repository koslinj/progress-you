import { DayOfActivity } from "./Home"
import runIcon from '../../icons/running_icon.png'
import codeIcon from '../../icons/code_icon.png'

type PropsType = {
    item: DayOfActivity
}

const Day = ({ item }: PropsType) => {
    return (
        <div className="bg-slate-500 rounded-xl p-6 text-center">
            <p className="font-lora font-semibold text-2xl">{item.day.slice(-5)}</p>
            <div className="flex justify-between gap-8 items-center mt-4">
                <img className="h-10" src={runIcon} alt="Run Icon" />
                {item.running && <p>YES</p>}
                {item.minutes.running}
            </div>
            <div className="flex justify-between gap-8 items-center mt-4">
                <img className="h-10" src={codeIcon} alt="Code Icon" />
                {item.coding && <p>YES</p>}
                {item.minutes.coding}
            </div>
        </div>
    )
}

export default Day