import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    // marginBottom:10,
    },
  title: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: _const.blissMedium,
    color: color.neutral700,
    textAlign: 'left',
    opacity: 0.8,
    width:'100%'

  },
  rowContainer: {
    flexDirection: "row",
    paddingTop: 8,
    width: '100%',
    justifyContent:'space-between'
  },
  value: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
    fontFamily: _const.blissMedium,
    color: color.neutral900,
    textAlign: 'left',
  },
  previousTargetContainer:{
    flexDirection: "row",
    alignItems: "center"
  },
  previousValue: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: _const.blissMedium,
    color: color.success600,
    textAlign: 'left',
  },
  targetValue: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: _const.blissMedium,
    color: color.error500,
    textAlign: 'left',
  },
  previousTargetLabel: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: _const.blissMedium,
    color: color.neutral500,
    textAlign: 'left',
    opacity: 0.8,
  },
});

export default styles;
