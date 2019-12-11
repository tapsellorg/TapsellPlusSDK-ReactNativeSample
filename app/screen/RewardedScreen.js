import React from 'react';
import {
  ToastAndroid,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import TapsellPlus from 'react-native-tapsell-plus-sdk';
import {ZONE_IDS} from '../Constants';

export default class Rewarded extends React.Component {
  static navigationOptions = {
    title: 'Rewarded',
  };

  onRequestClicked() {
    TapsellPlus.requestRewarded(
      ZONE_IDS.REWARDED,
      () => {
        ToastAndroid.show('ad is ready', ToastAndroid.SHORT);
      },
      error => {
        ToastAndroid.show('ERROR\n' + error, ToastAndroid.SHORT);
      },
    );
  }

  onShowClicked() {
    TapsellPlus.showAd(
      ZONE_IDS.REWARDED,
      () => {
        ToastAndroid.show('open ad', ToastAndroid.SHORT);
      },
      () => {
        ToastAndroid.show('close ad', ToastAndroid.SHORT);
      },
      () => {
        ToastAndroid.show('rewarded', ToastAndroid.SHORT);
      },
      error => {
        ToastAndroid.show('ERROR\n' + error, ToastAndroid.SHORT);
      },
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onRequestClicked.bind(this)}>
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.onShowClicked.bind(this)}>
          <Text style={styles.buttonText}>Show</Text>
        </TouchableOpacity>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#33AAFF',
    padding: 10,
    margin: 10,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
