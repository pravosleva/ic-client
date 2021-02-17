import { useRouter } from 'next/router';
import ActiveLink from '../components/ActiveLink';
import AuthApi from '../../utils/httpClient/api/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

export default function PrivateLayout({ children }) {
    const router = useRouter();
    const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();

    const logout = async () => {
        await AuthApi.logout()
            .then(() => {
                router.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (isAuthLoading) {
        return <div>Checking auth...</div>;
    }
    if (!isAuthenticated) {
        return <div>You should be logged.</div>;
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Dashboard</span>
                    <ul className="navbar-nav nav-flat me-auto">
                        <li className="nav-item">
                            <ActiveLink activeClassName="active" href="/posts">
                                <a className="nav-link">Posts</a>
                            </ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink activeClassName="active" href="/users" as="/users">
                                <a className="nav-link">Users</a>
                            </ActiveLink>
                        </li>
                    </ul>
                    <button className="btn btn-danger" onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className="p-3">{children}</div>
        </>
    );
}
