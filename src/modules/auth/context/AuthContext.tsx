import { useState, useEffect, createContext, FC } from 'react';
import { firebaseAuth, firebase } from '../../../core/services/firebase';

export const AuthContext = createContext<firebase.User | null>(null);

export const AuthProvider: FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const auth = firebaseAuth.onAuthStateChanged(firebaseUser =>
            setUser(firebaseUser)
        );

        return auth;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
