import { useRouter } from 'next/router';
import ActiveLink from '../components/ActiveLink';
import AuthApi from '../api/AuthApi';
import { useApp } from '../contexts/AppContext';

export default function PrivateLayout({ children }) {
    const router = useRouter();
    const { isAuthenticated } = useApp();

    const logout = async () => {
        await AuthApi.logout();
        router.push('/');
    }

    if (!isAuthenticated) {
        return <div>Loading</div>
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Dashboard</span>
                    <ul className="navbar-nav nav-flat me-auto">
                        <li className="nav-item">
                            <ActiveLink activeClassName="active" href="/posts">
                                <a className="nav-link">
                                    Posts
                                </a>
                            </ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink activeClassName="active" href="/users" as="/users">
                                <a className="nav-link">
                                    Users
                                </a>
                            </ActiveLink>
                        </li>
                    </ul>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            </nav>
            <div className="p-3">{children}</div>
        </>
    );
}
