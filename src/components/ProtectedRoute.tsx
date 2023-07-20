import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { ReactNode, useEffect, useState } from 'react';

type PropsType = {
    children: ReactNode | ReactNode[]
}

const ProtectedRoute = ({ children }: PropsType) => {
    const { user } = UserAuth();
    const [state, setState] = useState<'pending' | 'fail' | 'success'>('pending')

    useEffect(() => {

        const timer = setTimeout(() => {
            setState('fail')
        }, 1000);

        if (user) {
            clearTimeout(timer)
            setState('success')
        }

        return () => clearTimeout(timer);

    }, [user])

    if (state === 'fail') {
        return <Navigate to='/login' />;
    }
    else if (state === 'pending') {
        return <div>Loading...</div>;
    }
    return children;
};

export default ProtectedRoute;