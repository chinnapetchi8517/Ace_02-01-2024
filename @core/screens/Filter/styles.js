// Filter Styles
import {Dimensions, StyleSheet} from 'react-native';

// Constant
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  bottomButtonContainer: {
    alignSelf: 'center',
    backgroundColor: color.secondary100,
    bottom: 0,
    paddingHorizontal: 18,
    paddingVertical: 16,
    position: 'absolute',
    width: '100%',
  },
  headerText: {
    color: color.neutral900,
    fontFamily: _const.blissMedium,
    fontSize: 18,
    fontWeight: '500',
  },
  headerViewstyle: {
    alignItems: 'center',
    backgroundColor: color.secondary200,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 28,
    justifyContent: 'space-between',
  },
  line: {
    borderBottomColor: color.neutral300,
    borderBottomWidth: 1,
  },
  navLeftBackstyle: {
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 32 / 2,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  noRecordContainer: {
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.75,
    justifyContent: 'center',
  },
  scrollstyle: {
    backgroundColor: color.secondary50,
    paddingBottom: 100,
  },
  subTitle: {
    color: color.neutral900,
    fontFamily: _const.blissRegular,
    fontSize: 18,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  subView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: color.grey,
    fontFamily: _const.blissRegular,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  title_noRecord: {
    color: color.neutral600,
    fontFamily: _const.blissMedium,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
  },
  top20: {
    marginTop: 20,
  },
  top32: {
    marginTop: 32,
  },
  wrapper: {
    backgroundColor: color.secondary50,
    height: '100%',
    paddingHorizontal: 16,
    width: '100%',
  },
  reset: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "500",
    fontFamily: _const.blissMedium,
    color: color.primary500,
    }
});
export default styles;
