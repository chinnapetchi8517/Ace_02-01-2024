import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    paddingBottom: 10,
  },
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
    width: '100%',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
    fontFamily: _const.blissMedium,
    color: color.neutral900,
    textAlign: 'left',
    paddingTop: 8,
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
    paddingRight: 2
  },
  planNameLabel: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: _const.blissMedium,
    color: color.neutral500,
    textAlign: 'left',
    justifyContent: 'flex-end',
    opacity: 0.8,
  },
});

export default styles;
