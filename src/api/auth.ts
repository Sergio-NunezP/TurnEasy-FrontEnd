import { api } from "./api";
import { LoginData, RegisterAdminData, RegisterData } from "../types";


// Registrar un usuario de tipo user
export const registerUser = async (data: RegisterData) => {
    try {
        const response = await api.post('/api/auth/register/user', data);
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al registrar usuario')
    }
}

// Para el login
export const login = async (data: LoginData) => {
    try {
        const response = await api.post('/api/auth/login', data)
        // Guardar el token en el localStorage
        localStorage.setItem('authToken', response.data.token);
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión')
    }
}


// Para registrar un administrador
export const registerAdmin = async (data: RegisterAdminData) => {
    try {
        const response = await api.post('/api/auth/register', data)
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al registrat administrador')
    }
}