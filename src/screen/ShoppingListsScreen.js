import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { newList, session } from '../model/store';
import { getListasCompraUsuario } from '../model/api';
import { formatDate } from '../utils';
import themeConfig from '../conf/theme/themeConfig';
// import { newList, session } from '../src/model/store';
// import { formatDate } from '../src/utils';
// import themeConfig from '../conf/theme/themeConfig';
// import { getListasCompraUsuario } from '../src/model/api';

export default function ShoppingListsScreen({ navigation, route }) {

  const [compraPendiente, setCompraPendiente] = useState(null);
  const [compras, setCompras] = useState([]);

  const onNewListHandler = async () =>{
    await newList.create();
    navigation.navigate('ShoppingListDetail');
  }

  const onEditPendingListHandler = async () =>{
    navigation.navigate('ShoppingListDetail');
  }

  const getListaCompraPendiente = async () =>{
    const data = await newList.get();
    console.log('data ',data)
    if(data!=null){
      setCompraPendiente(data);
    }else{
      setCompraPendiente(null);
    }
  }

  const getListasDeCompra = async () => {
    try {
      const userData = await session.get();
      const response = await getListasCompraUsuario(userData?.usuario?.id);
      //console.log(response)
      setCompras(response);
    } catch (error) {
      alert(error?.message)
    }
  }

  useEffect(()=>{
    getListaCompraPendiente();
    getListasDeCompra();
  },[]);

  useEffect(()=>{

    

    if(route?.params?.refresh){
      console.log('route effect entro'); 
      delete route?.params?.refresh;
      getListaCompraPendiente();
      getListasDeCompra();
    }

  },[route?.params])

  const onShowDetailsHandler = async (compra) =>{
    navigation.navigate('DetalleCompra', {listaCompra:compra});
  }

  const onDeletePendintListHandler = async () =>{
    await newList.remove();
    await getListaCompraPendiente();
  }

  return (
    <View style={styles.container}>

      {compraPendiente != null && (

        <View style={{borderColor:'#d9d9d9', borderWidth:1, borderRadius:10, padding:10}}>

        <Text style={{fontWeight:'600', fontSize:18}}>Tienes una lista pendiente</Text>

        <View style={{display:'flex', flexDirection:'row', marginTop:10}}>
          <Text style={styles.itemText}>Fecha: </Text>
          <Text style={styles.itemText}>{formatDate(compraPendiente?.compra?.fechaCompra)}</Text>
        </View>

        <View style={{display:'flex', flexDirection:'row'}}>
          <Text style={styles.itemText}>Detalles: </Text>
          <Text style={styles.itemText}>{compraPendiente?.detalles?.length}</Text>
        </View>


        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>


        <Pressable onPress={onDeletePendintListHandler}>
        <Text style={{fontSize:18,textAlign:'right',color:themeConfig.current.color.danger}}>Eliminar</Text>
        </Pressable>

        <Pressable onPress={onEditPendingListHandler}>
          <Text style={{fontSize:18,textAlign:'right',color:themeConfig.current.color.primary}}> Continuar editando </Text>
        </Pressable>

        </View>

        
        </View>

       )
      }

      <FlatList
        data={compras}
        style={{marginTop:20}}
        keyExtractor={(item) => item?.compra?.id}
        ListEmptyComponent={<Text style={{textAlign:'center',fontSize:18, fontWeight:'500', marginTop:60}}>No hay datos para mostrar.</Text>}
        renderItem={({ item }) => (
          <View key={item?.compra?.id} style={styles.item}>


            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{display:'flex', flexDirection:'row'}}>
              <Text style={styles.itemText}>Fecha: </Text>
              <Text style={styles.itemText}>{formatDate(item?.compra?.fechaCompra)}</Text>
            </View>

            <View style={{display:'flex', flexDirection:'row'}}>
              <Text style={{fontWeight:'bold', fontSize:18}}>{item?.compra?.id}</Text>
            </View>


            </View>

            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

            <View style={{display:'flex', flexDirection:'row'}}>
              <Text style={styles.itemText}>Artículos: </Text>
              <Text style={styles.itemText}>{item?.detalles?.length}</Text>
            </View>

            <Pressable onPress={()=>onShowDetailsHandler(item)}>
              <Text style={{fontSize:18,textAlign:'right',color:themeConfig.current.color.primary}}>Ver detalles</Text>
            </Pressable>

            </View>

          </View>
        )}
      />
      {/* <Button title="Menú de la Semana" onPress={() => navigation.navigate('WeeklyMenu')} /> */}
      {/* <Button title="Nueva Lista de Compras" onPress={() => navigation.navigate('NewShoppingList')} /> */}

        {/* <View style={{position:'absolute', bottom:25, right:25, borderRadius:25}}> */}
          <TouchableOpacity style={styles.floatingButton} onPress={onNewListHandler}>
            <Ionicons name="add" color="white" size={18}/>
          </TouchableOpacity>
        {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:'white' },
  item: { marginBottom: 10, borderBottomWidth:1, borderBottomColor:'#d9d9d9', paddingHorizontal:10, paddingBottom:10 },
  itemText:{
    fontSize:18
  },
  floatingButton:{
    padding:12,
    borderRadius:10,
    backgroundColor:'rgba(120, 150, 90,0.8)', 
    position:'absolute', 
    bottom:25, 
    right:25
  }
});
