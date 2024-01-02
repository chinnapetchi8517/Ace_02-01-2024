import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  wrapperChart: {
    alignItems: 'center',
    width: '100%',
  },
  legendContainer: {
    width: '95%',
    marginTop: -24,
    marginLeft: 20,
  },
  labels: {
    fontSize: 14,
    fill: color.white00,
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    lineHeight: 21,
  },
  legend_label: {
    fontSize: 12,
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default styles;
