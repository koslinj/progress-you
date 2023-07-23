import { ReactElement, createContext, useContext, useEffect, useState } from 'react'
import { Unsubscribe, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase';
import { UserAuth } from './AuthContext';

export type RunType = {
    km: number
    minutes: number
    day: string
    userId: string
    docId?: string
    hasImage: boolean
}


const useRunContext = () => {
    const [runs, setRuns] = useState<RunType[]>([])
    const { user } = UserAuth();

    useEffect(() => {
        let unsubscribe: Unsubscribe = () => {}
        if (user) {
            unsubscribe = onSnapshot(query(collection(db, "runs"), where("userId", "==", user.uid)),
                (snapshot) => {
                    const data: RunType[] = []
                    snapshot.forEach((doc) => {
                        const runData = doc.data();
                        const run: RunType = {
                            km: runData.km,
                            minutes: runData.minutes,
                            day: runData.day,
                            userId: runData.userId,
                            docId: doc.id,
                            hasImage: runData.hasImage
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
        }

        // Cleanup the listener when the component unmounts or when the dependency array changes
        return () => {
            unsubscribe();
        }
    }, [user])

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