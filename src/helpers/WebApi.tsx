import Constants from '@helpers/Constants';
import { Settings, StoreSettings } from '@helpers/Settings';
import Utils from '@helpers/Utils';
import {fetch, ReactNativeSSLPinning} from 'react-native-ssl-pinning';
import CommonFunctions from './CommonFunctions';

/*
//response format
{
    "status": 200,
    "text": "OK",
    "data": {
        "authorization_code": "5b936156796b42a9e9564d6b61e8eae99c4b640729ae5982f97ab65defd49add",
        "expires_at": 1559740415
    }
}
*/
const enum Methods {
  POST_METHOD= 'POST',
  GET_METHOD= 'GET',
  DELETE_METHOD= 'DELETE',
}
const ResponseStatus = {
  STATUS_OK: 200,
  STATUS_BAD_REQUEST: 400,
  STATUS_UNAUTHORIZED: 401,
  STATUS_FORBIDDEN: 403,
  STATUS_UNPROCESSABLE_ENTITY: 422
}

const callApi = async(method:Methods, endpoint:string, data:object, isMultipart:boolean = false) => {
  
  var promise = new Promise(async (resolve, reject) => {            
    const url = Constants.API_SERVER_URL + endpoint;
    const token = await StoreSettings.get(StoreSettings.ACCESS_TOKEN);

    var config:ReactNativeSSLPinning.Options = {
      method: method,
      headers: {
        'Authorization': "Bearer " + token,
        // 'Content-Type': 'application/json',
        'Accept': "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "e_platform": "mobile",
      },
      body: JSON.stringify(data),
      // your certificates arra (needed only in android) ios will pick it automatically
      disableAllSecurity: true, // disable during dev
      sslPinning: {
        certs: ["staging","prod"] // your certificates name (without extension), for example c2c_staging.cer, c2c_prod.cer
      },
    };
    if(isMultipart){
      // config.headers['Content-Type'] = 'multipart/form-data';
      config!.headers!.Accept = 'application/json, text/plain, /';
      config.body = {
        formData: data,
      };
    }

    if (method == Methods.GET_METHOD) {
      delete config.body;
    }
    
    fetch(url, config)
    .then((res:any)=>res.json())
    .then((resJson:any)=>{
      resolve(resJson);
    }).catch((e:any)=>{
      Utils.log("callApi failed: " + url + "\n" + e);
      resolve(e.bodyString);
    });
        
  });
  return promise;
  
}

const callApiWithEncyptedResponse = async(method:Methods, endpoint:string, data?:object) => {
  
  var promise = new Promise(async (resolve, reject) => {            
    const url = Constants.API_SERVER_URL + endpoint;
    const token = await StoreSettings.get(StoreSettings.ACCESS_TOKEN);
    
    var config:ReactNativeSSLPinning.Options = {
      method: method,
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "e_platform": "mobile",
      },
      body: JSON.stringify(data),
      // your certificates array (needed only in android) ios will pick it automatically
      disableAllSecurity: true, // disable during dev
      sslPinning: {
        certs: ["staging","prod"] // your certificates name (without extension), for example c2c_staging.cer, c2c_prod.cer
      },
    }
    
    fetch(url, config).then(async(res:any)=>{
      res.text().then(async(text:any)=>{
        CommonFunctions.decrypt(text).then(async(response)=>{
          resolve(JSON.parse(response))
        });
      });
    }).catch((e:any)=>{
      Utils.error("callApiWithEncyptedResponse: " + url, e);
      resolve(e.bodyString);
    });
        
  });
  return promise;
  
}

const WebApi = {
  authorise: async(email:string, pwd:string) => {
    // post example
    var data = { "email": email, "password": pwd }
    return await callApi(Methods.POST_METHOD, '/user/authorize', data);
  },
  uploadAvatar: async(image_url:string, user_id:number) =>{
    // form data example
    var formData = new FormData();
    var f = {
      uri: image_url,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    }
    formData.append('image_file', f);
    var data = {"user_id": user_id, "description": '1'}

    formData.append('json',JSON.stringify(data));
    return await callApi(Methods.POST_METHOD, '/user/upload-profile-avatar', formData, true);
  },
  listServerSettingEncypt: async() =>{
    // get example
    return callApiWithEncyptedResponse(Methods.GET_METHOD, '/sys/list-setting-encrypt');
  },
  reverseGeolocation: async(lat:number, long:number, buffer:number) =>{
    //return callApi(GET_METHOD, '/sys/app-popup-banner');
    var promise = new Promise(async (resolve, reject) => {
      // let token = await Settings.get(Settings.ONE_MAP_TOKEN);
      let token = 'token123abc';
      const url = 'https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=' + lat + ',' + long + "&buffer=" + buffer + '&token=' + token;
      console.log("reverseGeolocation", url)
      // /const token = await StoreSettings.get(StoreSettings.ACCESS_TOKEN);

      var config:ReactNativeSSLPinning.Options = {
        method: Methods.GET_METHOD,
        disableAllSecurity: true,
        sslPinning: {
          certs: [] // your certificates name (without extension), for example c2c_staging.cer, c2c_prod.cer
        },
      }      
      fetch(url, config)
      .then((res:any)=>res.json())
      .then((resJson:any)=>{
        resolve(resJson);
      }).catch((e:any)=>{
        Utils.log("callApi: " + url,e);
        reject(e);
      });
          
    });
    return promise;
  },
};
export default { WebApi, ResponseStatus };
