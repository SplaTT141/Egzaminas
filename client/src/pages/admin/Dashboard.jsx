import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { LoginRequired } from "../../components/LoginRequired";
import { Sidebar } from "../../components/Sidebar"

export function Dashboard() {
    const {isLoggedIn} = useContext(UserContext);

    return (
        <div className="container-fluid">
        {
        isLoggedIn
            ?
                <div className="d-flex flex-wrap">
                    <Sidebar />
                    <h1>Sveiki atvykę į valdymo skydelį!</h1>
                </div>
            :
                <LoginRequired />
        }           
        </div>
    )
}