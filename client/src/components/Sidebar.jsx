import { Link, NavLink } from "react-router-dom"

export function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light p-3 pb-5 me-5 mb-3" style={{width: '280px', borderRadius: '15px'}}>
            <div className="row">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <span className="fs-4">Valdymo skydelis</span>
                </Link>
                <ul className="nav nav-pills flex-column mt-4">
                    <li className="nav-item">
                        <NavLink to="/admin/events" className="nav-link">Renginiai</NavLink>
                        <NavLink to="/admin/event/add" className="nav-link">Sukurti renginį</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}