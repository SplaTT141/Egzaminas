import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="container">
            <div className="row">
                <div className="custom-bg text-dark">
                    <div className="d-flex align-items-center justify-content-center m-5">
                        <div className="text-center">
                            <h1 className="display-1 fw-bold">404</h1>
                            <p className="fs-2 fw-medium mt-4">Uups! Puslapis nerastas</p>
                            <p className="mt-4 mb-5">Puslapis, kurio ieškote, neegzistuoja arba buvo perkeltas.</p>
                            <Link to='/' className="btn btn-primary fw-semibold rounded-pill px-4 py-2 custom-btn">
                                Grįžti į pagrininį pusalapį
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}