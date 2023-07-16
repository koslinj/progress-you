import { useEffect, useMemo, useState } from "react"
import { useCoding } from "../../context/CodingContext"
import { useRuns } from "../../context/RunsContext"
import Day from "./Day"

export type DayOfActivity = {
    day: string
    running: boolean
    coding: boolean
    minutes: { running: number, coding: number }
}

const Home = () => {
    const { coding } = useCoding()
    const { runs } = useRuns()
    const [lastDays, setLastDays] = useState<DayOfActivity[]>([])

    const dates = useMemo(() => {
        const tempDates: DayOfActivity[] = []
        coding.forEach(item => {
            tempDates.push({ day: item.day, running: false, coding: true, minutes: { running: 0, coding: item.minutes } })
        })
        runs.forEach(item => {
            tempDates.push({ day: item.day, running: true, coding: false, minutes: { running: item.minutes, coding: 0 } })
        })
        tempDates.sort((a, b) => {
            const date_a = new Date(a.day).getTime()
            const date_b = new Date(b.day).getTime()
            return date_a - date_b
        })

        const uniqueTempDates: DayOfActivity[] = [];
        tempDates.forEach((activity) => {
            const existingDay = uniqueTempDates.find((consolidated) => consolidated.day === activity.day);

            if (existingDay) {
                existingDay.running = existingDay.running || activity.running;
                existingDay.coding = existingDay.coding || activity.coding;
                existingDay.minutes.running = existingDay.minutes.running + activity.minutes.running
                existingDay.minutes.coding = existingDay.minutes.coding + activity.minutes.coding
            } else {
                uniqueTempDates.push(activity);
            }
        });
        return uniqueTempDates
    }, [runs, coding])

    useEffect(() => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        const tempLastDays: DayOfActivity[] = [];

        for (let i = 0; i < 30; ++i) {
            const foundItem = dates.find((item) => {
                const toCompare = new Date(item.day);
                toCompare.setHours(0, 0, 0, 0);
                return today.getTime() === toCompare.getTime();
            });

            if (foundItem) {
                tempLastDays.unshift({ day: foundItem.day, running: foundItem.running, coding: foundItem.coding, minutes: foundItem.minutes });
            } else {
                const day = today.getDate();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                const format = `${year}-${month}-${day}`;
                tempLastDays.unshift({ day: format, running: false, coding: false, minutes: { running: 0, coding: 0 } });
            }
            today.setDate(today.getDate() - 1);
        }

        setLastDays(tempLastDays);
    }, [dates]);



    return (
        <div>
            <div className="flex justify-around items-end flex-wrap mt-6 gap-4">
                {lastDays.slice(-5).map((item, i) => {
                    return <Day key={i} item={item} />
                })}
            </div>
        </div>
    )
}

export default Home