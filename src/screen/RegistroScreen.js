import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import themeConfig from '../conf/theme/themeConfig';
import { formatDate } from '../utils';
import { saveUser } from '../model/api';
import { Calendar } from '../components/ui/icon';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function RegistroScreen({ navigation }) {
  
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [showDatePicker,setShowDatePicker]=useState(false);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChangeDateHandler = (e,date) =>{
        setFechaNacimiento(date);
        setShowDatePicker(false);
    }


    const onSubmitHandler = async () =>{
        const form = {
            usuario: usuario,
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento,
            fechaCreacion:new Date(),
            password: password,
            estado: 'ACTIVO',
            email: email,
            telefono: telefono
        };

        try {
            const result = await saveUser(form);
            console.log(result);
            alert('Usuario agregado exitosamente.');
            navigation.navigate('Login');
        } catch (error) {
            alert(error?.message)
        }
    } 
    
    return (
        <View style={styles.container}>

            <ScrollView>
            
            <Text style={{textAlign:'center', color:themeConfig.current.color.primary, fontSize:24, marginBottom:20, fontWeight:'bold'}}>Sign Up</Text>

            <View>
                <Text>Nombre</Text>
                <TextInput
                    placeholder='Nombre'
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.textInput}
                />
            </View>

            <View style={styles.input}>
                <Text>Apellido</Text>
                <TextInput
                    placeholder='Apellido'
                    value={apellido}
                    onChangeText={setApellido}
                    style={styles.textInput}
                />
            </View>


            <View style={styles.input}>
                <Text>Usuario</Text>
                <TextInput
                    placeholder='Usuario'
                    value={usuario}
                    onChangeText={setUsuario}
                    style={styles.textInput}
                />
            </View>


            <View  style={styles.input}>

                <Text>Fecha de nacimiento</Text>

                <View style={{display:'flex', flexDirection:'row'}}>

                    <TextInput
                        placeholder="Fecha de vencimiento"
                        value={fechaNacimiento!=null?formatDate(fechaNacimiento):null}
                        readOnly={true}
                        style={{borderBottomWidth:1, borderBottomColor:'#d9d9d9', fontSize:14, flex:1, color:'gray'}}

                    />

                    <Pressable onPress={()=>setShowDatePicker(true)} style={{paddingRight:10,height:49.5,borderBottomWidth:1, borderBottomColor:'#d9d9d9', justifyContent:'center'}}>
                        <Calendar color={'#2196F3'} size={24}/>
                    </Pressable>

                </View>

                {showDatePicker && (
                <RNDateTimePicker
                    display="inline"
                    value={fechaNacimiento || new Date()}
                    onChange={onChangeDateHandler}/>
                )}
            </View>

            <View style={styles.input}>
                <Text>Contraseña</Text>
                <TextInput
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.textInput}
                />
            </View>


            <View style={styles.input}>
                <Text>Email</Text>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.textInput}
                />
            </View>

            <View style={styles.input}>
                <Text>Teléfono</Text>
                <TextInput
                    placeholder='Teléfono'
                    value={telefono}
                    onChangeText={setTelefono}
                    style={styles.textInput}
                />
            </View>


            <Pressable disabled={loading} onPress={onSubmitHandler} style={{backgroundColor:loading? 'grey': themeConfig.current.color.primary, borderRadius:30, padding:10, marginTop:20}}>
                <Text style={{color:'white', textAlign:'center', fontSize:18}}>Enviar</Text>
            </Pressable>
            
            </ScrollView>
        
        </View>
    );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor:'white', height:'100%' },
  label: { marginBottom: 10 },
  textInput: { borderBottomWidth:1, borderBottomColor:'#d9d9d9' },
  input:{marginTop:15},
  nextButton:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});
