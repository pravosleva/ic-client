import Link from 'next/link'
import { useRouter } from 'next/router';
import ActiveLink from '../components/ActiveLink';

export default function PrivateLayout({ children }) {
    const router = useRouter();

    console.log(router);

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Dashboard</span>
                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar"
                        aria-controls="navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            <li className="nav-item">
                                <ActiveLink activeClassName="active" href="/posts">
                                    <a className="nav-link">
                                        Posts
                                    </a>
                                </ActiveLink>
                            </li>
                            <li className="nav-item">
                                <ActiveLink activeClassName="active" href="/users" as="/users/[id]">
                                    <a className="nav-link">
                                        Users
                                    </a>
                                </ActiveLink>
                            </li>
                        </ul>
                        <button className="btn btn-danger">Logout</button>
                    </div>
                </div>
            </nav>
            <div className="p-3">{children}</div>
        </>
    );
}
