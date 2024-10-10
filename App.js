import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

// Importar las pantallas que crearemos a continuación
import LoginScreen from './src/screen/LoginScreen';
import BottomTap from './src/navigation/BottonTab';
import ShoppingListsScreen from './src/screen/ShoppingListsScreen';
import NewShoppingListScreen from './src/screen/NewShoppingListScreen';
import ShoppingListDetailScreen from './src/screen/ShoppingListDetailScreen';
import DetalleCompraScreen from './src/screen/DetalleCompraScreen';
import RegistroScreen from './src/screen/RegistroScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{flex:1,backgroundColor: 'white'}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerShown:false }} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={BottomTap} />

        <Stack.Screen name="ShoppingLists" component={ShoppingListsScreen} options={{ title: 'Listas de Compras' }} />
        <Stack.Screen name="NewShoppingList" component={NewShoppingListScreen} options={{ title: 'Nueva Lista de Compras', headerShadowVisible:false }} />
        <Stack.Screen name="ShoppingListDetail" component={ShoppingListDetailScreen} options={{ headerTitleAlign:'center',title: 'Lista de Compras', headerShadowVisible:false }} />
        {/* <Stack.Screen name="WeeklyMenu" component={WeeklyMenuScreen} options={{ title: 'Menú de la Semana' }} /> */}
        <Stack.Screen name="DetalleCompra" component={DetalleCompraScreen} options={{ headerTitleAlign:'center',title: 'Detalle de Compras', headerShadowVisible:false }} />
        <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Registro' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}
