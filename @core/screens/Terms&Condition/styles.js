import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: color.secondary50
  },
  headerstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  title: {
    fontSize: 28,
    fontFamily: _const.blissBold,
    color: color.textblack,
    marginHorizontal: 20,
  },
  subtitle: {
    color: color.textblack,
    marginHorizontal: 20,
    fontSize: 18,
    fontFamily: _const.blissRegular,
    marginVertical: 10,
  },
  subtitle1: {
    color: color.neutral700,
    marginHorizontal: 20,
    fontSize: 18,
    lineHeight: 27,
    fontFamily: _const.blissRegular,
    //marginVertical: 10,
  },
  margin: {
    marginHorizontal: 20,
  },
  space: {
    marginBottom: hp(2.6),
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary50
  }
});

export default styles;
