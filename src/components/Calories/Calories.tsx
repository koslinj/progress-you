import NewMacro from "./NewMacro"
import CaloriesSwiper from "./CaloriesSwiper";
import { useMemo } from "react";
import { MacroType, useCalories } from "../../context/CaloriesContext";

const Calories = () => {
    const { calories } = useCalories()

    const calculateAverage = (calories: MacroType[]) => {
        const total = calories.reduce(
            (acc, curr) => ({
                carbs: acc.carbs + curr.carbs,
                protein: acc.protein + curr.protein,
                fat: acc.fat + curr.fat,
                kcal: acc.kcal + curr.kcal,
            }),
            { carbs: 0, protein: 0, fat: 0, kcal: 0 }
        );

        const numObjects = calories.length;

        return {
            carbs: total.carbs / numObjects,
            protein: total.protein / numObjects,
            fat: total.fat / numObjects,
            kcal: total.kcal / numObjects,
        };
    };

    const averageMacroValues = useMemo(() => calculateAverage(calories), [calories]);

    return (
        <div className='flex flex-col items-center'>
            <CaloriesSwiper />
            <NewMacro />
            <h1 className="text-center text-5xl my-8">Macros Statistics</h1>
            <div className="flex justify-center flex-wrap gap-8">
                <div>
                    <h2 className="text-center text-2xl">Average Kcal: </h2>
                    <p className="text-center text-3xl tracking-widest font-semibold">{averageMacroValues.kcal.toFixed(1)}</p>
                </div>
                <div>
                    <h2 className="text-center text-2xl">Average Macros: </h2>
                    <p className="text-center text-2xl"><span className="font-semibold text-3xl tracking-widest">{averageMacroValues.carbs.toFixed(1)}</span> carbs</p>
                    <p className="text-center text-2xl"><span className="font-semibold text-3xl tracking-widest">{averageMacroValues.protein.toFixed(1)}</span> protein</p>
                    <p className="text-center text-2xl"><span className="font-semibold text-3xl tracking-widest">{averageMacroValues.fat.toFixed(1)}</span> fat</p>
                </div>
            </div>
        </div>
    )
}

export default Calories