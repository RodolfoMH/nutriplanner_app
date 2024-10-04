import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { newList } from '../model/store';
import { ArrowForward } from '../components/ui/icon';

export default function NewShoppingListScreen({ navigation }) {
  const [listName, setListName] = useState('Lista 1');

  const handleCreateList = async () => {
    if (listName.trim()) {

      await newList.create(listName);

      navigation.navigate('ShoppingListDetail');
    } else {
      alert('Introduce un nombre para la lista');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la nueva lista:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la lista"
        value={listName}
        onChangeText={setListName}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleCreateList}>
        <Text style={{color:themeConfig.current.color.primary, marginRight:10}}>SIGUENTE</Text>
        <ArrowForward size={14} color={themeConfig.current.color.primary}/>
      </TouchableOpacity>


      {/* <Button title="Siguiente"  onPress={handleCreateList} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor:'white' },
  label: { marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 20 },
  nextButton:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});
