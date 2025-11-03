import { Sidebar } from "../../components/Sidebar";
import { LoginRequired } from "../../components/LoginRequired";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useNavigate } from "react-router-dom";
import { eventNameIsValid, eventCategoryIsValid, eventPlaceIsValid } from "../../lib/validation";

export function AdminAddEvent() {
  const { isLoggedIn } = useContext(UserContext);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [category, setCategory] = useState(0);
  const [categoryError, setCategoryError] = useState('');

  const [time, setTime] = useState(0);
  const [timeError, setTimeError] = useState('');

  const [place, setPlace] = useState(0);
  const [placeError, setPlaceError] = useState('');

  const [image, setImage] = useState('default.png');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    setNameError('');
    setCategoryError('');
    setTimeError('');
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

    fetch('http://localhost:5000/admin/event/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        category,
        time,
        place,
        image
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'error') {
          setError(data.message);
        } else {
          navigate('/admin/events');
        }
      })
      .catch(error => console.log(error))
  }

    function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(`${file.name}`);
    } else {
      setImage('default.png');
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {isLoggedIn ? (
        <div className="d-flex flex-wrap">
          <Sidebar />
          <div
            className="bd-example-snippet bd-code-snippet w-md-75 w-lg-50 col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8">
            <div className="bd-example m-0 border-0">
              <h1>Pridėti renginį</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 fw-bold" style={{color: 'red'}}>{error}</div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Renginio pavadinimas</label>
                  <input onChange={e=> setName(e.target.value)}
                  type="text"
                  id="name"
                  className="form-control"
                  required
                  />
                  <div style={{color: 'red'}}>{nameError}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Kategorija</label>
                  <input onChange={e=> setCategory(e.target.value)}
                  type="text"
                  className="form-control"
                  id="category"
                  required
                  />
                  <div style={{color: 'red'}}>{categoryError}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Laikas ir data</label>
                  <input onChange={e=> setTime(e.target.value)}
                  type="time"
                  id="time"
                  className="form-control"
                  required
                  />
                  <div style={{color: 'red'}}>{timeError}</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="place" className="form-label">Vieta</label>
                  <input onChange={e=> setPlace(e.target.value)} type="text" id="place" className="form-control" required />
                  <div style={{color: 'red'}}>{placeError}</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Nuotrauka</label>
                    <input onChange={handleImageChange} type="file" id="image" className="form-control"
                      accept="image/*" />
                  </div>
                <button type="submit" className="btn btn-primary mt-3">Patvirtinti</button>
              </form>
            </div>
          </div>
          
        </div>
        ) : (
          <LoginRequired />
        )}
      </div>
    </div>
  )
}
