import { useRouter } from 'next/router';
import GuestLayout from '../../layouts/GuestLayout';
import PrivateLayout from '../../layouts/PrivateLayout';
import { useApp } from '../../contexts/AppContext';

export default function Route({ children }) {
    const { isAuthenticated, isLoading } = useApp();
    const router = useRouter();

    // if (isAuthenticated) {
    //     if (typeof window !== 'undefined') {
    //         router.push('/posts');
    //     }
    // }

    if (!isAuthenticated) {
        return <GuestLayout>{children}</GuestLayout>;
    } else {
        return <PrivateLayout>{children}</PrivateLayout>;
    }
}
