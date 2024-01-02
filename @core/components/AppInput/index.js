import * as React from 'react';
import {StyleSheet, TextInput, KeyboardTypeOptions} from 'react-native';
import {appBorderRadius} from '../../constant';
import color from '../../constant/color';
import styles from './styles';

const AppInput = props => {
  const {
    keyboardType,
    value,
    placeholder,
    autoCapitalize,
    secureTextEntry,
    onChangeText,
  } = props;
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={color.gray}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
    />
  );
};

export default AppInput;
