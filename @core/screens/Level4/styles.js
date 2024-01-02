import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  flatlistInner: {
    // width: '100%',
    paddingTop: 31,
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: color.secondary50,
  },
  safeAreaWrapper: {
    backgroundColor: color.secondary50,
  },
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
  backText: {
    fontSize: 16,
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    color: color.white,
    marginRight: 8,
    marginLeft: 6,
  },
  backtohomeContainer: {
    backgroundColor: color.primary500,
    borderRadius: 60 / 2,
    bottom: 24,
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    right: 110,
    shadowColor: color.blackRussian,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    flexDirection: 'row',
  },
});

export default styles;
