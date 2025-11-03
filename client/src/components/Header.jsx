import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user/UserContext";

export function Header() {

    const {isLoggedIn} = useContext(UserContext);

    return (
            <div className="container">
                <header
                    className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between py-3 mb-4 border-bottom">
                    <Link to="/"
                        className="d-flex gap-3 align-items-center link-body-emphasis text-decoration-none pe-4">
                    <span className="fs-4">Miestas miestelis</span>
                    </Link>
                    <ul className="d-flex align-items-center nav nav-pills">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" aria-current="page">Pagrindinis</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/events" className="nav-link">Renginiai</NavLink>
                        </li>
                    </ul>
                    <div className="text-end">
                        {
                        isLoggedIn
                        ?
                        <>
                            <Link to={"/logout"} className="btn btn-outline-primary me-2">Atsijungti</Link>
                            <Link to={"/admin/dashboard"} className="btn btn-primary">Valdymo skydelis</Link>
                        </>
                        :
                        <>
                            <Link to={"/login"} className="btn btn-outline-primary me-2">Prisijungti</Link>
                            <Link to={"/register"} className="btn btn-primary">Registruotis</Link>
                        </>
                        }
                    </div>
                </header>
            </div>
    )
}