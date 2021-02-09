export default function PrivateLayout({ children }) {
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
                            <li className="nav-item active">
                                <a className="nav-link" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                        </ul>
                        <button>Logout</button>
                    </div>
                </div>
            </nav>
            <div className="pt-3">{children}</div>
        </>
    );
}
