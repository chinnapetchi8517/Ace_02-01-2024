import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';
const styles = StyleSheet.create({
  tabicon: {
    width: 66,
    height: 66,
    alignItems: 'center',
    borderTopWidth: 3,
    borderColor: color.secondary200,
  },
  tabiconselected: {borderTopWidth: 3, borderColor: color.primary500},
  tabtext: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: _const.blissRegular,
    color: color.neutral800,
  },
  tabDisabled: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: _const.blissRegular,
    color: color.neutral400,
  },
  tabtextselected: {color: color.primary500, fontWeight: '700'},
});

export default styles;
