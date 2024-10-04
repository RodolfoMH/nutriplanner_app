import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Touchable, TouchableOpacity, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { newList } from '../model/store';
import { addHeaderRightIcon } from '../navigation/utils';
import { saveListaCompra } from '../model/api';
import { requestAndroidPermission } from '../conf/permissions';
import { CloseOutline, Pricetag, Trash } from '../components/ui/icon';
import AddProductDialog from './AddProductDialog';
import themeConfig from '../conf/theme/themeConfig';
import { formatDate } from '../utils';
//import { addHeaderRightIcon } from '../navigation/utils';
// import { requestAndroidPermission } from '../conf/permissions';
// import AddProductDialog from './newShoppingList/AddProductDialog';
// import { newList } from '../src/model/store';
// import { CloseOutline, Pricetag, Trash } from '../src/components/ui/icon';
// import { formatDate } from '../src/utils';
// import { Button } from '@rneui/themed';
// import { saveListaCompra } from '../src/model/api';
// import themeConfig from '../conf/theme/themeConfig';
//import { RNCamera } from 'react-native-camera';

export default function ShoppingListDetailScreen(props) {


  const [items, setItems] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [openProductSearch, setOpenProductSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const device = useCameraDevice('back');

  const { hasPermission, requestPermission } = useCameraPermission();

  const getListaPendiente = async () =>{
    const data = await newList.get();
    if(data!=null){
      setItems(data?.detalles);
    }

  }

  useEffect(()=>{
    addHeaderRightIcon(props, 'add', ()=>{
      setBarcode(null);
      setOpenProductSearch(true);
    });


    getListaPendiente();

  },[]);

  const handleBarCodeScanned = ({ data }) => {
    // setScanned(true);
    // setItems([...items, { id: data, name: `Producto ${data}` }]);
    // alert(`Artículo escaneado: ${data}`);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(codes[0].value)
      if(codes.length >= 1){
        setBarcode(codes[0].value);
        setOpenCamera(false);
        setOpenProductSearch(true);
        //setOpenProductDetail(true)
      }
    }
  });



  const onAddProductHandler = async (item) =>{

    let list = await newList.get();

    list.detalles.push({...item, id:item?.producto?.id});

    await newList.update(list);

    setItems(list?.detalles);

    setOpenProductDetail(false);

  }


  const onSave = () =>{
    props.navigation.navigate('Home', {screen:'ShoppingLists', params:{refresh:true}});
  }

  const onDeleteHandler = async (item) =>{

    console.log('delete presed, item ',item)

    const itemFiltered = items?.filter( element => element?.id != item?.id );

    let list = await newList.get();

    list.detalles = itemFiltered;

    await newList.update(list);

    setItems(list?.detalles);

  }

  const onSubmitHandler = async () =>{


    setLoading(true);

    const lista = await newList.get();

    console.log(JSON.stringify(lista))

    const body = {
      compra: {
        ...lista?.compra,
        estado:'COMPLETADA'
      },
      detalles: lista?.detalles?.map(item => ({
        productoId: item?.producto?.id,
        fechaVencimiento: item?.fechaVencimiento??undefined,
        cantidad: item?.cantidad??1,
        unidadId: item?.unidad?.id
      }))
    }

    console.log('body ',JSON.stringify(body))

    try {
      const response = await saveListaCompra(body);
      await newList.remove();
      props.navigation.navigate('Home', {screen:'ShoppingLists', params:{refresh:true}});
      //props.navigation.navigate('Home', {params:{screen:'ShoppingLists', params:{refresh:true}}});
    } catch (error) {
      alert(error?.message);
    }

    setLoading(false);
   

  }


  const onSearchProductHandler = () =>{
    if(barcode != null && barcode != ''){
      setOpenProductSearch(false);
      setOpenProductDetail(true);
    }else{
      alert('Debe especificar el producto a buscar.');
    }
    
  }


  const onOpenCameraHandler = () =>{
    if(!hasPermission){
      requestAndroidPermission();
    }else{
      setOpenProductSearch(false);
      setOpenCamera(true);
    }
    
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{marginTop:50,fontSize:16,textAlign:'center'}}>No hay nada para mostrar. </Text>}
        renderItem={({ item }) => (
          <View style={{display:'flex', flexDirection:'row', borderWidth:1, borderColor:'#e6e6e6', borderRadius:10, marginBottom:10}}>

            <View style={{backgroundColor:'#e6e6e6', padding:16, borderRadius:10, display:'flex', justifyContent:'center'}}>
                <Pricetag size={80}/>
            </View>

            <View style={{flex:1,marginLeft:10, padding:5}}>
              
              <TouchableOpacity style={{position:'absolute', right:10, top:10, zIndex:1}} onPress={()=>onDeleteHandler(item)}>
                <Trash color={'red'} size={28} on />
              </TouchableOpacity>

              <Text>{item?.producto?.nombre}</Text>
              <Text>{item?.producto?.descripcion}</Text>

              <View style={{display:'flex', flexDirection:'row', marginTop:10}}>
                <Text>Cantidad: </Text>
                <Text>{item?.cantidad}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row'}}>
                <Text>Unidad: </Text>
                <Text>{item?.unidad?.abreviatura}</Text>
              </View>

              <View style={{display:'flex', flexDirection:'row'}}>
                <Text>Vencimiento: </Text>
                <Text>{formatDate( item?.fechaVencimiento)}</Text>
              </View>
            </View>

          </View>
        )}
      />

      <View style={{display:'flex', flexDirection:'row' }}>

        <Pressable disabled={loading} onPress={onSave} style={{display:'flex',flex:1,alignItems:'center',backgroundColor:loading?'#c9c9c9': themeConfig.current.color.primary, padding:10, borderRadius:10, marginRight:15}}>
          <Text style={{color:'white'}}>Guardar</Text>
        </Pressable>

        <Pressable disabled={loading} onPress={onSubmitHandler} style={{flexDirection:'row',display:'flex', flex:1,justifyContent:'center',backgroundColor:loading?'#c9c9c9': themeConfig.current.color.primary, padding:10, borderRadius:10}}>          
          {loading && (<ActivityIndicator style={{marginRight:10}} color={themeConfig.current.color.primary} />)}
          <Text style={{color:'white'}}>Enviar</Text>
        </Pressable>

      </View>
      
    	
      
      { openCamera && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )

      }

      <AddProductDialog
        visible={openProductDetail}
        onClose={()=>setOpenProductDetail(false)}
        onSubmit={onAddProductHandler}
        barcode={barcode}
      />


      <Modal animationType="slide" transparent={true}  visible={openProductSearch} onRequestClose={()=>setOpenProductSearch(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>


                <TouchableOpacity onPress={()=>setOpenProductSearch(false)} style={{position:'absolute', top:10, right:10, padding:6}}>
                        <CloseOutline size={18}/>
                    </TouchableOpacity>

                  <Text style={{marginBottom:20}}>Buscar producto</Text>

                  

                  <View style={{width:150}}>

                    <Text>Producto</Text>

                  <TextInput
                    placeholder="Código de barras"
                    value={barcode}
                    onChangeText={value=>setBarcode(value)}
                    keyboardType="numeric"
                    style={{borderBottomWidth:1, borderBottomColor:'#d9d9d9', fontSize:14, color:'gray'}}
                  />

                  </View>

                  <View style={{display:'flex', flexDirection:'row', marginTop:10}}>

                    <Pressable onPress={onOpenCameraHandler} style={{backgroundColor:themeConfig.current.color.primary, padding:10, borderRadius:20, marginVertical:10}}>
                      <Text style={{color:'white'}}>Cámara</Text>
                    </Pressable>

                    <Pressable onPress={onSearchProductHandler} style={{backgroundColor:'gray', padding:10, borderRadius:20, marginVertical:10, marginLeft:10}}>
                      <Text  style={{color:'white'}}>Aceptar</Text>
                    </Pressable>

                  </View>

                  
                    
                </View>
            </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:'white' },
  camera: { flex: 1, width: '100%' },
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
