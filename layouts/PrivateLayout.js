import { useRouter } from 'next/router';
import ActiveLink from '../components/ActiveLink';
import AuthApi from '../api/AuthApi';
import { useApp } from '../contexts/AppContext';

export default function PrivateLayout({ children }) {
    const router = useRouter();
    const { isAuthenticated } = useApp();

    const logout = async () => {
        await AuthApi.logout();
        router.push('/login');
    }

    if (!isAuthenticated) {
        return <div>Loading</div>
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                <div className="container-fluid">
                    <span className="navbar-brand">Dashboard</span>
                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample03"
                        aria-controls="navbarsExample03"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="navbar-collapse collapse" id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
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
                </div>
            </nav>
            <div className="p-3">{children}</div>
        </>
    );
}
