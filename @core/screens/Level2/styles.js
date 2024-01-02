import {StyleSheet} from 'react-native';

// Constant
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  flatlistInner: {
    // width: '100%',
    paddingTop: 31,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: color.secondary200,
    // marginTop: 28,
  },
  listTitleInfo: {
    width: 'auto',
  },
  selectedtitleInfo: {
    borderBottomColor: color.primary500,
    borderBottomWidth: 4,
    color: color.primary500,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: color.neutral700,
    fontFamily: _const.blissMedium,
    textAlign: 'center',
    marginBottom: 2,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: color.neutral500,

    fontFamily: _const.blissBold,
    textAlign: 'center',
  },
  selectedsubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: color.neutral900,
    fontFamily: _const.blissBold,
    textAlign: 'center',
  },
  subtitle1: {
    fontSize: 10,
    fontWeight: '700',
    color: color.success600,
    fontFamily: _const.blissBold,
    marginLeft: 4,
    textAlign: 'center',
  },
  subtitle2: {
    fontSize: 10,
    fontWeight: '700',
    color: color.error500,
    fontFamily: _const.blissBold,
    marginLeft: 4,
    textAlign: 'center',
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: color.primary500,
    fontFamily: _const.blissMedium,
    marginBottom: 2,
    lineHeight: 20,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: color.secondary50
  },
  safeAreaWrapper:{
    backgroundColor: color.secondary50
  },
  listWrapper: {
    backgroundColor: color.secondary200,
    paddingHorizontal: 4,
    paddingTop: 12,
  },
  alignItemsCenter: {alignItems: 'center', marginHorizontal: 20},
  filterContainer: {
    backgroundColor: color.primary500,
    borderRadius: 60 / 2,
    bottom: 44,
    padding: 12,
    position: 'absolute',
    right: 20,
    shadowColor: color.blackRussian,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
  },
});

export default styles;
