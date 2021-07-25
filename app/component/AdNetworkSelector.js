import React from 'react'
import { Picker as ThePicker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';

/**
 * 
 * @param {{
 * label: String
 * selectedValue: String,
 * items: [String]
 * onValueChanged: Function(String)
 * }} props 
 * @returns 
 */
const AdNetworkSelector = (props) => {
  const pickerItems = props.items.map(i => (
    <ThePicker.Item label={i.toString()} value={i} key={i.toString()} />
  ));
  return (
    <View style={[props.style, { flexDirection: "column", padding: 10 }]} >
      <Text style={{ padding: 4, color: '#33AAFF' }}>{props.label}</Text>
      <ThePicker
        selectedValue={props.selectedValue}
        onValueChange={(itemValue, itemIndex) => props.onValueChanged(itemValue)} >
        {pickerItems}
      </ThePicker>
    </View>
  );
}

export default AdNetworkSelector;