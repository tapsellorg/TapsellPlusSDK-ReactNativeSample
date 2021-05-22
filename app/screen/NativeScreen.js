import React from 'react';
import { ToastAndroid, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
// import NativeAd from '../component/NativeAd';

import TapsellPlus from 'react-native-tapsell-plus';
import AdNetworkZoneId from '../AdNetworkZoneId';
import AdNetworkSelector from '../component/AdNetworkSelector'
import NativeAd from '../component/NativeAd'

export default class Native extends React.Component {
  static navigationOptions = {
    title: 'Native',
  };

  _showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }


  constructor() {
    super();

    this.state = {
      adNetwork: AdNetworkZoneId.nativeZoneNetwork,
      responseId: '',
      ad: {
        ad_id: '',
        zone_id: '',
        response_id: '',
        title: '',
        description: '',
        call_to_action_text: '',
        icon_url: '',
        portrait_static_image_url: '',
        landscape_static_image_url: '',
        error_message: '',
      },
    };

  }

  requestNativeAd() {
    TapsellPlus.requestNativeAd(AdNetworkZoneId.getNative()).then(r => {
      this.state.responseId = r;
      this._showToast(`Native Ad is ready\n${this.state.adNetwork} : ${r}`);
    })
    .catch(error => {
      this._showToast(`"${this.state.adNetwork}" adNetwork failed\n${error}`);
    })
  }

  showNativeAd() {
    this._showToast("Showing ad with responseId: " + this.state.responseId);
    TapsellPlus.showNativeAd(this.state.responseId, (data) => {
      console.log(data)
      this.setState({ ad: data});
    }, (error) => {
      this._showToast(`Failed: ${error}`);
    });
  }

  clickFunc = () => {
    TapsellPlus.nativeAdClicked(this.state.responseId);
  };

  render() {
    return (
      <View style={[styles.container, { flexDirection: 'column', flexWrap: 'nowrap' }]}>
        <View style={{ flex: 1 }}>
          <AdNetworkSelector
            label="AdNetwork"
            selectedValue={this.state.adNetwork}
            style={{
              flex: 1,
            }}
            items={[
              'tapsell',
            ]}
            onValueChanged={(i) => {
              this.setState({ adNetwork: i })
              AdNetworkZoneId.nativeZoneNetwork = i
            }} />
        </View>
        <View style={{ flex: 6 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.requestNativeAd.bind(this)}>
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.showNativeAd.bind(this)}>
            <Text style={styles.buttonText}>Show</Text>
          </TouchableOpacity>
        </View>
        { console.log("") }
        { this.state.ad.ad_id != '' ? <NativeAd ad={this.state.ad} onNativeAdClicked={this.clickFunc} /> : null }
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
