import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from 'swiper/modules';
import PieChart from "./PieChart"
import { useCalories } from "../../context/CaloriesContext"
import 'swiper/css';
import SlidePrevButton from "./SlidePrevButton";
import SlideNextButton from "./SlideNextButton";
import { useMediaQuery } from "@react-hook/media-query";

const CaloriesSwiper = () => {
    const { calories } = useCalories()
    const large = useMediaQuery('(min-width: 1200px)')
    const medium = useMediaQuery('(min-width: 700px)')
    
    const tailwindColors = ['bg-[red]', 'bg-[#5F7FFF]', 'bg-[#FCEF3B]',]

    return (
        <>
            <Swiper
                slidesPerView={large ? 4 : medium ? 2 : 1}
                freeMode={true}
                modules={[FreeMode]}
                className="mt-8 relative w-screen"
            >
                <SlidePrevButton />
                {calories ? calories.map((macro, i) => {
                    return (
                        <SwiperSlide className="flex flex-col items-center" key={i}>
                            <PieChart macro={macro} />
                        </SwiperSlide>
                    )
                }) : <div>Loading...</div>}
                <SlideNextButton />
            </Swiper >
            <div className="flex justify-center gap-x-10 items-center flex-wrap mt-4">
                <div className="flex justify-center items-center gap-1 lg:gap-2">
                    <div className={`w-6 h-6 ${tailwindColors[0]}`} />
                    <p className="text-lg lg:text-2xl ">carbs</p>
                </div>
                <div className="flex justify-center items-center gap-1 lg:gap-2">
                    <div className={`w-6 h-6 ${tailwindColors[1]}`} />
                    <p className="text-lg lg:text-2xl ">protein</p>
                </div>
                <div className="flex justify-center items-center gap-1 lg:gap-2">
                    <div className={`w-6 h-6 ${tailwindColors[2]}`} />
                    <p className="text-lg lg:text-2xl ">fat</p>
                </div>
            </div>
        </>
    )
}

export default CaloriesSwiper