/**
 * @format
 */

import React from 'react';
import {AppRegistry, View, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const HelloWorldApp = () => {
    return(
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Hello, world!</Text>
        </View>
    );
}

AppRegistry.registerComponent(appName, () => HelloWorldApp);
