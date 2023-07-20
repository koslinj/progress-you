import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { ReactNode, useEffect, useState } from 'react';
//import { TailSpin } from 'react-loader-spinner';

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
        return (
            // <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            //     <TailSpin
            //         height="160"
            //         width="160"
            //         color="#ffffff"
            //         ariaLabel="tail-spin-loading"
            //         radius="1"
            //         wrapperStyle={{}}
            //         wrapperClass=""
            //         visible={true}
            //     />
            // </div>
            <div>LOADER.....</div>
        )
    }
    return children;
};

export default ProtectedRoute;