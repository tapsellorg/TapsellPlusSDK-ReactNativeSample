import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default class Standard extends React.Component {
  static navigationOptions = {
    title: 'Standard',
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.button}>
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
