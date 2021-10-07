import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { StyleConstant } from '@assets/MyStyle';

//ref: https://github.com/react-native-community/react-native-netinfo

const useWatchInternetConnection = () => { 
  const [isConnectedToInternet, setIsConnectedToInternet] = useState<boolean|null>(true);
  
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnectedToInternet(state.isInternetReachable)
    });
    return function cleanup() {
      // Unsubscribe
      unsubscribe();
    } 
  }, []);
  const render = () => {
    if (!isConnectedToInternet) {
      return (
        <View style={styles.content}>
          <Text style={styles.txt}>Internet connection not available. Please reconnect.</Text>
        </View>
      );
    }
  }
  return { renderConnectedToInternetInfo:render, isConnectedToInternet }
}
export default useWatchInternetConnection;

const styles:common.StylesInterface = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: StyleConstant.warnColor,
    position: 'absolute',
    padding: 5,
    paddingTop:40,
    width: '100%',
  },
  txt: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#333333',
  }  
});
