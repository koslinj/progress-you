import { ReactElement, createContext, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

export type RunType = {
    km: number,
    minutes: number
    day: string
}


const useRunContext = () => {
    const [runs, setRuns] = useState<RunType[] | null>(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "runs"), (snapshot) => {
            const data: RunType[] = []
            snapshot.forEach((doc) => {
                const runData = doc.data();
                const run: RunType = {
                    km: runData.km,
                    minutes: runData.minutes,
                    day: runData.day
                };
                data.push(run);
            });
            const sorted = data.sort((a, b) => {
                const date_a = new Date(a.day).getTime()
                const date_b = new Date(b.day).getTime()
                return date_a - date_b
            })
            setRuns(sorted);
        });

        // Cleanup the listener when the component unmounts or when the dependency array changes
        return () => {
            unsubscribe();
        }
    }, [])

    return { runs, setRuns }
}


type valueType = ReturnType<typeof useRunContext>

const RunContext = createContext<valueType | null>(null)

type PropsType = {
    children: ReactElement | ReactElement[]
}

export const RunProvider = ({ children }: PropsType) => {
    return (
        <RunContext.Provider value={useRunContext()}>
            {children}
        </RunContext.Provider>
    )
}

export const useRuns = () => {
    const context = useContext(RunContext)

    if (context == null) {
        throw new Error('There is no provider for RunsContext')
    }

    return context
}