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

export default class Interstitial extends React.Component {
  static navigationOptions = {
    title: 'Interstitial',
  };

  constructor() {
    super();
    this.state = {
      adNetwork: AdNetworkZoneId.interstitialZoneNetwork,
      responseId: ''
    };
  }

  _showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }


  onRequestClicked() {
    TapsellPlus.requestInterstitialAd(AdNetworkZoneId.getInterstitial())
      .then((r) => {
        this.setState({responseId: r});
        this._showToast(`Ad is ready: ${r}`);
       })
      .catch(error => {
        this._showToast(`Error occurred: ${error}`);
      });
  }

  onShowClicked() {
    if(this.state.responseId == '') {
      this._showToast("ResponseId is empty");
      return false;
    }
    if (!TapsellPlus.showInterstitialAd) {
      this._showToast("showInterstitialAd is not a function?")
      return false;
    }
    TapsellPlus.showInterstitialAd(
      this.state.responseId,
      (data) => {
        this._showToast(`AdOpened: ${data}`);
      },
      (data) => {
        this._showToast(`AdClosed: ${data}`);
      },
      (error) => {
        this._showToast(`AdError: ${error}`);
      }
    );
  }

  render() {
    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
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
            'unityads'
          ]}
          onValueChanged={(i) => {
            this.setState({ adNetwork: i })
            AdNetworkZoneId.interstitialZoneNetwork = i
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
