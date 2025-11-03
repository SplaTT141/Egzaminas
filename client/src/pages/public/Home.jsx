import {Link} from "react-router-dom";
import village from "../../assets/village.jpg";

export function Home() {
    return (
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-lg-6 col-md-6">
                    <img src={village} className="d-block mx-lg-auto img-fluid rounded" alt="Village" width="700" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Sveiki atvykę į mūsų miesto svetainę!
                    </h1>
                    <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the
                        world’s most
                        popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid
                        system,
                        extensive prebuilt components, and powerful JavaScript plugins.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <Link to="/events" className="btn btn-warning btn-lg px-3 font-weight-bold mt-4">Organizuojami renginiai</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}