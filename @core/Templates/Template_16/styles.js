import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  wrapper: {
    // paddingBottom: 30,
    // borderWidth: 1
  },
  headerTitle: {
    fontFamily: _const.blissBold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: color.primary600,
  },
  headerColumn: {
    flexDirection: 'row',
    marginTop: 20,
  },
  columnTitle: {
    width: '33.3%',
    paddingLeft: 13,
    fontFamily: _const.blissRegular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  renderContent: {
    borderRadius: 8,
    borderWidth: 0.5,
    backgroundColor: color.white00,
    borderColor: color.neutral300,
    flexDirection: 'row',
    paddingVertical: 17,
    marginTop: 12,
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  renderSelectedContent: {
    backgroundColor: color.neutral100,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  contentColum: {
    width: '33.3%',
    paddingLeft: 13,
  },
  metricTitle: {
    fontFamily: _const.blissMedium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    color: color.neutral900,
  },
  renderColum1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderColum2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderValue: {
    fontFamily: _const.blissBold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: color.neutral900,
    paddingRight: 2,
  },
  renderVariance: {
    fontFamily: _const.blissMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    paddingLeft: 2,
  },
  planTitle: {
    fontFamily: _const.blissRegular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: color.neutral500,
  },
  planeValue: {
    fontFamily: _const.blissRegular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: color.neutral500,
    paddingLeft: 2,
  },
  businessWrapper: {
    borderWidth: 1,
    borderColor: color.neutral200,
    backgroundColor: color.white00,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 0,
  },
  businessColumn: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 13,
    backgroundColor: color.white00,
  },
  businessContentColum: {
    width: '33%',
    paddingLeft: 13,
  },
  businessTitle: {
    fontFamily: _const.blissMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: color.neutral900,
  },
  line: {
    // borderStyle: 'dashed',
    borderColor: color.neutral300,
    borderTopWidth: 1,
    marginHorizontal: 13,
  },
  solidLine: {
    borderStyle: 'solid',
    borderColor: color.neutral300,
    borderTopWidth: 1,
    marginTop: 16,
  },
  dateItem: {
    fontFamily: _const.blissRegular,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    color: color.neutral500,
    marginTop: 12,
  },
});

export default styles;
