// screens/WeeklyMenuScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { session } from '../model/store';
import { getMenuSemana } from '../model/api';

export default function WeeklyMenuScreen() {
  const [menu, setMenu] = useState([]);

  const obtenerMenuSemana = async () =>{
    const userData = await session.get();
    getMenuSemana(userData?.usuario?.id)
    .then(response=>setMenu(JSON.parse(response?.jsonResultado)))
    .catch(err=>alert(err?.message))
  }

  useEffect(() => {
    // Simular la obtención del menú desde una fuente (base de datos o dummy)
   // setMenu(dummyMenu);
    obtenerMenuSemana();
  }, []);


  const renderMeal = (meal) => (
    <View style={styles.meal}>
      <Text style={styles.title}>{meal?.descripcion}</Text>
      <Text>Ingredientes: {meal?.ingredientes.join(', ')}</Text>
      <Text>Preparación: {meal?.preparacion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Menú de la semana</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item?.dia?.toString()}
        renderItem={({ item }) => (
          <View style={styles.day}>
            <Text style={styles.dayTitle}>{item?.dia}</Text>
            {renderMeal(item.desayuno)}
            {renderMeal(item.almuerzo)}
            {renderMeal(item.cena)}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:'white' },
  day: { marginBottom: 20 },
  dayTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  meal: { marginBottom: 10 },
  title: { fontWeight: 'bold' },
});
