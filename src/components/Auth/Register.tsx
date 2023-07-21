import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { AUTH_ERRORS } from '../../firebase';

type PropsType = {
    newUser: boolean
    setNewUser: React.Dispatch<React.SetStateAction<boolean>>
}

const Register = ({ newUser, setNewUser }: PropsType) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { createUser } = UserAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(email, password)
            navigate('/')
        } catch (e: any) {
            let message = ''
            if (Object.keys(AUTH_ERRORS).includes(e.code)) message = AUTH_ERRORS[e.code]
            else message = 'Unknown error!'
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
        }
    };

    const style = newUser ? 'left-1/2 scale-100' : '-left-1/3 scale-50'

    return (
        <>
            <div className={`flex flex-col duration-500 ${style} p-6 mx-auto text-black rounded-2xl bg-slate-200 absolute top-1/2 -translate-y-1/2 -translate-x-1/2`}>
                <div>
                    <h1 className='text-2xl font-bold py-2 text-center'>Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col py-2'>
                        <label className='py-2 font-medium'>Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label className='py-2 font-medium'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
                    </div>
                    <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                        Sign Up
                    </button>
                </form>
                <button onClick={() => setNewUser(false)} className='hover:text-purple-800 duration-200 cursor-pointer underline mt-2'>
                    Already have an account? Sign in.
                </button>
            </div>
        </>
    );
};

export default Register;