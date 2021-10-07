/**
 * @format
 */

import React from 'react';
import { AppRegistry,LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { RootSiblingParent } from 'react-native-root-siblings';
import useWatchInternetConnection from '@hooks/useWatchInternetConnection';
import useActivityIndicator from "@hooks/useActivityIndicator";
import { GlobalContext } from '@helpers/Settings';

LogBox.ignoreAllLogs();

const Main = () => {
    const { toggleActivityIndicator, renderActivityIndicator } = useActivityIndicator();
    const { renderConnectedToInternetInfo, isConnectedToInternet } = useWatchInternetConnection();

    return (
        <RootSiblingParent>
            <GlobalContext.Provider value={{ toggleActivityIndicator, isConnectedToInternet }}>
                <App/>
                { renderActivityIndicator() }
                { renderConnectedToInternetInfo() }
            </GlobalContext.Provider>
        </RootSiblingParent>
    );
};

AppRegistry.registerComponent(appName, () => Main);
