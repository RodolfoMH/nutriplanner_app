import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { initialTabsProp, tabsIconsResolve } from "./utils";
import ShoppingListsScreen from "../screen/ShoppingListsScreen";
import WeeklyMenuScreen from "../screen/WeeklyMenuScreen";
import { Menu } from "../screen/menu/Menu";
import themeConfig from "../conf/theme/themeConfig";

// import ShoppingListsScreen from "../screens/ShoppingListsScreen";
// import WeeklyMenuScreen from "../screens/WeeklyMenuScreen";
// import themeConfig from "../conf/theme/themeConfig";
// import { Menu } from "../screens/menu/Menu";

const Tabs = createBottomTabNavigator();

export default function BottomTap(props){
    return (
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => tabsIconsResolve(route,focused,color,size),
            tabBarActiveTintColor: themeConfig.current.color.primary,
            tabBarInactiveTintColor: 'gray',
          })}
          initialRouteName="ResumenAsistencia">
    
          <Tabs.Screen
            options={initialTabsProp('Historial de compras')}
            name="ShoppingLists" 
            component={ShoppingListsScreen} />
    
          <Tabs.Screen
            options={initialTabsProp('Menú Semanal', false)}
            name="WeeklyMenu" 
            component={WeeklyMenuScreen} />

        <Tabs.Screen
            options={initialTabsProp('Opciones', false)}
            name="Menu" 
            component={Menu} />
    
        </Tabs.Navigator>
    );
}