import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appActiveOpacity, appBorderRadius} from '../../constant';
import color from '../../constant/color';
import styles from './styles';

const GenericButton = ({label, disabled, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : appActiveOpacity}
        onPress={onPress}
        style={styles.btnContainer}>
        <Text style={styles.mediumFont}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenericButton;
