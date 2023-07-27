import { ReactElement, createContext, useContext, useEffect, useState } from "react"
import { UserAuth } from "./AuthContext"
import { Unsubscribe, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";


export type MacroType = {
    carbs: number
    protein: number
    fat: number
    kcal: number
    day: string
    userId: string
}

const useCaloriesContext = () => {
    const [calories, setCalories] = useState<MacroType[]>([])
    const { user } = UserAuth();

    useEffect(() => {
        let unsubscribe: Unsubscribe = () => { }
        if (user) {
            unsubscribe = onSnapshot(query(collection(db, "calories"), where("userId", "==", user.uid)),
                (snapshot) => {
                    const data: MacroType[] = []
                    snapshot.forEach((doc) => {
                        const caloriesData = doc.data();
                        const macro: MacroType = {
                            carbs: caloriesData.carbs,
                            protein: caloriesData.protein,
                            fat: caloriesData.fat,
                            kcal: caloriesData.kcal,
                            day: caloriesData.day,
                            userId: caloriesData.userId
                        };
                        data.push(macro);
                    });
                    const sorted = data.sort((a, b) => {
                        const date_a = new Date(a.day).getTime()
                        const date_b = new Date(b.day).getTime()
                        return date_a - date_b
                    })
                    setCalories(sorted);
                });
        }

        // Cleanup the listener when the component unmounts or when the dependency array changes
        return () => {
            unsubscribe();
        }
    }, [user])

    return { calories, setCalories }
}

type valueType = ReturnType<typeof useCaloriesContext>

const CaloriesContext = createContext<valueType | null>(null)

type PropsType = {
    children: ReactElement | ReactElement[]
}

export const CaloriesProvider = ({ children }: PropsType) => {
    return (
        <CaloriesContext.Provider value={useCaloriesContext()}>
            {children}
        </CaloriesContext.Provider>
    )
}

export const useCalories = () => {
    const context = useContext(CaloriesContext)

    if (context === null) {
        throw new Error('There is no provider for RunsContext')
    }

    return context
}