import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  templateWrapper: {
    borderRadius: 8,
    width: 158,
    height: 180,
    backgroundColor: color.secondary200,
    margin:5
  },
  templateContent: {
    padding: 15,
  },
  templateTitle: {
    fontFamily: _const.blissMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    color: color.neutral900,
  },
  templateValue: {
    fontFamily: _const.blissBold,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 31,
    color: color.neutral900,
    marginTop: 16,
  },
  averageConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },
  averageValueConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 6,
  },
  averageText: {
    fontFamily: _const.blissMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    marginLeft: 2,
  },
  lastMonthText: {
    fontFamily: _const.blissMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    marginLeft: 8,
  },
});

export default styles;
