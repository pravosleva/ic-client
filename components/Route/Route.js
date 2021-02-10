import { useRouter } from 'next/router';
import GuestLayout from '../../layouts/GuestLayout';
import PrivateLayout from '../../layouts/PrivateLayout';
import { useApp } from '../../contexts/AppContext';

export default function Route({ children }) {
    const { isAuthenticated, isLoading } = useApp();
    console.log(isAuthenticated);

    if (isAuthenticated === null || isAuthenticated === false) {
        return <GuestLayout>{children}</GuestLayout>;
    }
}

