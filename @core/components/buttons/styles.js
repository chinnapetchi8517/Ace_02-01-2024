import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: color.neutral300,
    borderRadius: 8,
    columnGap: 12,
    width: '100%',
  },
  label: {
    color: color.neutral500,
    fontFamily: _const.blissRegular,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default styles;
