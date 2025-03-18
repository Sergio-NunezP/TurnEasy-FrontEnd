import { useEffect, useState } from "react";
import { useBarbershopStore } from "../store/barbershopStore";
import { Employee, Service } from "../types";

const Barbershop = () => {
  const { empresaSeleccionada, empresas, loading, error, fetchEmpresas, seleccionarEmpresa } = useBarbershopStore();
  const [activeTab, setActiveTab] = useState<"servicios" | "equipo" | "contacto">("servicios");

  useEffect(() => {
    fetchEmpresas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-600">
          <h3 className="font-semibold">Error al cargar los datos</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!empresaSeleccionada) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-600">
          <p>No hay empresas disponibles en este momento</p>
        </div>
      </div>
    );
  }

  // Asegurarnos de que servicios y empleados sean arrays
  const servicios = Array.isArray(empresaSeleccionada.servicios) ? empresaSeleccionada.servicios : [];

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Hero Section con imagen de portada */}
      <div
        className="h-48 md:h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${empresaSeleccionada.url_imagen})`,
          backgroundPosition: 'center'
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">{empresaSeleccionada.nombre}</h1>
            <p className="mt-2 text-lg drop-shadow-md">Estilismo profesional</p>
          </div>
        </div>
      </div>

      {/* Selector de empresas (si hay más de una) */}
      {empresas.length > 1 && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-sm text-gray-500 mb-2">Selecciona una barbería:</h3>
            <div className="flex flex-wrap gap-2">
              {empresas.map((empresa) => (
                <button
                  key={empresa.id_empresa}
                  onClick={() => seleccionarEmpresa(empresa.id_empresa)}
                  className={`px-4 py-2 rounded-full text-sm ${empresa.id_empresa === empresaSeleccionada.id_empresa
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {empresa.nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Información básica */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={empresaSeleccionada.url_imagen}
              alt={empresaSeleccionada.nombre}
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{empresaSeleccionada.nombre}</h2>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{empresaSeleccionada.direccion}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{empresaSeleccionada.hora_apertura} - {empresaSeleccionada.hora_cierre}</span>
                </div>
                <div className="flex items-center text-gray-600">

                  <span>{empresaSeleccionada.telefono}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{empresaSeleccionada.correo}</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Reservar Cita
            </button>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("servicios")}
              className={`flex-1 py-4 px-4 font-medium text-center ${activeTab === "servicios"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Servicios
            </button>
            <button
              onClick={() => setActiveTab("equipo")}
              className={`flex-1 py-4 px-4 font-medium text-center ${activeTab === "equipo"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Nuestro Equipo
            </button>
            <button
              onClick={() => setActiveTab("contacto")}
              className={`flex-1 py-4 px-4 font-medium text-center ${activeTab === "contacto"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Contacto
            </button>
          </div>

          {/* Contenido de las tabs */}
          <div className="p-6">
            {activeTab === "servicios" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Servicios disponibles</h2>
                {servicios.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {servicios.map((servicio: Service) => (
                      <div key={servicio.id_servicio} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg capitalize">{servicio.nombre_servicio}</h3>
                          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                            ${parseInt(servicio.precio).toLocaleString()}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm">{servicio.descripcion}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {servicio.duracion} minutos
                          </span>
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Reservar ahora
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay servicios disponibles en este momento
                  </div>
                )}
              </div>
            )}

            {activeTab === "equipo" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Nuestros Profesionales</h2>
                {empresaSeleccionada.empleados.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {empresaSeleccionada.empleados.map((empleado: Employee) => (
                      <div key={empleado.id_empleado} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={empleado.url_imagen}
                            alt={empleado.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg capitalize">{empleado.nombre}</h3>
                          <p className="text-sm text-gray-600 mt-1">{empleado.correo}</p>
                          <p className="text-sm text-gray-600">{empleado.telefono}</p>
                          <button className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded text-sm font-medium">
                            Ver disponibilidad
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No hay información del equipo disponible
                  </div>
                )}
              </div>
            )}

            {activeTab === "contacto" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Contacto y ubicación</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-2">Dirección</h3>
                      <p className="text-gray-600">{empresaSeleccionada.direccion}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-2">Teléfono</h3>
                      <p className="text-gray-600">{empresaSeleccionada.telefono}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-2">Email</h3>
                      <p className="text-gray-600">{empresaSeleccionada.correo}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-700 mb-2">Horario</h3>
                      <p className="text-gray-600">Abierto todos los días de {empresaSeleccionada.hora_apertura} a {empresaSeleccionada.hora_cierre}</p>
                    </div>
                  </div>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
                    {/* Aquí iría un mapa */}
                    <p>Mapa de ubicación</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barbershop;