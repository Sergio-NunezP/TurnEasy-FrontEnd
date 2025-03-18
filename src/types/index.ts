export type RegisterData = {
    usuario: string
    nombre: string
    correo: string
    clave: string
    tipo_usuario: string
    telefono: number
}

export type LoginData = {
    usuario: string
    clave: string
}

export type Turno = {
    id_turno: number
    dia_semana: string
    hora_inicio: string
    hora_fin: string
}

export type Cita = {
    id_citas: number
    dia_semana_servicio: string
    fecha_servicio: string
    hora_desde_servicio: string
    hora_hasta_servicio: string
    nombre: string
    apellido: string
    correo: string
    telefono: string
}

export type Employee = {
    id_empleado: number
    nombre: string
    correo: string
    telefono: string
    url_imagen: string
    activo: boolean
    horario: Turno[] | Record<string, never>
    citas: Cita[] | Record<string, never>
}

export type Service = {
    id_servicio: number
    nombre_servicio: string
    descripcion: string
    duracion: number
    precio: string
    activo: boolean
    fecha_creacion: string
}

export type Company = {
    id_empresa: number
    nombre: string
    direccion: string
    telefono: string
    correo: string
    url_imagen: string
    categoria: string
    hora_apertura: string
    hora_cierre: string
    servicios: Service[] | Record<string, never>
    empleados: Employee[]
}

export type RegisterAdminData = RegisterData

export type RegisterClienteData = RegisterData