import { Progress } from "flowbite-react"


const Countdown = () => {
    const start = new Date(2023, 1, 20)
    const halfMarathonDate = new Date(2023, 7, 20)
    const today = new Date(Date.now())

    const wholeDiff = halfMarathonDate.getTime() - start.getTime()
    const actualDiff = today.getTime() - start.getTime()

    const part = Math.floor(actualDiff / wholeDiff * 100)

    return (
        <>
            <p className='mt-16 italic text-2xl text-center'>Today:<br />{today.getDate()} / {today.getMonth() + 1} / {today.getFullYear()}</p>
            <div className='w-4/5 flex-col justify-between items-center flex-wrap'>
                <Progress progress={part} size='xl' color='red' />
                <div className='flex justify-between'>
                    <p className='italic text-xl text-center'>Start<br />{start.getDate()} / {start.getMonth() + 1} / {start.getFullYear()}</p>
                    <p className='italic text-xl text-center'>Half-Marathon<br />{halfMarathonDate.getDate()} / {halfMarathonDate.getMonth() + 1} / {halfMarathonDate.getFullYear()}</p>
                </div>
            </div>
        </>
    )
}

export default Countdown