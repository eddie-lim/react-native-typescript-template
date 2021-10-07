import { createContext } from 'react';
import Constants from '@helpers/Constants';
import Utils from '@helpers/Utils';
import EncryptedStorage from 'react-native-encrypted-storage';
import { isNumber, isObject, toString } from 'lodash';

const GlobalContext = createContext({});


//Usage:
//Settings.get(Settings.DEBUG_MODE)
//Settings.store(Settings.DEBUG_MODE, true);

//ephemeral settings
class Settings {
    static HAS_CHECKED_SERVER_SYNC:string = 'has_checked_server_sync';
    static HAS_NOTIFICATION:string = 'has_notification';
    static DEVICE_ID:string = 'device_id';
    static DEVICE_PLATFORM:string = 'device_platform';
    static IS_EMULATOR:string = 'is_emulator';
    static INSTALLED_APP_VERSION:string = 'current_app_version';
    static HAD_CHECK_SERVER_SYNC:string = 'had_check_server_sync';
    // SERVER SETTINGS
    static APP_LAST_SYNC:string = "app_last_sync";
    static APP_POPUP_STATUS:string = "app_popup";
    static APP_POPUP_MESSAGE:string = "app_popup_message";
    static APP_VERSION_ANDROID:string = "app_version_android";
    static APP_VERSION_IOS:string = "app_version_ios";
    static APP_POPUP_HAS_LINK:string = "app_popup_has_link";
    static APP_POPUP_LINK:string = "app_popup_link";
    static APP_POPUP_HAS_THUMBNAIL:string = "app_popup_has_thumbnail";
    static SYSTEM_UNDER_MAINTENANCE_STATUS:string = "system_under_maintenance";
    static SYSTEM_UNDER_MAINTENANCE_MESSAGE:string = "system_under_maintenance_message";
    static DEBUG_MODE:string = "debug_mode";

    static defaultSettings: common.DefaultSettings  = [];

    static globalAny:any = global;

    //need to call init() upon app starts
    static init = async() => {
        Utils.log('init Settings');
        this.reset();   
    }

    static reset = () => {
        Utils.log('reset Settings');
        this.defaultSettings = [];
        this.defaultSettings[this.HAD_CHECK_SERVER_SYNC] = false;
        this.defaultSettings[this.HAS_NOTIFICATION] = false;
        this.defaultSettings[this.DEVICE_ID] = "";
        this.defaultSettings[this.DEVICE_PLATFORM] = "";
        this.defaultSettings[this.IS_EMULATOR] = false;
        this.defaultSettings[this.INSTALLED_APP_VERSION] = "";

        // SERVER SETTINGS
        this.defaultSettings[this.APP_LAST_SYNC] = "";
        this.defaultSettings[this.APP_POPUP_STATUS] = Constants.STATUS_DISABLED;
        this.defaultSettings[this.APP_POPUP_MESSAGE] = "";
        this.defaultSettings[this.APP_VERSION_ANDROID] = "0.0.0";
        this.defaultSettings[this.APP_VERSION_IOS] = "0.0.0";
        this.defaultSettings[this.APP_POPUP_HAS_LINK] = Constants.STATUS_DISABLED;
        this.defaultSettings[this.APP_POPUP_LINK] = "";
        this.defaultSettings[this.APP_POPUP_HAS_THUMBNAIL] = Constants.STATUS_DISABLED;
        this.defaultSettings[this.SYSTEM_UNDER_MAINTENANCE_STATUS] = Constants.STATUS_DISABLED;
        this.defaultSettings[this.SYSTEM_UNDER_MAINTENANCE_MESSAGE] = "";
        this.defaultSettings[this.DEBUG_MODE] = Constants.STATUS_DISABLED;
        
        this.globalAny.settings = this.defaultSettings;
    }
    static store = (key:string, value:any) => {
        // Utils.log('Settings store:', key, value);
        this.isValidKey(key)
        this.globalAny.settings[key] = value;
    }
    static get = (key:string):any => {
        this.isValidKey(key)
        return this.globalAny.settings[key];
    }
    static isValidKey(key:string):boolean {
        let valid = false;
        Object.keys(this.defaultSettings).forEach(k => {
            if (key == k) {
                valid = true;
            }
        });
        if (!valid) {
            Utils.log('!isValidKey: ' + key);
        }
        return valid;
    }
    static debug = () => {
        //Utils.log(JSON.stringify(this.globalAny.settings));
        Utils.log(this.globalAny.settings);
    }
}

//Usage:
//const v = await StoreSettings.get(StoreSettings.FCM_TOKEN);
//await StoreSettings.store(StoreSettings.FCM_TOKEN, 'zxc-zxc-zxc-zcx');
//!!cannot store complicated datatypes...

//persistent settings
class StoreSettings {
    static FIRST_RUN:string = 'first_run';
    static IS_LOGGED_IN:string = 'is_logged_in';
    static FCM_TOKEN:string = 'fcm_token';
    static ACCESS_TOKEN:string = 'access_token';
    static USER_ID:string = 'user_id';
    static USER_EMAIL:string = 'user_email';
    static USER_NICKNAME:string = 'user_nickname';
    static USER_AVATAR_URL:string = 'user_avatar_url';
    static USER_CREDIT:string = 'user_credit';
    static USER_ACCOUNT_STATUS:string = 'user_account_status';
    static USER_EMAIL_STATUS:string = 'user_email_status';
    static LAST_DAILY_RESYNC:string = 'last_daily_resync';
    
