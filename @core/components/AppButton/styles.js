import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appBorderRadius} from '../../constant';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: color.highlight500,
    margin: 15,
    width: wp('92%'),
    height: hp('5.5%'),
    borderRadius: appBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediumFont: {
    fontSize: hp('1.8%'),
    color: 'white',
    fontWeight: '700',
  },
});

export default styles;
