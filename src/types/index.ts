
export type RegisterData = {
    usuario: string
    nombre: string
    correo: string
    clave: string
    tipo_usuario: string
}

export type LoginData = {
    usuario: string
    clave: string
}



// Si a futuro necesitamos añadir campos a nuestros types y tengan que ver uno con el otro solo seria hacer esto
// export type RegisterAdminData = RegisterUserData & {
//departamento: string;
//codigoAcceso: string;
//};
export type RegisterAdminData = RegisterData;

export type RegisterClienteData = RegisterData;