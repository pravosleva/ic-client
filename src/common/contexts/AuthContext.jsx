import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthApi from '~/utils/httpClient/api/AuthApi';
import { log } from '~/utils/log';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const { pathname, events, push } = useRouter();
    const [isLogged, setIsLogged] = useState(false);
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
                case url !== '/' && !isLoggedIn:
                    push('/');
                    break;
                case url === '/' && isLoggedIn:
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
