import { create } from "zustand";
import { api } from "../api/api";
import { Company } from "../types";

type BarbershopState = {
    empresas: Company[];
    empresaSeleccionada: Company | null;
    loading: boolean;
    error: string | null;
    fetchEmpresas: () => Promise<void>;
    seleccionarEmpresa: (idEmpresa: number) => void;
}

export const useBarbershopStore = create<BarbershopState>((set, get) => ({
    empresas: [],
    empresaSeleccionada: null,
    loading: false,
    error: null,

    fetchEmpresas: async () => {
        set({ loading: true, error: null });

        try {
            // Consumir el endpoint sin parámetros
            const response = await api.get("/api/company");

            // Guardar todas las empresas
            set({
                empresas: response.data,
                loading: false,
                // Si no hay empresa seleccionada, seleccionar la primera por defecto
                empresaSeleccionada: get().empresaSeleccionada || (response.data.length > 0 ? response.data[0] : null)
            });

        } catch (error: any) {
            console.error("Error al obtener datos de empresas:", error);
            set({
                error: error.response?.data?.message || "No se pudieron cargar los datos",
                loading: false,
            });
        }
    },

    seleccionarEmpresa: (idEmpresa: number) => {
        const { empresas } = get();
        const empresaSeleccionada = empresas.find(empresa => empresa.id_empresa === idEmpresa) || null;
        set({ empresaSeleccionada });
    }
}));