import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class RootScreen extends React.Component {
  static navigationOptions = {
    title: 'Tapsell Plus React Native Sample',
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Rewarded')}>
          <Text style={styles.buttonText}>Rewarded</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Interstitial')}>
          <Text style={styles.buttonText}>Interstitial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Native')}>
          <Text style={styles.buttonText}>Native</Text>
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
