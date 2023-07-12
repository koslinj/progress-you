import React, { useState } from 'react'
import { CodeType, DifficultyType } from '../../context/CodingContext'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import timerIcon from '../../icons/timer_icon.png'
import addIcon from '../../icons/add_icon.png'
import { useTheme } from '../../context/ThemeContext'
import StarRating from './StarRating'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const NewCode = () => {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(30)
    const [language, setLanguage] = useState('')
    const [difficulty, setDifficulty] = useState<DifficultyType>(3)

    const { color } = useTheme()

    const handleNewCode = async (e: React.FormEvent) => {
        e.preventDefault()
        if (language.length === 0) {
            return toast.error('You have to put programming language!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
        }
        try {
            const toAdd: CodeType = {
                minutes: hours * 60 + minutes,
                language: language,
                difficulty: difficulty
            }
            await addDoc(collection(db, "coding"), toAdd);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleDecreaseHours = () => {
        if (hours === 0) {
            return toast.error('You cannot put negative amount of hours!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
        }
        setHours(prev => prev - 1)
    }

    const handleDecreaseMinutes = () => {
        if (minutes === 0) {
            return toast.error('You cannot put negative amount of minutes!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
        }
        setMinutes(prev => prev - 1)
    }

    return (
        <form onSubmit={handleNewCode} className={`${color} p-6 rounded-2xl flex flex-col items-center flex-wrap mt-12`}>
            <p className="font-lora text-xl">Language</p>
            <div>
                <input onChange={(e) => setLanguage(e.target.value)} className='text-input' type='text'></input>
            </div>
            <div className="flex justify-between items-center gap-8 mt-8">
                <img src={timerIcon} alt="Distance Icon" className="w-16" />
                <div className="flex flex-col items-center">
                    <p className="font-lora text-xl">Hours</p>
                    <div className="flex justify-center items-center bg-slate-900 rounded-xl">
                        <div onClick={handleDecreaseHours} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                        <input className="km-input" type="number" value={hours.toString()} onChange={(e) => setHours(Number(e.target.value))}></input>
                        <div onClick={() => setHours(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                    </div>
                    <p className="mt-4 font-lora text-xl">Minutes</p>
                    <div className="flex justify-center items-center bg-slate-900 rounded-xl">
                        <div onClick={handleDecreaseMinutes} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                        <input className="km-input" type="number" value={minutes.toString()} onChange={(e) => setMinutes(Number(e.target.value))}></input>
                        <div onClick={() => setMinutes(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                    </div>
                </div>
            </div>
            <p className="mt-10 mb-2 font-lora text-xl">Difficulty</p>
            <StarRating difficulty={difficulty} setDifficulty={setDifficulty} />
            <div onClick={handleNewCode} className="bg-slate-800 rounded-full mt-8 p-6 hover:scale-125 duration-300 cursor-pointer">
                <img className="w-20" src={addIcon} alt="Add Icon" />
            </div>
            <ToastContainer />
        </form>
    )
}

export default NewCode