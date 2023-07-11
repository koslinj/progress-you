import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useState } from "react";
import distanceIcon from '../../icons/distance_icon.png'
import timerIcon from '../../icons/timer_icon.png'
import dateIcon from '../../icons/date_icon.png'
import addIcon from '../../icons/add_icon.png'
import { useTheme } from "../../context/ThemeContext";
import { RunType } from "../../context/RunsContext";

const NewRun = () => {
    const [kilometers, setKilometers] = useState(10)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(52)

    let objectDate = new Date('2023-7-21');
    let day = objectDate.getDate();
    let month = String(objectDate.getMonth() + 1).padStart(2, '0');
    let year = objectDate.getFullYear();
    let format = year + "-" + month + "-" + day
    const [date, setDate] = useState(format)

    const { color } = useTheme()

    const handleNewRun = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const toAdd: RunType = {
                km: kilometers,
                minutes: hours*60 + minutes,
                day: date
            }
            await addDoc(collection(db, "runs"), toAdd);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <form onSubmit={handleNewRun} className={`${color} p-6 rounded-2xl flex justify-center gap-20 flex-wrap mt-12`}>
            <div>
                <div className="flex justify-between gap-8">
                    <img src={distanceIcon} alt="Distance Icon" className="w-16" />
                    <div className="flex justify-center items-center bg-slate-900 rounded-xl">
                        <div onClick={() => setKilometers(prev => prev - 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                        <input className="km-input" type="number" value={kilometers.toString()} onChange={(e) => setKilometers(Number(e.target.value))}></input>
                        <div onClick={() => setKilometers(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-8 mt-8">
                    <img src={timerIcon} alt="Distance Icon" className="w-16" />
                    <div className="flex flex-col items-center">
                        <p className="font-lora text-xl">Hours</p>
                        <div className="flex justify-center items-center bg-slate-900 rounded-xl">
                            <div onClick={() => setHours(prev => prev - 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                            <input className="km-input" type="number" value={hours.toString()} onChange={(e) => setHours(Number(e.target.value))}></input>
                            <div onClick={() => setHours(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                        </div>
                        <p className="mt-4 font-lora text-xl">Minutes</p>
                        <div className="flex justify-center items-center bg-slate-900 rounded-xl">
                            <div onClick={() => setMinutes(prev => prev - 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                            <input className="km-input" type="number" value={minutes.toString()} onChange={(e) => setMinutes(Number(e.target.value))}></input>
                            <div onClick={() => setMinutes(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-around">
                <div className="flex justify-between gap-8">
                    <img src={dateIcon} alt="Distance Icon" className="w-16" />
                    <div className="flex justify-center items-center">
                        <input className="date-input" type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
                    </div>
                </div>
                <div onClick={handleNewRun} className="bg-slate-800 rounded-full mt-4 p-6 hover:scale-125 duration-300 cursor-pointer">
                    <img className="w-20" src={addIcon} alt="Add Icon" />
                </div>
            </div>
        </form>
    )
}

export default NewRun