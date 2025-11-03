import { Link } from "react-router-dom"

export function LoginRequired() {
    return (
            <div className="text-center">
                <h1>Būtina prisijungti!</h1>
                <Link to='/login' className="btn btn-primary mt-3">Prisijungti</Link>
            </div>
    )
}