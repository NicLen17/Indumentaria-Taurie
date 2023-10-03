import Inicio from './Pages/Inicio';
import Catalogo from './Pages/Catalogo';
import Admin from './Pages/Admin';
import Profile from './Pages/Profile';
import ProdIndividual from './Pages/ProdIndividual';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NavB from './Components/NavB'
import Footer from './Components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Error from './Components/Error';
import Contacto from './Pages/Contacto';
import { Analytics } from '@vercel/analytics/react';
import ProdsHoodies from './Components/ProdsHoodies';
import ProdsBuzos from './Components/ProdsBuzos';
import ProdsRemeras from './Components/ProdsRemeras';

const localToken = JSON.parse(localStorage.getItem("token"))?.token || "";

function App() {

  const [user, setUser] = useState({});
  const [token, setToken] = useState(localToken);
  const [favorito, setFavorito] = useState([])

  window.onload = () => {
    const producto = () => {
      const productoStorage = JSON.parse(localStorage.getItem("agregarcarrito")) ? JSON.parse(localStorage.getItem("agregarcarrito")) : [];
      setFavorito(productoStorage);
    };
    producto();
  }

  const eliminarFavorito = (id) => {
    let productosFiltrados = [];
    favorito.map((e) => {
      const coincideId = e._id === id;
      if (!coincideId) {
        productosFiltrados.push(e);
      }
    });
    localStorage.setItem("agregarcarrito", JSON.stringify(productosFiltrados))
    setFavorito(productosFiltrados);
  };

  useEffect(() => {
    if (token) {
      const request = async () => {
        axios.defaults.headers = { "x-auth-token": token };
        const { data } = await axios.get("auth");
        setUser(data);
      };
      request();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers = { "x-auth-token": "" };
    setUser({});
    setToken("");
  };

  return (
    <>
      <div>
        <HashRouter>
          <NavB
            userName={user.nombre}
            userCategory={user.category}
            logout={logout}
            favorito={favorito}
            eliminarFavorito={eliminarFavorito}
            setUser={setUser}
            setToken={setToken}
          />
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="/productos" element={<Catalogo />} />
            <Route path="/productos/hoodies" element={<ProdsHoodies />} />
            <Route path="/productos/canguros" element={<ProdsBuzos />} />
            <Route path="/productos/remeras" element={<ProdsRemeras />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/admin" element={<Admin user={user.nombre} />} />
            <Route path='/perfil' element={<Profile favorito={favorito} user={user} />} />
            <Route path="/individual/:id" element={<ProdIndividual userName={user.nombre} favorito={favorito} setFavorito={setFavorito} />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          <Footer
            userName={user.nombre}
            logout={logout}
            setUser={setUser}
            setToken={setToken}
          />
        </HashRouter>
        <Analytics />
      </div>
    </>
  )
}

export default App
