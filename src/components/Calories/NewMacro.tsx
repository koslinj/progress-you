import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { useState } from "react";
import addIcon from '../../icons/add_icon.png'
import { useTheme } from "../../context/ThemeContext";
import { ToastContainer } from "react-toastify";
import { UserAuth } from "../../context/AuthContext";
import { MacroType } from "../../context/CaloriesContext";

const NewMacro = () => {
    const [carbs, setCarbs] = useState(6)
    const [protein, setProtein] = useState(1)
    const [fat, setFat] = useState(107)
    const [kcal, setKcal] = useState((carbs + protein) * 4 + fat * 9)

    const { color } = useTheme()

    const { user } = UserAuth();

    const handleNewMacro = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (user) {
                const toAdd: MacroType = {
                    carbs: carbs,
                    protein: protein,
                    fat: fat,
                    kcal: kcal,
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

    return (
        <>
            <form onSubmit={handleNewMacro} className={`${color} p-6 rounded-2xl flex justify-center gap-20 flex-wrap mt-12 mx-2`}>
                <div className="flex flex-col items-center justify-around">
                    <div onClick={handleNewMacro} className="bg-slate-800 rounded-full mt-4 p-6 hover:scale-125 duration-300 cursor-pointer">
                        <img className="w-20 invert" src={addIcon} alt="Add Icon" />
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    )
}

export default NewMacro