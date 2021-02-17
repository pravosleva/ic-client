import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthApi from '../api/AuthApi';

const AuthContext = createContext({});

const log = (arg) => {
    switch (true) {
        case arg instanceof Error:
            console.log(arg.message);
            break;
        case typeof arg === 'object':
            console.table(arg);
            break;
        case typeof arg === 'string':
        default:
            console.log(arg);
    }
};

export const AuthProvider = ({ children }) => {
    const { pathname, events, push } = useRouter();
    const [isLogged, setIsLogged] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleRouteChange = async (url) => {
            setIsLoading(true);
            const isLoggedIn = await AuthApi.checkMyToken()
                .then((val) => {
                    log(`TOKEN CHECKED: ${val}`);
                    return true;
                })
                .catch((err) => {
                    log(err);
                    return false;
                });

            log(`ROUTER LOG: ${url} | isLoggedIn= ${isLoggedIn}`);

            setIsLogged(isLoggedIn);
            setIsLoading(false);

            switch (true) {
                case url !== '/login' && !isLoggedIn:
                    push('/login');
                    break;
                case url === '/login' && isLoggedIn:
                    push('/posts');
                    break;
                default:
                    break;
            }
        };
        handleRouteChange(pathname);

        events.on('routeChangeStart', handleRouteChange);

        return () => {
            events.off('routeChangeStart', handleRouteChange);
        };
    }, [setIsLogged, setIsLoading]);

    return <AuthContext.Provider value={{ isAuthenticated: isLogged, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
