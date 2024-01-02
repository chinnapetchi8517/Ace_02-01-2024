import * as React from 'react';
import styles from './styles';
import {TextInput, KeyboardTypeOptions, View, Text} from 'react-native';
import color from '../../../constant/color';
import isEmpty from '../../../utils/empty_checks';
import {Image} from 'react-native-svg';
import Images from '../../../assets';
import Icons from '../../../assets/index';

const CrayonInput = props => {
  const {
    keyboardType,
    value,
    placeholder,
    autoCapitalize,
    secureTextEntry,
    onChangeText,
  } = props;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={color.neutral400}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

export default CrayonInput;
