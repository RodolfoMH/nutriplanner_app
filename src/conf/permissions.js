import { PermissionsAndroid, Platform } from "react-native";

export async function requestAndroidPermission() {

    if(Platform.OS !== 'android'){
        return;
    }

    let permissionRequired = [
        PermissionsAndroid.PERMISSIONS.CAMERA
    ];
    
    try {
        const granted = await PermissionsAndroid.requestMultiple(permissionRequired);
    } catch (err) {
        console.log(err);
    }
  };