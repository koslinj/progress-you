import { useCalories } from "../../context/CaloriesContext"
import NewMacro from "./NewMacro"
import PieChart from "./PieChart"

const Calories = () => {
    const { calories } = useCalories()

    return (
        <>
            <div className="flex items-center justify-center">
                {calories ? calories.map((macro, i) => {
                    return (
                        <div key={i} className={`h-[250px] w-[250px] m-8 rounded-2xl text-black`}>
                            <PieChart macro={macro} />
                        </div>
                    )
                }) : <div>Loading...</div>}
            </div>
            <NewMacro />
        </>
    )
}

export default Calories