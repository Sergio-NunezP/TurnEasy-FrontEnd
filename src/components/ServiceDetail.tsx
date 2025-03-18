import React from "react";
import { useParams } from "react-router-dom";

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // ID del servicio desde la URL

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Detalles del Servicio</h1>
            <p>ID del servicio: {id}</p>
            {/* Agregar más detalles del servicio*/}
        </div>
    );
};

export default ServiceDetails;