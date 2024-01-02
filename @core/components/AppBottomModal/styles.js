import {Dimensions, Platform, StyleSheet} from 'react-native';
import {appBorderRadius} from '../../constant';
import color from '../../constant/color';
import _const from '../../constant/const';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = (width, height) => (width < height ? 350 : 500);
const guidelineBaseHeight = (width, height) => (width < height ? 680 : 350);
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const scale = size => {
  const {width, height} = Dimensions.get('window');
  return (width / guidelineBaseWidth(width, height)) * size;
};
// vericalscale - for vertical..
const verticalScale = size => {
  const {width, height} = Dimensions.get('window');
  return (height / guidelineBaseHeight(width, height)) * size;
};

const createStyles = {
  containerView: {
    width: '100%',
    marginTop: 10,
    // paddingBottom:20,
    alignSelf: 'center',
    // backgroundColor: 'yellow',
    // borderTopLeftRadius: scale(10),
    // borderTopRightRadius: scale(10),
    maxHeight: '60%',
  },
  grayLine: {
    height: 5,
    width: 50,
    backgroundColor: '#a3a3a3',
    borderRadius: 20,
    top: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  lottieContainer: {
    width: scale(110),
    height: verticalScale(108),
    backgroundColor: '#fff',
    borderRadius: moderateScale(70),
    position: 'absolute',
    top: moderateScale(-10),
    alignSelf: 'center',
  },
  lottieAnimStyle: {
    // top: moderateScale(-10),
    width: scale(70),
    height: verticalScale(70),
    alignSelf: 'center',
    marginTop: 6,
  },
  childrenView: {
    marginTop: moderateScale(12),
    marginBottom: 0,
  },
  confirmText: {
    fontSize: moderateScale(16),
    color: '#000',
  },
  confirmMsgText: {
    fontSize: moderateScale(14),
    color: '#000',
    marginTop: moderateScale(5),
    marginHorizontal: moderateScale(10),
    textAlign: 'center',
  },
  confirmView: {
    // flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 22,
    width: '100%',
    paddingBottom:
      Platform.OS === 'android' ? moderateScale(60) : moderateScale(60),
  },
  buttonModelText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  touchableOpacity: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '40%',
  },
  signInBtn: {
    marginTop: 10,
    backgroundColor: color.primaryColor,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    height: 50,
    width: '90%',
    borderRadius: appBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {color: '#fff', fontSize: 16, fontFamily: _const.blissBold},
  modalstyle: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalviewstyle: {
    backgroundColor: 'white',
    width: '100%',
    height: hp(30),
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  closebtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: wp(5),
    //top: hp(2),
    position: 'absolute',
  },
  feed: {
    color: color.primary700,
    fontSize: 20,
    marginTop: hp(4),
    marginBottom: hp(2),
    marginHorizontal: 20,
    fontFamily: _const.blissBold,
    fontWeight: '700'
  },
};

export default createStyles;
