import NewMacro from "./NewMacro"
import CaloriesSwiper from "./CaloriesSwiper";

const Calories = () => {


    return (
        <div className='flex flex-col items-center'>
            <CaloriesSwiper />
            <NewMacro />
        </div>
    )
}

export default Calories