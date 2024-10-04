import { View } from "react-native";

export function VStack({mx=0, mb=0, space=0, children, ml, mr, mt}){

    return (
        <View style={{display:'flex', flexDirection:'column', marginBottom:mb, marginHorizontal:mx, marginLeft:ml, marginRight:mr, marginTop:mt}}>
            {children}
        </View>
    );

}

export function HStack({mx=0, mb=0, space=0,p=0,alignItems, children}){

    return (
        <View style={{display:'flex', padding:p, alignItems:alignItems, flexDirection:'row', marginBottom:mb, marginHorizontal:mx}}>
            {children}
        </View>
    );

}