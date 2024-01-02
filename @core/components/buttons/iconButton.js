import * as React from 'react';
import styles from './styles';
import Images from '../../assets';
import {Text, View, Pressable} from 'react-native';
import color from '../../constant/color';

const CrayonIconButton = ({label, disabled, onPress}) => {
  return (
    <Pressable
      style={styles.pressable} onPress={onPress}>
      <View style={styles.button}>
        <Images.MicrosoftIcon />
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default CrayonIconButton;
