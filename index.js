import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  RootScreen,
  RewardedScreen,
  InterstitialScreen,
  NativeScreen,
  StandardScreen,
} from './app/screen';

const RootStack = createStackNavigator({
  Root: {screen: RootScreen},
  Rewarded: {screen: RewardedScreen},
  Interstitial: {screen: InterstitialScreen},
  Native: {screen: NativeScreen},
  Standard: {screen: StandardScreen},
});

const AppContainer = createAppContainer(RootStack);
export default AppContainer;

class TapsellPlusSample extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <AppContainer uriPrefix="/app" />;
  }
}

AppRegistry.registerComponent(appName, () => TapsellPlusSample);
