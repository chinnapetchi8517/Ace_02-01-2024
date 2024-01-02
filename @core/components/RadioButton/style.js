import {StyleSheet} from 'react-native';
import color from '../../constant/color';
const styles = StyleSheet.create({
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: color.neutral200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonPressed: {
    borderColor: color.primary500, // Change border color when pressed
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: color.primary500,
  },
});

export default styles;
