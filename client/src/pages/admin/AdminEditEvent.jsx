import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { LoginRequired } from "../../components/LoginRequired";
import { eventNameIsValid, eventCategoryIsValid, eventPlaceIsValid } from "../../lib/validation";

export function AdminEditEvent() {
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const { id } = useParams();
    const [eventData, setEventData] = useState('');
    
    const [nameError, setNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [placeError, setPlaceError] = useState('');
    
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/events', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const filtered = data.events.find(s => s.id === Number(id));
                    if (filtered) {
                        setEventData(filtered);
                    } else {
                        setError('Toks renginis nerastas');
                    }
                } else {
                    setError('Toks renginis nerastas');
                }
            })
            .catch(error => console.log(error));
        }, [id])

        function handleSubmit(e) {
            e.preventDefault();

            const {id, name, category, time, place} = eventData;

            setNameError('');
            setCategoryError('');
            setPlaceError('');

            let hasError = false;

            if (eventNameIsValid(name)) {
            setNameError(eventNameIsValid(name));
            hasError = true;
            }

            if (eventCategoryIsValid(category)) {
            setCategoryError(eventCategoryIsValid(category));
            hasError = true;
            }

            if (eventPlaceIsValid(place)) {
            setPlaceError(eventPlaceIsValid(place));
            hasError = true;
            }

            if (hasError) return;

            fetch(`http://localhost:5000/admin/event/edit`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    name,
                    category,
                    time,
                    place
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'error') {
                        setError(data.message);
                    } else {
                        navigate('/admin/events')
                    }
                })
        }

    return (
        <div className="container-fluid">
            {
                isLoggedIn
                ?
                <div className="d-flex flex-wrap">
                    <Sidebar />
                    <div>
                        <h1>Renginio redagavimas</h1>
                        <div className="mb-3 fw-bold" style={{color: 'red'}}>{error}</div>
                        <form onSubmit={handleSubmit}>
                            <div htmlFor="service" className="form-label">ID:
                                <span className="text-primary"> {eventData.id}</span>
                            </div>
                            <label htmlFor="name" className="form-label">Renginio pavadinimas</label>
                            <input onChange={(e) => setEventData({...eventData, name:e.target.value})} type="text" id="name" className="form-control" value={eventData.name ?? ''} required />
                            <div style={{color: 'red'}}>{nameError}</div>
                            <label htmlFor="category" className="form-label">Kategorija</label>
                            <input onChange={(e) => setEventData({...eventData, category:e.target.value})} type="text" id="category" className="form-control" value={eventData.category ?? ''} required />
                            <div style={{color: 'red'}}>{categoryError}</div>
                            <label htmlFor="price" className="form-label">Laikas</label>
                            <input onChange={(e) => setEventData({...eventData, time:e.target.value})} type="time" id="price" className="form-control" value={eventData.time ?? ''} required />
                            <label htmlFor="place" className="form-label">Vietas</label>
                            <input onChange={(e) => setEventData({...eventData, place:e.target.value})} type="text" id="place" className="form-control" value={eventData.place ?? ''} required />
                            <div style={{color: 'red'}}>{placeError}</div>
                            {/* <div style={{color: 'red'}}>{timeError}</div> */}
                            <button type="submit" className="btn btn-primary mt-4">Patvirtinti</button>
                            <Link to={'/admin/services'} className="btn btn-danger mt-4 ms-2">Atšaukti</Link>
                        </form>
                    </div>
                </div>
                : <LoginRequired />
            }
        </div>
    )
}