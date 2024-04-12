// useAuth.js
import { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create a context for the auth state
const AuthContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook that enables any component to subscribe to auth state
export const useAuth = () => {
    return useContext(AuthContext);
};
