import { ReactElement, createContext, useContext, useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

export type DifficultyType = 1|2|3|4|5
export type CodeType = {
    minutes: number
    language: String
    difficulty: DifficultyType
}

const useCodingContext = () => {
    const [coding, setCoding] = useState<CodeType[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "coding"), (snapshot) => {
            const data: CodeType[] = []
            snapshot.forEach((doc) => {
                const codingData = doc.data();
                const coding: CodeType = {
                    minutes: codingData.minutes,
                    language: codingData.language,
                    difficulty: codingData.difficulty
                };
                data.push(coding);
            });
            setCoding(data);
        });

        // Cleanup the listener when the component unmounts or when the dependency array changes
        return () => {
            unsubscribe();
        }
    }, [])

    return { coding, setCoding }
}

type valueType = ReturnType<typeof useCodingContext>

const CodingContext = createContext<valueType | null>(null)

type PropsType = {
    children: ReactElement | ReactElement[]
}
export const CodingProvider = ({children}: PropsType) => {
    return (
        <CodingContext.Provider value={useCodingContext()}>
            {children}
        </CodingContext.Provider>
    )
}

export const useCoding = () => {
    const context = useContext(CodingContext)

    if(context === null){
        throw new Error('There is no provider for CodingContext')
    }

    return context
}