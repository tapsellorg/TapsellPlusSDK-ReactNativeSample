import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import {
  RootScreen,
  RewardedScreen,
  InterstitialScreen,
  NativeScreen,
  StandardScreen
} from './app/screen';

import { TapsellPlus } from 'react-native-tapsell-plus';
import { APP_KEY } from "./app/Constants";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


class TapsellPlusSample extends React.Component {
  constructor() {
    super();
    TapsellPlus.initialize(APP_KEY);
    TapsellPlus.setDebugMode(3);
    this.state = {
      Standard: 'tapsell',
      Native: 'tapsell',
      Interstitial: 'tapsell',
      Rewarded: 'tapsell'
    }
  }

  onAdItemClick(name) {
    ToastAndroid.show(`Item ${name} was clicked`, ToastAndroid.SHORT);
  }

  render() {
    return (
      <AppStack />
    )
  }
}

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={RootScreen}
          options={{ title: 'Select an Ad type' }}
        />
        <Stack.Screen
          name="Standard"
          component={StandardScreen}
          options={{ title: 'Standard banner' }}
        />
        <Stack.Screen
          name="Interstitial"
          component={InterstitialScreen}
          options={{ title: 'Interstitial ad' }}
        />
        <Stack.Screen
          name="Native"
          component={NativeScreen}
          options={{ title: 'Native ad' }}
        />
        <Stack.Screen
          name="Rewarded"
          component={RewardedScreen}
          options={{ title: 'Rewarded ad' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


AppRegistry.registerComponent(appName, () => TapsellPlusSample);
