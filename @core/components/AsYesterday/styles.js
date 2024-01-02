import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  
  title: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: _const.blissMedium,
    color: color.neutral700,
    textAlign: 'left',
    opacity: 0.8,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    width: '100%',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
    fontFamily: _const.blissMedium,
    color: color.blue100,
    textAlign: 'left',
    paddingRight: 8,
  },
  varianceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  varianceValue: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: _const.blissMedium,
    color: color.success600,
  },
  planNameLabel: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: _const.blissMedium,
    color: color.neutral500,
    textAlign: 'left',
    justifyContent: 'flex-end',
    opacity: 0.8,
    paddingHorizontal:5
  },
});

export default styles;
