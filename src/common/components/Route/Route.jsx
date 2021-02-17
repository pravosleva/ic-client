import GuestLayout from '~/common/layouts/GuestLayout';
import { useAuthContext } from '~/common/contexts/AuthContext';

export default function Route({ children }) {
    const { isAuthenticated } = useAuthContext();
    console.log(isAuthenticated);

    if (isAuthenticated === null || isAuthenticated === false) {
        return <GuestLayout>{children}</GuestLayout>;
    }
}
