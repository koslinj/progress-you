import { useEffect, useMemo, useState } from "react"
import { useCoding } from "../../context/CodingContext"
import { useRuns } from "../../context/RunsContext"
import Day from "./Day"
import leftIcon from '../../icons/left.png'
import rightIcon from '../../icons/right.png'
import { ToastContainer, toast } from "react-toastify"

export type DayOfActivity = {
    day: string
    running: boolean
    coding: boolean
    minutes: { running: number, coding: number }
}

const amountOfPastDays = 60

const ActivitiesSlider = () => {
    const { coding } = useCoding()
    const { runs } = useRuns()
    const [lastDays, setLastDays] = useState<DayOfActivity[]>([])
    const [diff, setDiff] = useState(0)
    
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

        for (let i = 0; i < amountOfPastDays; ++i) {
            const foundItem = dates.find((item) => {
                const toCompare = new Date(item.day);
                toCompare.setHours(0, 0, 0, 0);
                return today.getTime() === toCompare.getTime();
            });

            if (foundItem) {
                tempLastDays.unshift({ day: foundItem.day, running: foundItem.running, coding: foundItem.coding, minutes: foundItem.minutes });
            } else {
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                const format = `${year}-${month}-${day}`;
                tempLastDays.unshift({ day: format, running: false, coding: false, minutes: { running: 0, coding: 0 } });
            }
            today.setDate(today.getDate() - 1);
        }

        setLastDays(tempLastDays);
    }, [dates]);

    const handleDecrease = () => {
        if(diff===-(amountOfPastDays-5)) return toast.error(`You can only see past ${amountOfPastDays} days!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        });
        setDiff(prev => prev - 5)
    }

    const handleIncrease = () => {
        if(diff===0) return toast.error('There is nothing in the future!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        });
        setDiff(prev => prev + 5)
    }

    return (
        <div>
            <div onClick={handleDecrease} className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:scale-125 duration-300 absolute top-60 -translate-y-1/2 left-4">
                <img className="w-8 md:w-16" src={leftIcon} alt="Left Icon" />
            </div>
            <div className="flex justify-around items-center flex-wrap gap-4 mx-20 md:mx-28 mt-12">
                {diff
                ? lastDays.slice(-5 + diff, diff).map((item, i) => {
                    return <Day key={i} item={item} />
                })
                : lastDays.slice(-5).map((item, i) => {
                    return <Day key={i} item={item} />
                })
                }
            </div>
            <div onClick={handleIncrease} className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:scale-125 duration-300 absolute top-60 -translate-y-1/2 right-4">
                <img className="w-8 md:w-16" src={rightIcon} alt="Right Icon" />
            </div>
            <ToastContainer />
        </div>
    )
}

export default ActivitiesSlider