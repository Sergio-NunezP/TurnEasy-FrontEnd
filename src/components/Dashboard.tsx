import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useServicesStore } from '../store/servicesStore'

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { categories } = useServicesStore(); // Usa el store

    const handleServiceSelect = (categoryId: string) => {
        if (categoryId === "barbershop") {
            // Permite acceso a la barbería sin necesidad de login
            navigate(`/company`);
        } else {
            alert("Este servicio estará disponible próximamente. ¡Estamos trabajando en ello!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">TurnEasy</h1>
                <p className="text-xl text-gray-600">Reserva tu turno de manera fácil y rápida</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${!category.available ? "opacity-80" : ""
                            } cursor-pointer`}
                        onClick={() => handleServiceSelect(category.id)}
                    >
                        <div className="relative h-48">
                            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover object-center rounded-t-lg" />
                            {!category.available && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">Próximamente</span>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                            <p className="text-gray-600 mb-4">{category.description}</p>
                            {category.available ? (
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                                    Reservar
                                </button>
                            ) : (
                                <button className="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                                    Próximamente
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;