import React from 'react';
import {Pressable, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import color from '../../constant/color';

export default PrimaryButton = ({
  label,
  onPress,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={
        !isLoading
          ? !disabled
            ? styles.container
            : [styles.container, styles.disabled]
          : styles.container
      }
      disabled={disabled || isLoading}>
      {!isLoading ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        <ActivityIndicator size={'small'} color={color.white00} />
      )}
    </Pressable>
  );
};
