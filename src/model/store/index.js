import AsyncStorage from '@react-native-async-storage/async-storage';

export const session = {

    async save(data) {
        const json = JSON.stringify(data);
        await AsyncStorage.setItem('session',json);
    },

    async get(){
        const text = await AsyncStorage.getItem('session');
        if(text!=null){
            return JSON.parse(text);
        }

        return null;
    }

}

export const serverConfig = {
    async save(server, port){
        const json = JSON.stringify({server, port});
        await AsyncStorage.setItem('serverConfig',json);
    },
    async get(){
        const text = await AsyncStorage.getItem('serverConfig');
        if(text!=null){
            return JSON.parse(text);
        }
        return null;
    }
}

export const newList = {
    async create(){
        await AsyncStorage.removeItem('newList');

        const userData = await session.get();

        const newList = {
            compra:{
                usuarioId: userData?.usuario?.id,
                fechaCompra: new Date(),
                estado: "PENDIENTE"
            },
            detalles:[]
        };

        const json = JSON.stringify(newList);
        await AsyncStorage.setItem('newList',json);
    }, 

    async get(){
        const text = await AsyncStorage.getItem('newList');
        if(text!=null){
            return JSON.parse(text);
        }

        return null;
    },

    async update(data){
        const json = JSON.stringify(data);
        await AsyncStorage.setItem('newList',json);
    },

    async remove(){
        await AsyncStorage.removeItem('newList');
    }
}