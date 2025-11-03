import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { passwordIsInvalid, usernameOrEmailIsInvalid } from "../../lib/validation";
import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

export function Login() {
    const {login} = useContext(UserContext);

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [usernameOrEmailError, setUsernameOrEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        setUsernameOrEmailError('');
        setPasswordError('');
        setError('');

        let hasError = false;

        if (usernameOrEmailIsInvalid(usernameOrEmail)) {
            setUsernameOrEmailError(usernameOrEmailIsInvalid(usernameOrEmail));
            hasError = true;
        }

        if (passwordIsInvalid(password)) {
            setPasswordError(passwordIsInvalid(password));
            hasError = true;
        }

        if (hasError) return;

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                usernameOrEmail,
                password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    login(data.user.email, data.user.id);
                    navigate('/');
                } else {
                    setError(data.message)
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="d-flex justify-content-center flex-column col-6 col-lg-4 col-xl-3 order-2 order-lg-1">
                    <p className="text-center text-body h1 fw-bold mb-5 mt-4">Prisijungimas</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 fw-bold text-danger">{error}</div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill">
                                <input onChange={e=> setUsernameOrEmail(e.target.value)} type="text" id="username_or_email"
                                className={"form-control" + (usernameOrEmailError ? ' is-invalid' : '')} />
                                <label className="form-label" htmlFor="username_or_email">Vartotojo vardas arba el.
                                    paštas</label>
                                <div className="text-danger">{usernameOrEmailError}</div>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill">
                                <input onChange={e=> setPassword(e.target.value)} type="password" id="password"
                                className={"form-control" + (passwordError ? ' is-invalid': '')} />
                                <label className="form-label" htmlFor="password">Slaptažodis</label>
                                <div className="text-danger">{passwordError}</div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg">Prisijungti</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
