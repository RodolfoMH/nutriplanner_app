import React from "react";
import { Pressable, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { HStack, VStack } from "../../components/ui/view";

export default function MenuItem({ visible=true, iconSource=Ionicons, iconName='person', descripcion="",iconColor='coolGray.400', title='Item', onPress, mt, mb, mx }){

    if(!visible) return null;
    
    const pressableProps = {
        disabled:onPress===undefined, 
        bgColor:"white", 
        onPress:onPress, 
        _pressed:{bgColor:"coolGray.100"}
    };
  
    const textProps = {
        isTruncated:true,
        fontSize:18,
        color: '#000'
    }
  
    const textDespctionProps = {
      isTruncated:true,
      fontSize:16,
      color: 'coolGray.600'
    }
  
    const hstackStyle ={
        mx,
        mt,
        mb,
        p:2,
        space:4,
        alignItems:'center',
        borderLeftColor: undefined,
        borderLeftWidth: undefined
    }
  
    return (     
      <Pressable rounded={12} {...pressableProps} >
  
        <HStack {...hstackStyle} >
            <Ionicons size={25} name={iconName} />
            <VStack ml={7}>
              <Text children={title} />
              <Text children={descripcion} />
            </VStack>
            
        </HStack>           
          
      </Pressable>     
    );
  }

