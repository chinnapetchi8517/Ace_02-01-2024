import React, {useState} from 'react';
import SwitchSelector from 'react-native-switch-selector';
import color from '../../constant/color';
import _const from '../../constant/const';
import styles from './style';

const Switch = ({
  containerStyles,
  options,
  selectedOption,
  handleClick,
  initialValue,
  backgroundColor,
}) => {
  return (
    <SwitchSelector
      options={options}
      buttonColor={color.primary500}
      onPress={value => handleClick(value)}
      borderRadius={6.93}
      style={[styles.container, {...containerStyles}]}
      textStyle={styles.textStyle}
      selectedTextStyle={styles.selectedTextStyle}
      height={28}
      backgroundColor={backgroundColor ? backgroundColor : color.neutral200}
      initial={initialValue ? initialValue : 0}
    />
  );
};

export default Switch;
