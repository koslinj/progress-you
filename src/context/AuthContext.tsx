import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { auth } from '../firebase';

const useUserContext = () => {
    const [user, setUser] = useState<User | null>(null);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return {user, createUser, signIn, logout}
}

type valueType = ReturnType<typeof useUserContext>

const UserContext = createContext<valueType | null>(null);

type PropsType = {
    children: ReactNode | ReactNode[]
}

export const AuthProvider = ({ children }: PropsType) => {
    const value = useUserContext()

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    const context = useContext(UserContext)

    if (context === null) {
        throw new Error('There is no provider for AuthContext')
    }

    return context
};