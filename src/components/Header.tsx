import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

const Header: React.FC = () => {
    const { token, user, logout, loadUser } = useAuthStore();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        loadUser(); // Carga los datos SOLO al montar el componente
    }, []); // 👈 Vacío para evitar que se ejecute en cada render

    useEffect(() => {
        console.log("Token actualizado:", token);
        console.log("Usuario actualizado:", user);

        setIsAuthenticated(!!token);
    }, [token]); // 👈 Solo reacciona a cambios de token


    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <img src="/img/logo.jpg" alt="TurnEasy" className="h-10" />
                <span className="ml-2 text-2xl font-bold text-gray-800">TurnEasy</span>
            </Link>

            {/* Menú de navegación */}
            <nav>
                {!isAuthenticated ? (
                    // Si el usuario NO ha iniciado sesión
                    <div className="flex gap-4">
                        <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Iniciar Sesión
                        </Link>
                        <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                            Registrarse
                        </Link>
                    </div>
                ) : (
                    // Si el usuario YA ha iniciado sesión
                    <div className="flex items-center gap-4">
                        <Link to="/mis-reservas" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Mis Reservas
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;