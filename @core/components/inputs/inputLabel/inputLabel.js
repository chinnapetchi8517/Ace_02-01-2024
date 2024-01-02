import * as React from 'react';
import styles from './styles';
import {TextInput, KeyboardTypeOptions, View, Text} from 'react-native';
import color from '../../../constant/color';
import isEmpty from '../../../utils/empty_checks';
import {Image} from 'react-native-svg';
import Images from '../../../assets';

const CrayonInputLabel = props => {
  const {
    label,
    keyboardType,
    value,
    placeholder,
    autoCapitalize,
    secureTextEntry,
    onChangeText,
    errorMessage,
  } = props;
  return (
    <View style={styles.container}>
      <Text styles={styles.label}>{label}</Text>
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
      {!isEmpty(errorMessage) ? (
        <View style={styles.errorContainer}>
          <Images.InfoEmpty></Images.InfoEmpty>
          <Text style={styles.errorLabel}>{errorMessage}</Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default CrayonInputLabel;
