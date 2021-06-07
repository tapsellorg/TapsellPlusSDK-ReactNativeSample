import React from "react";

import {
  ToastAndroid,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import containerStyle from '../component/CommonStyles'


import { TapsellPlus, TapsellPlusBannerType, TapsellPlusHorizontalGravity, TapsellPlusVerticalGravity } from 'react-native-tapsell-plus';
import AdNetworkZoneId from "../AdNetworkZoneId";
import AdNetworkSelector from "../component/AdNetworkSelector";

export default class Standard extends React.Component {
  static navigationOptions = {
    title: 'Standard',
  };

  constructor() {
    super();
    this.state = {
      adNetwork: AdNetworkZoneId.standardZoneNetwork,
      responseId: ''
    };
  }

  _showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  requestBanner() {
    if (!AdNetworkZoneId.getStandard()) {
      ToastAndroid.show(`${AdNetworkZoneId.standardZoneNetwork} does not have standard. Am I right?`)
      return false
    }
    TapsellPlus.requestStandardBannerAd(
      AdNetworkZoneId.getStandard(),
      TapsellPlusBannerType.BANNER_320x50).then((r) => {
        this.setState({ responseId: r });
        this._showToast(`Ad is ready: ${r}`);
      })
      .catch(error => {
        this._showToast(`Error requesting for standard banner: ${error}`);
      });
  }

  showBanner() {
    if (this.state.responseId != '') {
      this._showToast('Trying to show the ad: ' + this.state.responseId);
      TapsellPlus.showStandardBannerAd(this.state.responseId,
        TapsellPlusHorizontalGravity.BOTTOM,
        TapsellPlusVerticalGravity.CENTER,
        (data) => {
          this._showToast('Data available: ' + data);
        },
        (error) => {
          this._showToast(`Error loading banner: ${error}`);
        });
    } else {
      this._showToast("Request for the Ad first. there's no response_id")
    }
  }

  destroyBanner() {
    if (this.state.responseId != '') {
      TapsellPlus.destroyStandardBannerAd(this.state.responseId);
      this.state.responseId = '';
    }
  }

  hideBanner() {
    if(this.state.responseId == '') {
      this._showToast("ResponseId is empty. Request one first");
      return
    }
    TapsellPlus.hideStandardBanner();
  }

  displayBanner() {
    if(this.state.responseId == '') {
      this._showToast("ResponseId is empty. Request one first");
      return
    }
    TapsellPlus.displayStandardBanner();
  }

  render() {
    return (
      <View style={[styles.container, {
        display: "flex",
        flexDirection: "column"
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
            'unityads'
          ]}
          onValueChanged={(i) => {
            this.setState({ adNetwork: i })
            AdNetworkZoneId.standardZoneNetwork = i
          }} />

        <View
          style={{ flex: 6 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.requestBanner.bind(this)}>
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.showBanner.bind(this)}>
            <Text style={styles.buttonText}>Show</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.destroyBanner.bind(this)}>
            <Text style={styles.buttonText}>Destroy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.hideBanner.bind(this)}>
            <Text style={styles.buttonText}>Hide</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.displayBanner.bind(this)}>
            <Text style={styles.buttonText}>Display</Text>
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
