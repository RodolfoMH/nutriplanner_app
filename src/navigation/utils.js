import React from "react";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import themeConfig from "../conf/theme/themeConfig";

export const initialTabsProps = (titulo, showHeader) => {
  return {
    title: titulo,
    headerStyle: {
      backgroundColor: 'white'
    },
    headerShown: showHeader,
    headerTintColor: 'grey',
    headerTitleStyle: {
      color: 'grey',
      fontFamily: 'Roboto-Thin'
    },
    contentStyle: {
      backgroundColor: 'white'
    },
    headerShadowVisible: false,
    headerTitleAlign: 'center',
  }
}

export const getOptionsProps = ({ title, headerBackTitle, showHeader }) => {
  return {
    title: title,
    // title: Platform.OS === 'ios' ? '' : title,
    headerStyle: {
      backgroundColor: 'white'
    },
    headerShown: showHeader,
    contentStyle: {
      backgroundColor: 'white'
    },
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color:'black',
      fontFamily: 'Roboto-Medium',
      fontSize:20
    },
    headerTintColor: 'black',
    headerBackTitle: headerBackTitle
  };
}

export const stackItemProps = ({ title, headerTitleColor = 'white' }) => {
  return {
    title: title,

    headerStyle: {
      backgroundColor: themeConfig.current.color.primary,
      elevation: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: headerTitleColor
    },
  }
}

export const initialTabsProp = (titulo, showHeader) => {
  return {
    title: titulo,
    headerStyle: {
      backgroundColor: 'white'
    },
    headerShown: showHeader,
    headerTintColor: 'black',
    headerTitleStyle: {
      color: 'black',
      fontFamily: 'Roboto-Medium',
      fontSize:20
    },
    contentStyle: {
      backgroundColor: 'white'
    },
    headerShadowVisible: false,
    headerTitleAlign: 'center',
  }
}

export const tabsIconsResolve = (route, focused, color, size) => {

  let iconName;

  switch (route?.name) {
    case 'ShoppingLists': { iconName = focused ? 'home-sharp' : 'home-outline' }
      break;
    case 'Menu': { iconName = focused ? 'options' : 'options-outline' }
      break;
    case 'WeeklyMenu': { iconName = focused ? 'today' : 'today-outline' }
      break;
    case 'MenuAdmin': { iconName = focused ? 'options' : 'options-outline' }
      break;
    default: { }
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;

}

export function setHeaderTitle(props, title) {
  props.navigation.setOptions({ title });
}

export function setBackTitle(props, headerBackTitle) {
  props.navigation.setOptions({ headerBackTitle });
}

export function addHeaderRightIcon(props, iconName, parFuncion = () => { }) {
  props.navigation.setOptions({
    headerRight: () => (
      <Ionicons
        size={25}
        color={'black'}
        name={iconName}
        onPress={parFuncion}
      />
      // <IconButton
      //   icon={<Icon as={Ionicons} name={iconName} />}
      //   borderRadius="full"
      //   _icon={{ color: "grey", size: "xl" }}
      //   _pressed={{ bg: themeConfig.current.color.primaryDark }}
      //   onPress={parFuncion}
      // />
    ),


  });
}