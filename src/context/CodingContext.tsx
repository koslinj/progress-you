import { ReactElement, createContext, useContext, useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { UserAuth } from "./AuthContext"
import { Unsubscribe } from "firebase/auth"

export type DifficultyType = 1 | 2 | 3 | 4 | 5
export type CodeType = {
    minutes: number
    language: string
    difficulty: DifficultyType
    day: string
    userId: string
}

const useCodingContext = () => {
    const [coding, setCoding] = useState<CodeType[]>([])
    const { user } = UserAuth();

    useEffect(() => {
        let unsubscribe: Unsubscribe = () => {}
        if(user){
            unsubscribe = onSnapshot(query(collection(db, "coding"), where("userId", "==", user.uid)),
            (snapshot) => {
                const data: CodeType[] = []
                snapshot.forEach((doc) => {
                    const codingData = doc.data();
                    const coding: CodeType = {
                        minutes: codingData.minutes,
                        language: codingData.language,
                        difficulty: codingData.difficulty,
                        day: codingData.day,
                        userId: codingData.userId
                    };
                    data.push(coding);
                });
                const sorted = data.sort((a, b) => {
                    const date_a = new Date(a.day).getTime()
                    const date_b = new Date(b.day).getTime()
                    return date_a - date_b
                })
                setCoding(sorted);
            });
        }

        // Cleanup the listener when the component unmounts or when the dependency array changes
        return () => {
            unsubscribe();
        }
    }, [user])

    return { coding, setCoding }
}

type valueType = ReturnType<typeof useCodingContext>

const CodingContext = createContext<valueType | null>(null)

type PropsType = {
    children: ReactElement | ReactElement[]
}
export const CodingProvider = ({ children }: PropsType) => {
    return (
        <CodingContext.Provider value={useCodingContext()}>
            {children}
        </CodingContext.Provider>
    )
}

export const useCoding = () => {
    const context = useContext(CodingContext)

    if (context === null) {
        throw new Error('There is no provider for CodingContext')
    }

    return context
}