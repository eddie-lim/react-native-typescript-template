import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Keyboard } from 'react-native';
import { withScreenBase } from '@screens/withScreenBase';
import { InputOutline, InputStandard } from 'react-native-input-outline';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import * as yup from 'yup';

type Props = {
  route: RouteProp<common.RootStackParamList>;
  navigation: MaterialBottomTabNavigationProp<common.RootStackParamList>;
};

const ScreenLogin: React.FC<Props> = ({ route, navigation }: Props) => {
  const emailInput = useRef<InputOutline>(null);
  const passwordInput = useRef<InputOutline>(null);
  const bouncyCheckboxRef = useRef<RNBounceable>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const setEmailValue = (e:string) =>{
    setEmail(e)
    // regex check for correct email pattern
  }
  const setPasswordValue = (e:string) =>{
    setPassword(e)
  }
  const handleCreateAccount = () =>{
    navigation.navigate('Register')
  }
  const handleLogin = () => {
    let schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });
    
    // check validity
    schema
    .isValid({
      email: email,
      password: password,
    })
    .then((valid) => {
      if(valid){
        setTimeout(() => {
          navigation.navigate('Main')
        }, 1234);
      } else {

      }
    })
    .catch((error) => {
      console.log(error.name)
      console.log(error.errors)
    });
  }

  return (
    <View style={styles.body} onTouchStart={()=>{
      Keyboard.dismiss();
    }}>
      <ImageBackground
        resizeMode={'cover'}
        style={styles.imageBackground}
        source={require('@assets/img/bg_login.png')}
      >
        <Image style={{height:'20%', resizeMode:'contain', marginBottom:15}} source={require('react-native/Libraries/NewAppScreen/components/logo.png')} />
        
        <View style={styles.inputContainer}>
          <InputOutline
            accessibilityLabel={'login email input'}
            ref={emailInput}
            error={emailError}
            trailingIcon={()=>{return<Icon name={'form-textbox'} color={'black'} size={26}/>}}
            roundness={12}
            onChangeText={(e:string) => setEmailValue(e)}
            placeholder="Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <InputOutline
            accessibilityLabel={'login password input'}
            ref={passwordInput}
            error={passwordError}
            trailingIcon={()=>{return<Icon name={'form-textbox-password'} color={'black'} size={26}/>}}
            roundness={12}
            onChangeText={(e:string) => setPasswordValue(e)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <RNBounceable
            style={{
              height: "100%",
              backgroundColor: "lime",
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            ref={bouncyCheckboxRef}
            onPress={() => {bouncyCheckboxRef.current?.animate(); handleLogin();}}
          >
            <Text style={{ color: "#fff" }}>LOGIN</Text>
          </RNBounceable>
        </View>
        {/* <Button style={{width:'80%', marginBottom:20, height:60, justifyContent:'center', backgroundColor:"green" }} icon="login" mode="contained" onPress={() => handleLogin()}>
          LOGIN
        </Button> */}
        <View style={styles.inputContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="lime"
            unfillColor="#FFFFFF00"
            text="Remember me"
            iconStyle={{ borderColor: "lime" }}
            textStyle={{ fontFamily: "JosefinSans-Regular", textDecorationLine: "none", color:'black' }}
            onPress={(isChecked:boolean|any) => { setRememberMe(isChecked) }}
          />
        </View>
        <View style={styles.inputContainer}>
          <RNBounceable
            style={{
              // height: "100%",
              // backgroundColor: "lime",
              // borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
            ref={bouncyCheckboxRef}
            onPress={() => {bouncyCheckboxRef.current?.animate(); handleCreateAccount();}}
          >
            <Text style={{ color: "#000" }}>Create Account</Text>
          </RNBounceable>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{textAlign:'center'}}>or connect using</Text>
        </View>
        <View style={{...styles.inputContainer, flexDirection:'row', justifyContent:'space-evenly'}}>
          <Icon name='facebook' color='navy' size={45} /> 
          <Icon name='google' color='blue' size={45} /> 
        </View>
      </ImageBackground>
    </View>
  );
}
export default withScreenBase(ScreenLogin);

var styles:common.StylesInterface = StyleSheet.create({
  body:{ flex: 1 },
  inputContainer: { width:"80%", height:45, marginBottom: 16 },
  imageBackground:{flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}
});
