import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [loginData, setLoginData] = useState({
        usuario: '',
        clave: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Llamamos la función del store
            await login(loginData);

            // Verificamos que el token existe después del login
            const authToken = localStorage.getItem("authToken");
            console.log("Token después de login:", authToken);

            if (authToken && authToken !== "undefined" && authToken !== "null") {
                setMessage('Login exitoso');

                // Forzamos una actualización del estado global antes de redirigir
                useAuthStore.getState().loadUser();

                // Aumentamos el tiempo de espera antes de la redirección
                setTimeout(() => {
                    // Verificamos nuevamente antes de redirigir
                    if (useAuthStore.getState().token) {
                        navigate("/");
                    } else {
                        setMessage('Error de sincronización. Intente nuevamente.');
                    }
                }, 2000);
            } else {
                throw new Error("No se pudo obtener el token de autenticación");
            }
        } catch (error: any) {
            console.error("Error de login:", error);
            setMessage(error.response?.data?.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="usuario"
                    placeholder="Usuario"
                    value={loginData.usuario}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    name="clave"
                    placeholder="Contraseña"
                    value={loginData.clave}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className={`cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
            </form>
            {message && <p className={`mt-3 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </div>
    );
}