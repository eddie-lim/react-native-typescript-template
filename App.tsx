/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, StyleSheet, useColorScheme, Dimensions, Platform, ScaledSize } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createMaterialBottomTabNavigator, MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator, TransitionPresets, StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

/* Screens */
import ScreenSplash from "@screens/ScreenSplash";
import ScreenLogin from "@screens/ScreenLogin";
import ScreenRegister from "@screens/ScreenRegister";
import ScreenHome from "@screens/ScreenHome";
import ScreenLibrary from "@screens/ScreenLibrary";
import ScreenCollection from "@screens/ScreenCollection";

const Tab = createMaterialBottomTabNavigator<common.MainBottomTabStackParamList>();
const Stack = createStackNavigator<common.RootStackParamList>();

const App:React.FC = (props) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isReady, setIsReady] = useState<Boolean>(Platform.OS === 'ios' || Platform.OS === 'android');
    
  const theme = (useColorScheme() === 'dark' ? PaperDarkTheme : PaperLightTheme);
    
  const paperTheme = useMemo(() => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        surface: theme.colors.surface,
        accent: theme.dark ? 'rgb(255, 55, 95)' : 'rgb(255, 45, 85)',
      },
    };
  }, [theme.colors, theme.dark]);

  useEffect(() => {
    const onDimensionsChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };
    Dimensions.addEventListener('change', onDimensionsChange);
    return function cleanup() {
      Dimensions.removeEventListener('change', onDimensionsChange);
    }
  }, []);

  const MainBottomTabStack = () =>{
    return(
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="history"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'white' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const icons: common.BottomTabIcons = {
              Home: 'home',
              Library: 'bookshelf',
              Collection: 'book',
            };
  
            return (
              <Icon
                name={icons[route.name]}
                color={color}
                size={focused?30:26}
              />
            );
          },
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
          ...TransitionPresets.ModalPresentationIOS,
        })}
      >
        <Tab.Screen name="Home" component={ScreenHome} />
        <Tab.Screen name="Library" component={ScreenLibrary} />
        <Tab.Screen name="Collection" component={ScreenCollection} />
      </Tab.Navigator>
    )
  }

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar
        translucent
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor="rgba(0, 0, 0, 0.24)"
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={({ route }) => ({
            // transitionSpec: {
            //   open: TransitionSpecs.TransitionIOSSpec,
            //   close: TransitionSpecs.TransitionIOSSpec,
            // },
            // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            headerShown: false,
          })}
        >
          <Stack.Screen name="Splash" component={ScreenSplash} />
          <Stack.Screen name="Login" component={ScreenLogin} />
          <Stack.Screen name="Register" component={ScreenRegister} />
          <Stack.Screen name="Main" component={MainBottomTabStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
