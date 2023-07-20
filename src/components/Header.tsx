import React, { useEffect, useRef, useState } from 'react'
import { ActivityType } from '../App'
import NavIcon from './NavIcons'
import { useTheme } from '../context/ThemeContext'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logoutIcon from '../icons/logout_icon.png'

type PropsType = {
    setActivity: React.Dispatch<React.SetStateAction<ActivityType>>
}

export type Cords = {
    x: number,
    y: number
}

const Header = ({ setActivity }: PropsType) => {
    const { color } = useTheme()
    const [position, setPosition] = useState<Cords>({ x: 16, y: 16 });
    const storedPosition = useRef<HTMLImageElement | null>(null);

    const { logout } = UserAuth();

    useEffect(() => {
        const handleResize = () => {
            if (storedPosition.current) {
                const pos = storedPosition.current.getBoundingClientRect();
                setPosition({
                    x: pos.left,
                    y: pos.top,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            console.log('You are logged out')
        } catch (e) {
            console.log(e);
        }
    };

    const content = (
        <div className={`flex p-4 gap-8 justify-end items-center ${color} rounded-b-[30px]`}>
            <div
                className="w-16 h-16 bg-white rounded-[40%] transition-all duration-300 absolute top-0 left-0"
                style={{ transform: `translate(${position.x - 8}px, ${position.y - 8}px)` }}
            />
            <NavIcon
                setActivity={setActivity}
                setPosition={setPosition}
                storedPosition={storedPosition}
            />
            <button onClick={handleLogout} className='flex flex-col items-center '>
                <img className='w-10' src={logoutIcon} alt="Logout Icon" />
                <p className='text-sm font-semibold text-black -mt-2'>Logout</p>
            </button>
        </div>
    )

    return content
}

export default Header