import { Link } from "react-router-dom";

export function Footer() {
    return (
    <div className="container">
        <footer className="pt-5 mt-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Pagrindins</Link></li>
                <li className="nav-item"><Link to="/events" className="nav-link px-2 text-body-secondary">Renginiai</Link></li>
            </ul>
            <p className="text-center text-body-secondary">© 2025 Company, Inc</p>
        </footer>
    </div>
    )
}
