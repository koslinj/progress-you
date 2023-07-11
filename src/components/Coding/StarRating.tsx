import starIconEmpty from '../../icons/star_icon_empty.png';
import starIconFilled from '../../icons/star_icon_filled.png';
import { DifficultyType } from '../../context/CodingContext';

type PropsType = {
    difficulty: DifficultyType
    setDifficulty: React.Dispatch<React.SetStateAction<DifficultyType>>
}

const StarRating = ({ difficulty, setDifficulty }: PropsType) => {

    const handleClick = (starIndex: DifficultyType) => {
        setDifficulty(starIndex);
    };

    const starElements = [];
    for (let i:DifficultyType = 1; i < 6; i++) {
        const starIcon = i <= difficulty ? starIconFilled : starIconEmpty;
        starElements.push(
            <img
                key={i}
                className={`star hover:scale-125 ${i <= difficulty ? 'filled' : ''}`}
                src={starIcon}
                alt='Star Icon'
                onClick={() => handleClick(i)}
            />
        );
    }

    return (
        <div className='flex justify-start items-center gap-3 px-2'>
            {starElements}
        </div>
    );
};

export default StarRating;
