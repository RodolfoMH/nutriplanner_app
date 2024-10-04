import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, isEmpty } from "../utils";
import { getProductByBarcode } from "../model/api";
import { Calendar, CloseOutline, Pricetag } from "../components/ui/icon";
import { UnidadSelector } from "../components/ui/selector/UnidadSelector";

export default function AddProductDialog({barcode, visible, onClose, onSubmit}){
    if(!visible) return null;

    const [producto, setProducto] = useState(null);
    const [unidad, setUnidad] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [fechaVencimiento, setFechaVencimiento] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onCloseHandler = () =>{
        onClose && onClose();
    }

    useEffect(()=>{
        getProductByBarcode(barcode)
        .then(res=>setProducto(res))
        .catch(err=>console.log(err.message));
    },[]);

    const onChangeDateHandler = (e,date) =>{
      setFechaVencimiento(date);
      setShowDatePicker(false);
    }

    const onSubmitHandler = () =>{

      if(isEmpty(unidad) || isEmpty(fechaVencimiento) || isEmpty(cantidad) == null){
        alert('Por favor rellenar todos los campos');
        return;
      }

      const newItem = {
        producto: producto,
        unidad: unidad,
        cantidad: cantidad,
        fechaVencimiento: fechaVencimiento
      }

      onSubmit && onSubmit(newItem);

    }

    return (
        <Modal animationType="slide"  transparent={true}  visible={true} onRequestClose={onCloseHandler}>
            <View style={styles.centeredView}>


                <View style={styles.modalView}>

                    <TouchableOpacity onPress={onCloseHandler} style={{position:'absolute', top:10, right:10, padding:6}}>
                        <CloseOutline size={18}/>
                    </TouchableOpacity>

                    <View style={{backgroundColor:'#e6e6e6', padding:16, borderRadius:10}}>
                        <Pricetag size={52}/>
                    </View>
                    
                    <Text style={styles.modalText}>{producto?.nombre}</Text>

                    <Text style={{display:'flex', maxWidth:200}}>
                        {producto?.descripcion}
                    </Text>


                    <View style={{width:250, marginTop:10}}>
                        <UnidadSelector onChange={setUnidad}/> 
                    </View>

                    <View style={{width:250}}>
                      
                      <TextInput
                        placeholder="Cantidad"
                        value={cantidad}
                        onChangeText={value=>setCantidad(value)}
                        keyboardType="numeric"
                        style={{borderBottomWidth:1, borderBottomColor:'#d9d9d9', fontSize:14, color:'gray'}}
                      />

                    </View>

                    <View style={{width:250}}>

                      <View style={{display:'flex', flexDirection:'row'}}>

                        <TextInput
                          placeholder="Fecha de vencimiento"
                          value={fechaVencimiento!=null?formatDate(fechaVencimiento):null}
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
                          value={fechaVencimiento || new Date()}
                          onChange={onChangeDateHandler}/>
                      )}
                    </View>
                    

                    <Pressable style={[styles.button, styles.buttonClose]} onPress={onSubmitHandler}>
                        <Text style={styles.textStyle}>Agregar</Text>
                    </Pressable>
                </View>
            </View>
      </Modal>
    );
}   

const styles = StyleSheet.create({
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
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
      marginTop:20
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });