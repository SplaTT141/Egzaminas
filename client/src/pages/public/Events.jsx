import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Events() {

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

    return (
        <div className="container">
                    <div className="d-flex flex-wrap">
                        <div className="bd-example-snippet bd-code-snippet col-8">
                            <div className="bd-example m-0 border-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>Renginiai</h1>
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
        </div>
    )
}