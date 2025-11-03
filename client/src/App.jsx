import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextWrapper } from "./context/user/UserContextWrapper";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Home} from "./pages/public/Home";
import {NotFound} from "./pages/public/NotFound";
import { Events } from "./pages/public/Events";
import { Register } from "./pages/public/Register";
import { Login } from "./pages/public/Login";
import { Logout } from "./pages/public/Logout";
import { Dashboard } from "./pages/admin/Dashboard";
import { AdminEvents } from "./pages/admin/AdminEvents";
import { AdminAddEvent } from "./pages/admin/AdminAddEvent";
import { AdminEditEvent } from "./pages/admin/AdminEditEvent";

function App() {

  return (
    <UserContextWrapper>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/logout" element={<Logout />}/>

          <Route path="/admin/dashboard" element={<Dashboard />}/>
          <Route path="/admin/events" element={<AdminEvents />}/>
          <Route path="/admin/event/add" element={<AdminAddEvent />}/>
          <Route path="/admin/events/edit/:id" element={<AdminEditEvent />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContextWrapper>
  )
}

export default App
