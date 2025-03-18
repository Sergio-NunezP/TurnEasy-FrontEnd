import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Header from "./components/Header";
import Barbershop from "./components/BarberShop";
import ServiceDetails from "./components/ServiceDetail";

function App() {
  return (
    <Router>
      {/* encabezado (Header)*/}
      <Header />

      {/* Contenido de la aplicación*/}
      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/company" element={<Barbershop />} />
          <Route path="/service/:id" element={<ServiceDetails />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
