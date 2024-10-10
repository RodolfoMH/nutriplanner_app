
//const server = '192.168.1.16';

import { serverConfig } from "../store";

//const port = '8080';
const context = 'api';

//const uriBase = `http://${server}:${port}/${context}`;

export const getUriBase = async () =>{

    const config = await serverConfig.get();

    if(config !=null){
        return `http://${config?.server}:${config?.port}/${context}`;
    }

    Promise.reject(Error('Debe configurar los parámetros del servidor.'))

   // return null;

}

export const login = async (email, password) => {

    const uriBase = await getUriBase();

    try {
        const response = await fetch(`${uriBase}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Manejar éxito en el login
            return response.json();
        } else {
            // Manejar error
            return Promise.reject(response.text());
        }
    } catch (error) {
        console.error('Error en el login', error);
    }
};

export const getProductByBarcode = async (barcode) => {

    const uriBase = await getUriBase();

    try {
        const response = await fetch(`${uriBase}/productos?barcode=${barcode}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Manejar éxito en el login
            return response.json();
        } else {
            // Manejar error
            return Promise.reject(response.text());
        }
    } catch (error) {
        console.error('Error en getProductByBarcode:', error);
    }
}

export const getAllUnidades = async () => {

    const uriBase = await getUriBase();

    try {
        const response = await fetch(`${uriBase}/unidad/all`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Manejar éxito en el login
            return response.json();
        } else {
            // Manejar error
            return Promise.reject(response.text());
        }
    } catch (error) {
        console.error('Error en getAllUnidades:', error);
    }
}

export const saveListaCompra = async (data) => {

    const uriBase = await getUriBase();

    try {
        const response = await fetch(`${uriBase}/listas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Manejar éxito en el login
            return response.json();
        } else {
            // Manejar error
            return Promise.reject(response.text());
        }
    } catch (error) {
        console.error('Error al guardar la lista', error);
    }
};

export const getMenuSemana = async (usuarioId) => {

    const uriBase = await getUriBase();

    try {
        const response = await fetch(`${uriBase}/menus/ultimomenu/${usuarioId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Manejar éxito en el login
            return response.json();
        } else {
            // Manejar error
            return Promise.reject(response.text());
        }
    } catch (error) {
        console.error('Error en getMenuSemana:', error);
    }
}

export const getListasCompraUsuario = async (usuarioId) => {

    const uriBase = await getUriBase();

    try {
        const response = await fetch(`${uriBase}/listas/usuario/${usuarioId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Manejar éxito en el login
            return response.json();
        } else {
            // Manejar error
            return Promise.reject(response.text());
        }
    } catch (error) {
        console.error('Error en getListasCompraUsuario:', error);
    }
}


export const saveUser = async (body) => {

    const uriBase = await getUriBase();
    try {
        const response = await fetch(`${uriBase}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            // Manejar éxito en el login
            return response.json();
        } else {
            // Manejar error
            return Promise.reject(response.text());
        }
    } catch (error) {
        console.error('Error en el saveUser', error);
    }
};
