import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
// import { Settings, StoreSettings } from '@helpers/Settings';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { RouteProp } from '@react-navigation/native';

type Props = {
  route: RouteProp<common.RootStackParamList>;
  navigation: MaterialBottomTabNavigationProp<common.RootStackParamList>;
};

const ScreenSplash: React.FC<Props> = ({ route, navigation }: Props) => {
	const opening_animation = useRef<LottieView>(null);

  useEffect(() => {
    // StoreSettings.init().then(()=>{
    //   Settings.init();
      setTimeout(() => {
				handleAnimationFinish()
      }, 1350);
    // })
    return function cleanup() { } 
  }, []);

  const handleAnimationFinish=()=>{
		navigation.navigate('Login');
		// navigation.navigate(has_login ? 'Main' : 'Login');
  }

  return (
    <View style={styles.body}>
      {/* <ImageBackground
        resizeMode={'cover'}
        style={styles.imgBg}
        source={require('@assets/img/bg-orange.jpg')}
      > */}
        <LottieView
          ref={opening_animation}
          source={require('@assets/lottie/44214-mobile-application.json')}
          autoPlay={true}
          // onAnimationFinish={handleAnimationFinish}
          loop={false}
        />
      {/* </ImageBackground> */}
    </View>
  );
}

export default ScreenSplash;

const styles:common.StylesInterface = StyleSheet.create({
  body: { flex: 1, alignItems: 'stretch', flexDirection: 'column', backgroundColor: 'white' },
});
