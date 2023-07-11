import React from 'react'
import { ActivityType } from '../App'
import { Cords } from './Header'
import runIcon from '../icons/running_icon.png'
import codeIcon from '../icons/code_icon.png'
import homeIcon from '../icons/home_icon.png'
import { useTheme } from '../context/ThemeContext'

type PropsType = {
    setActivity: React.Dispatch<React.SetStateAction<ActivityType>>
    setPosition: React.Dispatch<React.SetStateAction<Cords>>
    storedPosition: React.MutableRefObject<HTMLImageElement | null>
}

const NavIcons = ({ setActivity, setPosition, storedPosition }: PropsType) => {
    const { setColor } = useTheme()

    const animateToIcon = (event: React.MouseEvent<HTMLImageElement>) => {
        const targetPosition = (event.target as HTMLElement).getBoundingClientRect();
        storedPosition.current = event.target as HTMLImageElement
        setPosition({
            x: targetPosition.left,
            y: targetPosition.top,
        });
    };

    return (
        <>
            <img
                className='z-10 h-12 absolute top-4 left-4 transition-all'
                onClick={(event: React.MouseEvent<HTMLImageElement>) => {
                    animateToIcon(event)
                    setActivity('home')
                    setColor('bg-slate-500')
                }}
                src={homeIcon}
                alt='Home Icon'
            />
            <img
                className='z-10 h-12 transition-all'
                onClick={(event: React.MouseEvent<HTMLImageElement>) => {
                    animateToIcon(event)
                    setActivity('coding')
                    setColor('bg-blue-700')
                }}
                src={codeIcon}
                alt='Coding Icon'
            />
            <img
                className='z-10 h-12 transition-all'
                onClick={(event: React.MouseEvent<HTMLImageElement>) => {
                    animateToIcon(event)
                    setActivity('running')
                    setColor('bg-red-700')
                }}
                src={runIcon}
                alt='Running Icon'
            />
        </>
    )
}

export default NavIcons