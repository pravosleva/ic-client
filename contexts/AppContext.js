import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import GuestLayout from '../layouts/GuestLayout';
import PrivateLayout from '../layouts/PrivateLayout';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');

        if (isLoggedIn) {
            setUser(true);
        }
    }, [user]);

    return <AppContext.Provider value={{ isAuthenticated: user }}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
