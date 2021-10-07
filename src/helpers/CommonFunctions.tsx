import Toast from 'react-native-root-toast';
import {Keyboard} from 'react-native';
// import firebase from 'react-native-firebase';
import Constants from '@helpers/Constants';

const CommonFunctions = {
  showToast: (msg:string) => {
    Keyboard.dismiss();
    Toast.show(msg, { duration:Toast.durations.LONG });
  },
  // showNotification: (notification:{
  //   notificationId: number;
  //   title: string;
  //   body: string;
  // }) => {
  //   const notif = new firebase.notifications.Notification()
  //   .android.setChannelId(Constants.CHANNELID)
  //   .setNotificationId(notification.notificationId)
  //   .setTitle(notification.title)
  //   .setBody(notification.body);
  //   firebase.notifications().displayNotification(notif)
  // },
  encrypt: async(text:string) => {
    var CryptoJS = require("crypto-js");
    var iv = CryptoJS.enc.Hex.parse(new Int8Array(32).join(""));
    var key = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(Constants.ENCRYPT_KEY).toString());
    var result  = CryptoJS.AES.encrypt(text, key, { iv: iv }).toString();
    return result;
  },
  decrypt: async(text:string) => {
    var CryptoJS = require("crypto-js");
    var iv = CryptoJS.enc.Hex.parse(new Int8Array(32).join(""));
    var key = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(Constants.ENCRYPT_KEY).toString());
    var result  = CryptoJS.AES.decrypt(text, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    return result;
  },
};


export default CommonFunctions;