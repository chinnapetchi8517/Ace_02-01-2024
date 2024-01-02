import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: color.secondary100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  label: {
    color: color.neutral800,
    fontFamily: _const.blissRegular,
    fontSize: 18,
  },
  tryAgainConatainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginTop: 8,
  },
  tryAgain: {
    color: color.primaryColor,
    fontFamily: _const.blissRegular,
    fontSize: 16,
    fontWeight: '500',
  },
});
export default styles;