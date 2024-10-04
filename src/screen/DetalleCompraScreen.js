import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Pricetag } from "../components/ui/icon";
import themeConfig from "../conf/theme/themeConfig";
import { formatDate } from "../utils";

export default function DetalleCompraScreen({route}){

    const [detalles, setDetalles] = useState([]);
    const [menu, setMenu] = useState([])

    useEffect(()=>{

        setDetalles(route?.params?.listaCompra?.detalles);
        setMenu(JSON.parse(route?.params?.listaCompra?.menu?.jsonResultado??"[]"))

    },[route?.params?.listaCompra])

    const renderMeal = (meal) => (
        <View style={styles.meal}>
          <Text style={styles.title}>{meal?.descripcion}</Text>
          <Text>Ingredientes: {meal?.ingredientes.join(', ')}</Text>
          <Text>Preparación: {meal?.preparacion}</Text>
        </View>
      );

    return (
        <View style={{backgroundColor:'white', height:'100%'}}>

            <ScrollView>
                
               <Text style={{color:themeConfig.current.color.primary,marginBottom:15,marginTop:10,marginHorizontal:15,fontSize:18, fontWeight:'bold'}}>Menu generado</Text>
                
                {menu.map(item=>(
                    <View key={item?.dia} style={styles.day}>
                        <Text style={styles.dayTitle}>{item?.dia}</Text>
                        {renderMeal(item.desayuno)}
                        {renderMeal(item.almuerzo)}
                        {renderMeal(item.cena)}
                    </View>
                ))}

                {menu.length == 0 && (
                    <Text style={{textAlign:'center',marginTop:10,marginBottom:10, fontSize:16}}>No hay datos para mostrar</Text>
                )}


            <Text style={{color:themeConfig.current.color.primary,marginBottom:15,marginTop:0,marginHorizontal:15,fontSize:18, fontWeight:'bold'}}>Artículos</Text>
            
            { detalles.map(item=>(
                <View key={item?.id} style={{marginHorizontal:15,display:'flex', flexDirection:'row', borderWidth:1, borderColor:'#e6e6e6', borderRadius:10, marginBottom:10}}>

                <View style={{backgroundColor:'#e6e6e6', padding:16, borderRadius:10}}>
                    <Pricetag size={80}/>
                </View>

                <View style={{flex:1,marginLeft:10, padding:5}}>

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
            ))
            }
            
            </ScrollView>

        </View>
    );

}const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor:'white' },
    day: { marginBottom: 20, marginHorizontal:15 },
    dayTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    meal: { marginBottom: 10 },
    title: { fontWeight: 'bold' },
  });