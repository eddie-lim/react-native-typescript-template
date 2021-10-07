import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { GlobalContext } from '@helpers/Settings';
// import firebase from 'react-native-firebase';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { RouteProp } from '@react-navigation/native';

type MainBottomTabStackProps = {
  route: RouteProp<common.MainBottomTabStackParamList>;
  navigation: MaterialBottomTabNavigationProp<common.MainBottomTabStackParamList>;
};
type RootStackProps = {
  route: RouteProp<common.RootStackParamList>;
  navigation: MaterialBottomTabNavigationProp<common.RootStackParamList>;
};

//higher order compnonet
//ref: https://www.youtube.com/watch?v=l8V59zIdBXU&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=35
const withScreenBase = (WrappedComponent: React.FC<MainBottomTabStackProps | RootStackProps | any>, navigationOptions=null) => {

  const screenBase: React.FC<MainBottomTabStackProps | RootStackProps | any> = (props) => {
    // const { renderActivityIndicator, renderCustomDialog, renderCustomPopup } = useContext(GlobalContext);

    return (
      <View style={[styles.container]}>
        <WrappedComponent {...props} />
      </View>
    );
  }

  //note: option to navigationOptions or "props.navigation.setParams({"navOptions":navOptions});"
  //example in ScreenExplore, for encapsulating functions in hooks.

  //ref: https://reactnavigation.org/docs/en/navigation-prop.html
  //ref: https://blog.usejournal.com/react-navigation-cheatsheet-bf99f09d8060
  

  // if (navigationOptions != null) {
  //   screenBase.navigationOptions = navigationOptions
  // } else {
  //   screenBase.navigationOptions = ({navigation}) => ({
  //     ...navigation.getParam("navOptions", {})
  //   });
  // }

  return screenBase;
}

export { withScreenBase }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //backgroundColor: "#ff0000",
    width: '100%',
    height: '100%',
  },
});