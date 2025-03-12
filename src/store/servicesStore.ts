import { create } from "zustand";

interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    available: boolean;
}

interface ServicesState {
    categories: Category[];
}

export const useServicesStore = create<ServicesState>(() => ({
    categories: [
        {
            id: "barbershop",
            name: "Barbería",
            description: "Reserva tu cita en la mejor barbería.",
            imageUrl: "/img/barberia.jpg",
            available: true,
        },
        {
            id: "salon",
            name: "Salón de Belleza",
            description: "Pronto disponible.",
            imageUrl: "img/salon.jpg",
            available: true,
        },
        {
            id: "Estetica",
            name: "Estética",
            description: "Pronto disponible.",
            imageUrl: "/img/estetica.jpg",
            available: true,
        },
        {
            id: "Sintétia",
            name: "Cancha sitética",
            description: "Pronto disponible.",
            imageUrl: "/img/sintetica.jpg",
            available: true,
        },

    ],
}));

export default useServicesStore;
