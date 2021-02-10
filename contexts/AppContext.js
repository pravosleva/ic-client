import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const { pathname, events } = useRouter()
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');

        if (isLoggedIn) {
            setUser(true);
        } else {
            setUser(false);
        }
    }, [user]);

    useEffect(() => {
        const handleRouteChange = url => {
            if (url !== '/login' && user === false) {
                window.location.href = '/login'
            }
        }

        if (pathname !== '/login' && user === false) {
            window.location.href = '/login'
        }

        events.on('routeChangeStart', handleRouteChange)

        return () => {
            events.off('routeChangeStart', handleRouteChange)
        }
    }, [user])

    return <AppContext.Provider value={{ isAuthenticated: user }}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
