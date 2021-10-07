import React, {useState} from 'react';
import { Text, Dimensions, StyleSheet, Modal } from 'react-native';
// import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';

const useActivityIndicator = () => { 
  //causing error
  //const id = "single-modal-id"; //provide same id to all modal to prevent triggering multiple modal
  const id = "activity-indicator"; //provide key to supress error, shd use uuid instead?
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("Loading...");
  
  const toggle = (flag:boolean, text?:string) => {
    if(flag == false){
      setTimeout(() => {
        setVisible(flag);
      }, 567);
    } else {
      setVisible(flag);
      setMessage(text??"Loading...")
    }
  };

  const render = () => {
    return (
      // <Spinner
      //   visible={visible}
      //   textContent={message}
      //   textStyle={styles.spinnerTextStyle}
      // />
      <Modal key={id} visible={visible} animationType={'slide'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#00000070', margin: 0}}
        hardwareAccelerated={true}
      >
        <LottieView style={{height: 200}} source={require('@assets/lottie/448-ripple-loading.json')} autoPlay={true} loop={true} />
        <Text style={{color:'white'}}>{message}</Text>
        {/* <LottieView style={{height: 200}} source={require('@assets/animation/ripple-loading-448.json')} autoPlay={true} loop={true} /> */}
      </Modal>
    );
  }

  return { toggleActivityIndicator:toggle, renderActivityIndicator:render }

}
export default useActivityIndicator;

const styles:common.StylesInterface = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#000000aa',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    paddingTop: 10
  }  
});
