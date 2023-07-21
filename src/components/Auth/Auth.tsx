import { useState } from 'react'
import Register from './Register'
import Login from './Login'

const Auth = () => {
    const [newUser, setNewUser] = useState(false)

    return (
        <div className='overflow-x-hidden overflow-y-hidden relative h-screen'>
            <Login newUser={newUser} setNewUser={setNewUser} />
            <Register newUser={newUser} setNewUser={setNewUser} />
        </div>
    )
}

export default Auth