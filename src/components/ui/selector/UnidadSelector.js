import { Input } from "@rneui/themed";
import { ChevronDown, Pricetag } from "../icon";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getAllUnidades } from "../../../model/api";

export function UnidadSelector({onChange}){

    const [dialogVisible, setDialogVisible]=useState(false);
    const [unidades, setUnidades] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(()=>{
        getAllUnidades()
        .then(response=>setUnidades(response))
        .catch(err=>alert(err.message));
    },[]);

    const onSelectHandler = (item) =>{
        setSelected(item);
        setDialogVisible(false);
        onChange && onChange(item);
    }

    return (
        <>
        <Pressable style={{display:'flex', flexDirection:'row', alignItems:'center'}} onPress={()=>setDialogVisible(true)}>
            <TextInput
                style={{flex:1,fontSize:14, borderBottomWidth:1, borderBottomColor:'#d9d9d9', color:'gray'}}
                placeholder="Seleccione una unidad"
                value={selected!=null? `${selected?.descripcion} (${selected?.abreviatura})`:null}
                readOnly={true}
            />
            <View style={{display:'flex',justifyContent:'center',borderBottomWidth:1, borderBottomColor:'#d9d9d9', height:49.5}}>
                <ChevronDown/>
            </View>
            
            {/* <Input
                style={{fontSize:14}}
                placeholder="Seleccione una unidad"
                value={selected!=null? `${selected?.descripcion} (${selected?.abreviatura})`:null}
                readOnly={true}
                rightIcon={<ChevronDown/>}
            /> */}
        </Pressable>


        <Modal animationType="slide" transparent={true}  visible={dialogVisible} onRequestClose={()=>setDialogVisible(false)}>
            <View style={styles.modal}>
                
                <View style={styles.modalBody}>

                    <View style={styles.divider} />

                    <Text style={styles.title}>Unidades</Text>

                    <FlatList
                        data={unidades}
                        keyExtractor={(item)=>item?.id}
                        renderItem={({item})=>(
                            <Pressable style={styles.selectItem} onPress={()=>onSelectHandler(item)}>
                                <Text>
                                    {`${item?.descripcion} (${item?.abreviatura})`}
                                </Text>
                            </Pressable>
                        )}
                    />

                </View>
                
            </View>
        </Modal>
        </>
    );
}


const styles = StyleSheet.create({
    modal: {
      flex: 1, 
      justifyContent:'flex-end'
    },
    divider:{
        width:60,
        height:4,
        backgroundColor:'#d9d9d9',
        alignSelf:'center',
        borderRadius:30
    },
    modalBody:{
        maxHeight:400,
        backgroundColor:'white', 
        padding:10, 
        borderTopRightRadius:15, 
        borderTopLeftRadius:15,
        borderStartWidth:0.7,
        borderStartColor:'#d9d9d9',
        borderEndWidth:0.7,
        borderEndColor:'#d9d9d9',
        borderTopWidth:0.7,
        borderTopColor:'#d9d9d9'
    },
    title:{
        fontWeight:'800',
        marginBottom:5
    },
    selectItem:{
        paddingVertical:5
    }
  });