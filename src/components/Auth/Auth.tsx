import { useState } from 'react'
import Register from './Register'
import Login from './Login'

const Auth = () => {
    const [newUser, setNewUser] = useState(false)

    return (
        newUser ? <Register setNewUser={setNewUser} /> : <Login setNewUser={setNewUser} />
    )
}

export default Auth