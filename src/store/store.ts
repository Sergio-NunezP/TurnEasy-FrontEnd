import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { login as loginAPI } from "../api/auth";
import { LoginData } from "../types";

interface AuthState {
    user: any;
    token: string | null;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    loadUser: () => void;
}

// Función auxiliar para obtener datos del localStorage de manera segura
const getSafeItem = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        if (!item || item === "undefined" || item === "null") return null;
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage`, error);
        return null;
    }
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            login: async (data) => {
                try {
                    const response = await loginAPI(data);

                    // Verifica si existe access_token en lugar de token
                    if (response && response.access_token) {
                        // Usa access_token como tu token
                        set({
                            user: response.user || {},
                            token: response.access_token
                        });

                        localStorage.setItem("authToken", response.access_token);
                        localStorage.setItem("authUser", JSON.stringify(response.user || {}));
                    } else {
                        throw new Error("Respuesta de login inválida - No hay token");
                    }
                } catch (error) {
                    console.error("Error en login:", error);
                    throw error;
                }
            },

            logout: () => {
                set({ user: null, token: null });
                localStorage.removeItem("authToken");
                localStorage.removeItem("authUser");
            },

            loadUser: () => {
                try {
                    const storedToken = localStorage.getItem("authToken");
                    const storedUser = getSafeItem("authUser");

                    // Verifica que los valores no sean undefined o null como string
                    const tokenValue = storedToken && storedToken !== "undefined" && storedToken !== "null"
                        ? storedToken
                        : null;

                    console.log("Cargando datos de auth:", { user: storedUser, token: tokenValue });

                    set({
                        user: storedUser,
                        token: tokenValue
                    });
                } catch (error) {
                    console.error("Error en loadUser:", error);
                }
            },
        }),
        {
            name: "auth-storage", // nombre único para el almacenamiento
            storage: createJSONStorage(() => localStorage),
        }
    )
);