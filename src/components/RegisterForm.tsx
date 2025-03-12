import { useState } from "react"
import { registerUser } from "../api/auth"



export default function RegisterForm() {

    const [formData, setFormData] = useState({
        usuario: '',
        nombre: '',
        correo: '',
        clave: '',
        tipo_usuario: 'USUARIO'
    })
    const [message, setMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await registerUser(formData)
            setMessage(response.message || 'Registro exitoso')
        } catch (error: any) {
            console.log(error)
            setMessage(error.message || 'Error al registrar usuario')
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Registro</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                <input
                    type="text"
                    name="usuario"
                    placeholder="Usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="clave"
                    placeholder="Contraseña"
                    value={formData.clave}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Registrarse
                </button>
            </form>
            {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
        </div>
    )
}
