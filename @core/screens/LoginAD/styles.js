import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  safeArea:{
    backgroundColor: color.secondary100,
  },
  container: {
    backgroundColor: color.secondary100,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  footerContainer: {
    width: '100%',
     bottom: 21,
     position: 'absolute',
     rowGap: 20,
  },
  title: {
    marginTop: 30,
    color: color.neutral500,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: _const.blissRegular,
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 60,
  },
  orStyle: {
    color: color.neutral500,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: _const.blissRegular,
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    marginTop: 36,
  },
  microsoftButton: {
    marginTop:20,
    width: '100%'
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary50
  },
});

export default styles;
