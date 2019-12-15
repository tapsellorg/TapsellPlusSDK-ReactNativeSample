import React from 'react';
import {ToastAndroid, StyleSheet} from 'react-native';
import NativeAd from '../component/NativeAd';

import TapsellPlus from 'react-native-tapsell-plus-sdk';
import {ZONE_IDS} from '../Constants';

export default class Native extends React.Component {
  static navigationOptions = {
    title: 'Native',
  };

  constructor() {
    super();

    this.state = {
      ad: {
        ad_id: '',
        zone_id: '',
        title: '',
        description: '',
        call_to_action_text: '',
        icon_url: '',
        portrait_static_image_url: '',
        landscape_static_image_url: '',
        error_message: '',
      },
    };

    TapsellPlus.requestNative(
      ZONE_IDS.NATIVE,
      (adData, onAdClicked) => {
        this.setState({
          clickListener: onAdClicked,
          ad: adData,
        });
        ToastAndroid.show('ad is ready', ToastAndroid.SHORT);
      },
      error => {
        ToastAndroid.show('ERROR\n' + error, ToastAndroid.SHORT);
      },
    );
  }

  clickFunc = () => {
    TapsellPlus.nativeAdClicked(ZONE_IDS.NATIVE, this.state.ad.ad_id);
  };

  render() {
    return <NativeAd ad={this.state.ad} onNativeAdClicked={this.clickFunc} />;
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
