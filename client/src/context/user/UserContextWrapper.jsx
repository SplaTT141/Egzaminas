import { useEffect, useState } from "react"
import { UserContext } from "./UserContext";
import { initialUserContext } from "./initialUserContext"

export function UserContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialUserContext.isLoggedIn);
    const [role, setRole] = useState(initialUserContext.role);
    const [username, setUsername] = useState(initialUserContext.username);
    const [email, setEmail] = useState(initialUserContext.email);
    const [id, setId] = useState(initialUserContext.id);

    useEffect(() => {
        fetch('http://localhost:5000/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    login(data.user.username, data.user.email, data.user.id);
                }
            })
            .catch(error => console.log(error));
    }, []);

    function login(username, email, id) {
        setIsLoggedIn(true);
        setRole('admin');
        setUsername(username);
        setEmail(email);
        setId(id);
    }
    
    async function logout() {
        try {
              const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include',
            })

            if (response.ok) {
                setIsLoggedIn(false);
                setRole('public');
                setEmail('');
                setId('');
            }
        } catch(error) {
            console.log(error);
        }
    }

    const values = {
        isLoggedIn,
        role,
        username,
        email,
        id,
        login,
        logout
    }

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    )
}
