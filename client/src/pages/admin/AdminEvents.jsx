import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useEffect, useState } from "react"
import { LoginRequired } from "../../components/LoginRequired";
import { Sidebar } from "../../components/Sidebar";
import { Link } from "react-router-dom";

export function AdminEvents() {
    const {isLoggedIn} = useContext(UserContext);

        const [event, setEvent] = useState([]);
        const [error, setError] = useState('');``
    
        useEffect(() => {
            fetch('http://localhost:5000/events', {
                method: 'GET',
                credentials:'include',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        setEvent(data.events);
                    } else {
                        setError('Nepavyko įkelti renginių');
                    }
                })
                .catch(error => console.log(error));
        }, [])

        async function handleClickDeleteEvent(id) {
            const confirmDelete = window.confirm("Ar tikrai norite ištrinti šią paslaugą?");
            if (!confirmDelete) return;

            try {
                await fetch(`http://localhost:5000/admin/events/${id}`, {
                    method: 'DELETE',
                    credentials: "include",
                })
            } catch (error) {
                console.log(error);
            }

            setEvent(prev => prev.filter(event => event.id !== id));
        }

    return (
        <div className="container-fluid">
            {
                isLoggedIn
                    ?
                    <div className="d-flex flex-wrap">
                        <Sidebar />
                        <div className="bd-example-snippet bd-code-snippet col-8">
                            <div className="bd-example m-0 border-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>Renginiai</h1>
                                    <Link to={'/admin/event/add'} className="btn btn-success">Pridėti paslaugą +</Link>
                                </div>
                                <div className="mb-3 fw-bold" style={{color: 'red'}}>{error}</div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nuotrauka</th>
                                            <th scope="col">Pavadinimas</th>
                                            <th scope="col">Kategorija</th>
                                            <th scope="col">Laikas</th>
                                            <th scope="col">Vieta</th>
                                            <th scope="col">Veiksmai</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(event)
                                            ?
                                            event.map((event, index) => (
                                                <tr key={index}>
                                          <th>{index + 1}</th>
                                          <th>
                                              <img src={event.img ? `/img/${event.img}`
                                                  : '/img/default.png' } alt={event.name}
                                                  style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                                                  onError={(e)=> { e.target.src = '/img/default.png'; }}
                                              />
                                            </th>
                                             <td>{event.name}</td>
                                             <td>{event.category}</td>
                                             <td>{event.time}</td>
                                                    <td>{event.place}</td>
                                                    <td>
                                                        <Link to={`edit/${event.id}`} className="btn btn-warning me-2">Redaguoti</Link>
                                                        <button onClick={() => handleClickDeleteEvent(event.id)} className="btn btn-danger">Panaikinti</button>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan="4">Kraunasi...</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    <LoginRequired />
            }
        </div>
    )
}