    static defaultSettings: common.DefaultSettings= [
        [this.FIRST_RUN, 'true'],
        [this.IS_LOGGED_IN, 'false'],
        [this.FCM_TOKEN, '-'],
        [this.ACCESS_TOKEN, '-'],
        [this.USER_EMAIL, ''],

        [this.USER_ID, '0'],
        [this.USER_EMAIL, ''],
        [this.USER_NICKNAME, ''],
        [this.USER_AVATAR_URL, ''],
        [this.USER_CREDIT, '0'],
        [this.USER_ACCOUNT_STATUS, ''],
        [this.USER_EMAIL_STATUS, ''],
    ];
    
    //async storage need to call init() upon app starts
    static init = async() => {
        Utils.log('init StoreSettings');
        // try {
        //     const v = await AsyncStorage.getItem(this.FIRST_RUN);
        //     Utils.log("init FIRST_RUN: " + v);
        //     if (v == null) {
        //         await this.reset();
        //     }
        // } catch (e) {
        //     Utils.log(e);
        //     return false;
        // }
        try {
            const v = await this.get(this.FIRST_RUN);
            Utils.log("init FIRST_RUN: " + v);
            if (v == null) {
                await this.reset();
            }
        } catch (e) {
            Utils.log(e);
            return false;
        }
    }
    static reset = async () => {
        Utils.log('reset StoreSettings');
        try {
            var caches:common.DefaultSettings = [];
            caches.push([this.FIRST_RUN, await this.get(this.FIRST_RUN) == null ? "true" : await this.get(this.FIRST_RUN)]);
            caches.push([this.FCM_TOKEN, await this.get(this.FCM_TOKEN) == null ? "-" : await this.get(this.FCM_TOKEN)]);
            caches.push([this.USER_EMAIL, await this.get(this.USER_EMAIL) == null ? "" : await this.get(this.USER_EMAIL)]);
            Utils.log("Caches: ", caches);
            
            await EncryptedStorage.clear();

            for (let i = 0; i < caches.length; i++) {
                const cache = caches[i];
                await this.store(cache[0], cache[1]);
            }
            // Congrats! You've just cleared the device storage!
            return true;
        } catch (error) {
            // There was an error on the native side
            Utils.log(error);
            return false;
        }


        // try {
        //     var cache = [];
        //     cache.push([this.FIRST_RUN, await AsyncStorage.getItem(this.FIRST_RUN) == null ? await Utils.encrypt("true") : await AsyncStorage.getItem(this.FIRST_RUN)]);
        //     cache.push([this.FCM_TOKEN, await AsyncStorage.getItem(this.FCM_TOKEN) == null ? await Utils.encrypt("-") : await AsyncStorage.getItem(this.FCM_TOKEN)]);
        //     cache.push([this.USER_EMAIL, await AsyncStorage.getItem(this.USER_EMAIL) == null ? "" : await AsyncStorage.getItem(this.USER_EMAIL)]);
        //     // Utils.log("Cache: ", cache);
        //     await AsyncStorage.multiSet(this.defaultSettings);            
        //     await AsyncStorage.multiSet(cache);
        //     // this.debug();

        //     // await AsyncStorage.multiSet(this.defaultSettings);
        //     return true;
        // } catch (e) {
        //     Utils.log(e);
        //     return false;
        // }            
    }
    static store = async (key:string, value:any) => {
        // Utils.log('AsyncStorage store:', key, value);
        try {
            var val = value;
            if(isObject(value)){
                val = JSON.stringify(value);
            } else if(isNumber(value)){
                val = toString(value);
            }
            await EncryptedStorage.setItem(key, val);
            // Congrats! You've just stored your first value!
            return true;
        } catch (error) {
            // There was an error on the native side
            Utils.log(error);
            return false;
        }


        // if (value === null) value = '';
        // const valid = this.isValidKey(key);
        // if (!valid) { return null; }
        // try {
        //     var encrypted = await Utils.encrypt(value + '')
        //     await AsyncStorage.setItem(key, encrypted);
        //     return true;
        // } catch (e) {
        //     Utils.log(e);
        //     return false;
        // }
    }
    static get = async (key:string) => {
        try {   
            const session = await EncryptedStorage.getItem(key);
        
            if (session !== undefined) {
                // Congrats! You've just retrieved your first value!
                return session;
            } 
            return null;
        } catch (error) {
            // There was an error on the native side
            Utils.log(error);
            return null;
        }

        // const valid = this.isValidKey(key);
        // if (!valid) { return null; }
        // try {
        //     var decrypted = await Utils.decrypt(await AsyncStorage.getItem(key))
        //     return decrypted;
        // } catch (e) {
        //     Utils.log(e);
        //     return null;
        // }
    }
    static isValidKey(key:string) {
        let valid = false;
        this.defaultSettings.forEach((arr:Array<string>) => {
            if (key == arr[0]) {
                valid = true;
            }
        });
        if (!valid) {
            Utils.log('!isValidKey: ' + key);
        }
        return valid;
    }
    static clear = async() => {
        await EncryptedStorage.clear();
    }
    // static debug = () => {
    //     AsyncStorage.getAllKeys((err, keys) => {
    //         AsyncStorage.multiGet(keys, (err, stores) => {
    //             Utils.log(JSON.stringify(stores));
    //         });
    //     });
    // }
}

export { Settings, StoreSettings, GlobalContext };