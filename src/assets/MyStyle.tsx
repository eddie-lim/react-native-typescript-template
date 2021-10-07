import React from 'react';
import { Text, View, StyleSheet, Platform, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Settings, StoreSettings, GlobalContext } from '@helpers/Settings';

const StyleConstant:{[key: string]: object | string | number | any;} = {
  primaryColor: "#0c4c23",
  primaryColorLight: "#3e794c",
  primaryColorDark: "#002400",
  primaryTextColor: "#000000",

  secondaryColor: "#fbc02d",
  secondaryColorWithAlpha: '#fbc02dda',
  secondaryColorLight: "#fff263",
  secondaryColorDark: "#c49000",  
  secondaryTextColor: "#ffffff",
  mutedTextColor: "#767676",
  // mutedTextColor: "#cccccc",

  warnColor: "#ffee75",
  bgGray: "#eeeeee",
  tabGray: "#999",
  xmasRed: "#af0005",
  additionRed: "#c62828",

  titleFontSize: 28,
}

const MyTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: StyleConstant.primary,
    accent: StyleConstant.secondary,
  }
};


//ref: https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
const HeaderStyle:object = {
  headerStyle : {backgroundColor: StyleConstant.primaryColor},
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white'
};

const HeaderStyleWithBackDroid:object = {
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white',
  headerStyle: { backgroundColor: StyleConstant.primaryColor },
  headerTitleContainerStyle: {
    left: 0
  }
};
const HeaderStyleWithBackIos:object = {
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white',
  headerStyle: { backgroundColor: StyleConstant.primaryColor },
  headerTitleContainerStyle: {}
};
//different style required for droid and ios
const HeaderStyleWithBack:object = Platform.OS === 'android'? HeaderStyleWithBackDroid : HeaderStyleWithBackIos;

const HeaderStyleWithRight:object = {
  headerTitleStyle: { color: "white", alignSelf: "center", marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: "normal"},
  headerTintColor: 'white',
  headerStyle: { backgroundColor: StyleConstant.primaryColor },
  headerTitleContainerStyle: {
    alignItems: "center"
  }
};

const HeaderWithTexture = (title:string) => {
  return(
    <View style={{width: '100%', height: 56, backgroundColor: '#074d21', paddingTop: 0}}>
      <ImageBackground source={require('@assets/img/bg_login.png')} style={{width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>{title}</Text>
      </ImageBackground>
    </View>
  )
}

const ShadowStyle:object = { shadowColor: 'rgba(0,0,0,0.4)', shadowOffset: {height: 1, width: 1}, shadowOpacity: 1, shadowRadius: 1, elevation: 2 }
const fabStyle:object = { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }

const HeaderWithBack = (title:string, navigate:any, headerLeft:JSX.Element, headerRight:JSX.Element | null =null)=>{
  return(
    <View style={{width: '100%', height: 56, backgroundColor: '#074d21', paddingTop: 0}}>
      <ImageBackground source={require('@assets/img/bg_login.png')} style={{width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{alignSelf: 'center', color: 'white'}}>{title}</Text>
        {headerLeft}
        {headerRight}
      </ImageBackground>
    </View>
  );
}

const NavOptionStyle = {
  transparent : {headerTitleAlign: 'left', headerTransparent: true, backgroundColor: 'transparent', headerTintColor: 'black', headerBackTitle: null, headerTitleStyle: {fontSize: 14, left: -30, fontWeight: 'normal'}},
  transparentWhite : {headerTitleAlign: 'left', headerTransparent: true, backgroundColor: 'transparent', headerTintColor: 'white', headerBackTitle: null, headerTitleStyle: { fontSize: 14, left: -30, fontWeight: 'normal'}},};

const ShareStyle:common.StylesInterface = StyleSheet.create({
  titleTxt: { fontSize: StyleConstant.titleFontSize, lineHeight:StyleConstant.titleFontSize, color: StyleConstant.primaryColorLight, textAlign: 'center', textAlignVertical: 'center', },
  flex1: { flex: 1, },
  flex2: { flex: 2, },
  flex3: { flex: 3, },
  txtBold : { fontWeight: 'bold' },
  txtRegular : {},
  textShadow: { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 }
});
/*
const MyThemeReactPaper = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: StyleConstant.primaryColor,
    accent: StyleConstant.primaryColorLight,
  },
};
*/

export { StyleConstant, ShareStyle, MyTheme, HeaderStyle, HeaderStyleWithBack, HeaderStyleWithBackIos, HeaderStyleWithRight, ShadowStyle, fabStyle, NavOptionStyle, HeaderWithTexture, HeaderWithBack };