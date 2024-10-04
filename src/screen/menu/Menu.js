import React, {useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MenuItem from './MenuItem';
import { Pressable, SafeAreaView, ScrollView, Text } from 'react-native';
import { HStack, VStack } from '../../components/ui/view';
import themeConfig from '../../conf/theme/themeConfig';
import { session } from '../../model/store';
// import { HStack, VStack } from '../../src/components/ui/view';
// import themeConfig from '../../conf/theme/themeConfig';
// import { session } from '../../src/model/store';

function UserProfile(props) {

  const [usuario, setUsuario] = useState(null);

  useEffect(()=>{
    session.get().then(data=>setUsuario(data?.usuario))
  },[])

  return (
    <Pressable style={{borderBottomWidth:0.5, borderBottomColor:'grey'}} {...localStyle.userProfile}>
      
      <HStack p={10} space={4} alignItems={'center'}>
        <Ionicons
          name={'person'}
          size={40}
          style={{color:themeConfig.current.color.primary}}
        />
        <VStack flex={1} mx={10}>
          <Text fontSize={18} fontWeight={700} children={`${usuario?.nombre} ${usuario?.apellido}`} />
          <Text fontSize={18} fontWeight={700} children={`${usuario?.email}`} />
        </VStack>
      </HStack>
    </Pressable>
  );
}


export function Menu(props) {


  return (

    <SafeAreaView style={{backgroundColor:'white', flex:1}} {...localStyle.rootContainer}>
      
      <UserProfile
        datosUsuario={props?.dataUsuario}
      />

      <ScrollView pt={2}>

      
      <VStack mx={20} mb={2} space={1} mt={20}>

          <Text children={'Configuración'} style={{fontSize:20, fontWeight:'400'}}/>
            

          <MenuItem
            title="Ayuda"
            descripcion='Obtener información, buscar actualizaciones.'
            iconName="help-circle"
            iconColor={themeConfig.current.color.accentColor}
            onPress={() => {}}
          />

          <MenuItem
            title="Cerrar Sesión"
            descripcion='Salir de la cuenta.'
            iconName="log-out-outline"
            iconColor="red.400"
            onPress={()=>props?.navigation?.navigate('Login')}
          />

        </VStack>
      </ScrollView>


    </SafeAreaView>
  );
}

const localStyle = {
  rootContainer: {
    h: '100%',
    backGroundColor:'white'
  },
  userProfile: {
    p: 4,
    mx: 2
  },
};


