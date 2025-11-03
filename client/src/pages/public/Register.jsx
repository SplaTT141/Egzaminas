import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { usernameIsInvalid, emailIsInvalid, passwordIsInvalid, passwordRepeatIsInvalid } from "../../lib/validation";

export function Register() {

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');

    const [tos, setTos] = useState(false);
    const [tosError, setTosError] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

                setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setPasswordRepeatError('');
        setTosError('');

        let hasError = false;

        if (usernameIsInvalid(username)) {
            setUsernameError(usernameIsInvalid(username));
            hasError = true;
        }
        
        if (emailIsInvalid(email)) {
            setEmailError(emailIsInvalid(email));
            hasError = true;
        }
        
        if (passwordIsInvalid(password)) {
            setPasswordError(passwordIsInvalid(password));
            hasError = true;
        }
        
        if (passwordRepeatIsInvalid(passwordRepeat, password)) {
            setPasswordRepeatError(passwordRepeatIsInvalid(passwordRepeat, password));
            hasError = true;
        }
        
        if (!tos) {
            setTosError('Privalote sutikti su vartotojo sąlygomis');
            hasError = true;
        }
        
        if (hasError) return;
        
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'error') {
                    setError(data.message);
                } else {
                    navigate('/login');
                }
            })
            .catch(error => console.log(error))

    };

    return (
    <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="d-flex justify-content-center flex-column col-6 col-xl-4 order-2 order-lg-1">
                <p className="text-center text-body h1 fw-bold mb-5 mt-4">Registracija</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 fw-bold" style={{color: 'red'}}>{error}</div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill">
                            <input onChange={e=> setUsername(e.target.value)}
                            type="text"
                            id="username"
                            className={"form-control" + (usernameError ? ' is-invalid' : '')}
                            />
                            <label className="form-label" htmlFor="username">Vartotojo vardas</label>
                            <div style={{color: 'red'}}>{usernameError}</div>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill">
                            <input onChange={e=> setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className={"form-control" + (emailError ? ' is-invalid' : '')}
                            />
                            <label className="form-label" htmlFor="email">El. paštas</label>
                            <div style={{color: 'red'}}>{emailError}</div>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill">
                            <input onChange={e=> setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className={"form-control" + (passwordError ? ' is-invalid' : '')}
                            />
                            <label className="form-label" htmlFor="password">Slaptažodis</label>
                            <div style={{color: 'red'}}>{passwordError}</div>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill">
                            <input onChange={e=> setPasswordRepeat(e.target.value)}
                            type="password"
                            id="password_confirm"
                            className={"form-control" + (passwordRepeatError ? ' is-invalid' : '')}
                            />
                            <label className="form-label" htmlFor="password_confirm">Pakartokite slaptažodį</label>
                            <div style={{color: 'red'}}>{passwordRepeatError}</div>
                        </div>
                    </div>
                    <div className="form-check text-body d-flex justify-content-start">
                        <input onChange={e=> setTos(e.target.checked)}
                        className={"form-check-input me-2" + (tosError ? ' is-invalid' : '')}
                        type="checkbox"
                        value=""
                        id="checkbox"
                        />
                        <label className="form-check-label" htmlFor="checkbox">Sutinku su vartotojo sąlygomis</label>
                    </div>
                    <div className="mb-3" style={{color: 'red'}}>{tosError}</div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Registruotis</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
