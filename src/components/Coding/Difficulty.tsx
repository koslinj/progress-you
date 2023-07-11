import starIcon from '../../icons/star_icon.png'

type PropsType = {
    difficulty: number
}
const Difficulty = ({ difficulty }: PropsType) => {

    const imageElements = []
    for (let i = 0; i < difficulty; i++) {
        imageElements.push(<img key={i} className='w-6' src={starIcon} alt="Star Icon" />)
    }

    return (
        <div className='flex justify-start items-center gap-1 px-1'>
            {imageElements}
        </div>
    )
}

export default Difficulty