import React from 'react';
import {
  ToastAndroid,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import TapsellPlus from 'react-native-tapsell-plus';
import AdNetworkZoneId from '../AdNetworkZoneId';
import AdNetworkSelector from '../component/AdNetworkSelector'
import containerStyle from '../component/CommonStyles'

export default class Rewarded extends React.Component {
  static navigationOptions = {
    title: 'Rewarded',
  };

  constructor() {
    super();
    this.state = {
      adNetwork: AdNetworkZoneId.rewardeZoneNetwork,
      responseId: ''
    }; 
  }


  _showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  onRequestClicked() {
      TapsellPlus.requestRewardedVideoAd(AdNetworkZoneId.getRewarded()).then(r => {
        this.setState({ responseId : r});
        this._showToast(`Ad ready (id: ${r})`);
      })
      .catch(error => {
        this._showToast(`Error: ${error}`);
      })
  }

  // TODO: Could be replaced with a map instead of bunch of callbacks
  onShowClicked() {
    TapsellPlus.showRewardedVideoAd(this.state.responseId, (data)=> {
      // on Opened
      this._showToast(`AdOpened: ${JSON.stringify(data)}`);
  }, (data) => {
    // on Closed
    this._showToast(`AdClosed: ${JSON.stringify(data)}`);
  }, (data) => {
    // on Rewarded
    this._showToast(`AdRewarded: ${JSON.stringify(data)}`);
  }, (errorData) => {
    // on error
    this._showToast(`AdError: ${JSON.stringify(errorData)}`);
  })
  }

  render() {
    return (
      <View style={[styles.container, {
        height: 100
      }]}>
        <AdNetworkSelector
          label="AdNetwork"
          selectedValue={this.state.adNetwork}
          style={{
            flex: 1
          }}
          items={[
            'tapsell',
            'google',
            'applovin',
            'adcolony',
            'chartboost',
            'unityads'
          ]}
          onValueChanged={(i) => {
            this.setState({ adNetwork: i })
            AdNetworkZoneId.rewardeZoneNetwork = i
          }} />
        <View
          style={{ flex: 6 }}>
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

  container: {
    flex: 1,
    padding: 10,
  },
});
