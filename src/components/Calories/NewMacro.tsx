import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useEffect, useState } from "react";
import addIcon from '../../icons/add_icon.png'
import dateIcon from '../../icons/date_icon.png'
import { useTheme } from "../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import { UserAuth } from "../../context/AuthContext";
import { MacroType } from "../../context/CaloriesContext";

const NewMacro = () => {
    const [carbs, setCarbs] = useState(300)
    const [protein, setProtein] = useState(180)
    const [fat, setFat] = useState(70)
    const [kcal, setKcal] = useState((carbs + protein) * 4 + fat * 9)

    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = String(objectDate.getMonth() + 1).padStart(2, '0');
    let year = objectDate.getFullYear();
    let format = year + "-" + month + "-" + day
    const [date, setDate] = useState(format)

    const { color } = useTheme()

    const { user } = UserAuth();

    useEffect(() => {
        setKcal((carbs + protein) * 4 + fat * 9)
    }, [carbs, protein, fat])


    const handleNewMacro = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (user) {
                const toAdd: MacroType = {
                    carbs: carbs,
                    protein: protein,
                    fat: fat,
                    kcal: kcal,
                    day: date,
                    userId: user.uid
                }
                await addDoc(collection(db, "calories"), toAdd);
            }
            else {
                throw new Error('User is not logged in!')
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleDecreaseMacro = (value: number, macroToChange: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
        if (macroToChange - value < 0) {
            return toast.error(`You cannot put negative amount of ${macroToChange}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
        }
        setter(prev => prev - value)
    }

    return (
        <>
            <form onSubmit={handleNewMacro} className={`${color} p-6 rounded-2xl flex justify-center gap-20 flex-wrap mt-12 mx-2`}>
                <div className="flex flex-col items-center">
                    <div className="flex flex-wrap gap-8 justify-center items-center text-center">
                        <div>
                            <p className="mt-4 text-xl">Carbs</p>
                            <div className="flex justify-center bg-slate-900 rounded-xl">
                                <div>
                                    <div onClick={() => handleDecreaseMacro(1, carbs, setCarbs)} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                                    <div onClick={() => handleDecreaseMacro(10, carbs, setCarbs)} className="text-2xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'<<'}</div>
                                </div>
                                <input className="km-input" type="number" value={carbs.toString()} onChange={(e) => setCarbs(Number(e.target.value))}></input>
                                <div>
                                    <div onClick={() => setCarbs(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                                    <div onClick={() => setCarbs(prev => prev + 10)} className="text-2xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'>>'}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="mt-4 text-xl">Protein</p>
                            <div className="flex justify-center bg-slate-900 rounded-xl">
                                <div>
                                    <div onClick={() => handleDecreaseMacro(1, protein, setProtein)} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                                    <div onClick={() => handleDecreaseMacro(10, protein, setProtein)} className="text-2xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'<<'}</div>
                                </div>
                                <input className="km-input" type="number" value={protein.toString()} onChange={(e) => setProtein(Number(e.target.value))}></input>
                                <div>
                                    <div onClick={() => setProtein(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                                    <div onClick={() => setProtein(prev => prev + 10)} className="text-2xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'>>'}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="mt-4 text-xl">Fat</p>
                            <div className="flex justify-center bg-slate-900 rounded-xl">
                                <div>
                                    <div onClick={() => handleDecreaseMacro(1, fat, setFat)} className="text-4xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">-</div>
                                    <div onClick={() => handleDecreaseMacro(10, fat, setFat)} className="text-2xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'<<'}</div>
                                </div>
                                <input className="km-input" type="number" value={fat.toString()} onChange={(e) => setFat(Number(e.target.value))}></input>
                                <div>
                                    <div onClick={() => setFat(prev => prev + 1)} className="text-4xl p-4 hover:bg-slate-950 rounded-r-xl w-16 flex justify-center items-center cursor-pointer select-none">+</div>
                                    <div onClick={() => setFat(prev => prev + 10)} className="text-2xl p-4 hover:bg-slate-950 rounded-l-xl w-16 flex justify-center items-center cursor-pointer select-none">{'>>'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-4xl font-semibold mt-4 mb-8">Kcal: {kcal}</p>
                    <div className="flex justify-center items-center gap-8">
                        <img src={dateIcon} alt="Distance Icon" className="w-16" />
                        <div className="flex justify-center items-center">
                            <input className="date-input" type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
                        </div>
                    </div>
                    <div onClick={handleNewMacro} className="bg-slate-800 rounded-full mt-8 p-6 hover:scale-125 duration-300 cursor-pointer">
                        <img className="w-20 invert" src={addIcon} alt="Add Icon" />
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default NewMacro