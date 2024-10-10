import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import { serverConfig, session, newList } from '../model/store';
import { login } from '../model/api';
import { CloseOutline, Cog } from '../components/ui/icon';
import themeConfig from '../conf/theme/themeConfig';
// import { login } from '../src/model/api';
// import { serverConfig, session } from '../src/model/store';
// import themeConfig from '../conf/theme/themeConfig';
// import { CloseOutline, Cog } from '../src/components/ui/icon';

export default function LoginScreen({ navigation }) {
    
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [server, setServer] = useState('morelhost.ddns.net');
  const [port, setPort] = useState('8080');
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    serverConfig.get().then((config)=>{
      if(config){
        setServer(config?.server);
        setPort(config?.port);
      }
    });
  },[])

  const handleLogin = async () => {
    // Validar credenciales dummy
    setLoading(true);
    try {
      
      const result = await login(username,password);
      console.log('result ',result)
      await session.save(result);
      navigation.replace('Home');
    } catch (error) {
      console.log(error.message)
      alert(error.message);
    }

    setLoading(false);
  };


  const onSaveServerConfig = async () =>{

    if(server != null && port != null && server != '' && port !=''){
      await serverConfig.save(server,port);
      setOpenConfigDialog(false);
    }else{
      alert('Favor rellenar todos los datos.')
    }

  }

  return (
    <View style={styles.container}>

      <Pressable onPress={()=>setOpenConfigDialog(true)} style={{position:'absolute', top:10, right:10}}>
        <Cog size={30}/>
      </Pressable>


    <View>

    <Image
        source={require('../../assets/img/logo.jpg')}
        resizeMode="contain"
        style={{ width: '100%', height: 200 }}
      />

      <Text style={{marginTop:30,marginBottom:10,color:'black',textAlign:'center', fontWeight:'bold', fontSize:20}}>Inicia sesión</Text>

      
    </View>


    <View style={{padding:20}}>

    <Text style={{fontSize:16, marginVertical:30}}>Bienvenido a <Text style={{color:themeConfig.current.color.primary}}>NUTRIPLANNER</Text></Text>

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={username}
        onChangeText={setUsername}
      />
       
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />



      <View style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
        <Text>No tienes una cuenta? </Text>
        <Pressable onPress={()=>navigation.navigate('Registro')}>
          <Text style={{color:themeConfig.current.color.primary}}>Registrarse.</Text>
        </Pressable>
      </View>

      <Pressable disabled={loading} onPress={handleLogin} style={{backgroundColor:loading? 'grey': themeConfig.current.color.primary, borderRadius:30, padding:10, marginTop:20}}>
        <Text style={{color:'white', textAlign:'center', fontSize:18}}>Iniciar sesión</Text>
      </Pressable>

      </View>

      {/* <Button title="Iniciar sesión" onPress={handleLogin} /> */}


      <Modal animationType="slide" transparent={true}  visible={openConfigDialog} onRequestClose={()=>setOpenConfigDialog(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                <TouchableOpacity onPress={()=>setOpenConfigDialog(false)} style={{position:'absolute', top:10, right:10, padding:6}}>
                    <CloseOutline size={18}/>
                </TouchableOpacity>

                  <Text style={{marginBottom:20}}>Configurar servidor</Text>

                  <View style={{width:200}}>

                    <Text>Host</Text>

                    <TextInput
                      placeholder="Dirección del servidor"
                      value={server}
                      onChangeText={value=>setServer(value)}
                      style={{borderBottomWidth:1, borderBottomColor:'#d9d9d9', fontSize:14, color:'gray'}}
                    />

                  </View>


                  <View style={{width:200, marginTop:20}}>

                    <Text>Puerto</Text>

                    <TextInput
                      placeholder="Puerto del servidor"
                      value={port}
                      onChangeText={value=>setPort(value)}
                      keyboardType="numeric"
                      style={{borderBottomWidth:1, borderBottomColor:'#d9d9d9', fontSize:14, color:'gray'}}
                    />

                  </View>

                  <View style={{display:'flex', flexDirection:'row', marginTop:10}}>

                    <Pressable onPress={onSaveServerConfig} style={{backgroundColor:themeConfig.current.color.primary, padding:10, borderRadius:20, marginTop:20}}>
                      <Text  style={{color:'white'}}>Guardar</Text>
                    </Pressable>

                  </View>

                    
                </View>
            </View>
      </Modal>



    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor:'white' },
  label: { marginBottom: 10, color:themeConfig.current.color.primary },
  input: { borderBottomWidth: 1, padding: 8, marginBottom: 20, borderRadius:5, borderBottomColor:'grey' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
