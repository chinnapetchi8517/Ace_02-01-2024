import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';
const styles = StyleSheet.create({
  wrapperChart: {
    alignItems: 'center',
  },
  legendContainer: {
    marginTop: 24,
    marginLeft: 20,
  },
  labels: {
    fontSize: 14,
    fill: color.white00,
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    lineHeight: 21,
  },
});

export default styles;
