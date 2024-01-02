import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: color.secondary50,
  },
  profileheaderstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  title: {
    fontSize: 20,
    fontFamily: _const.blissBold,
    color: color.textblack,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: _const.blissRegular,

    color: color.textgrey,
    marginTop: 5,
  },
  margin: {
    marginHorizontal: 20,
  },
  linestyle: {
    borderBottomColor: color.neutral300,
    borderBottomWidth: 1,
  },
  titlestyle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: _const.blissMedium,
    color: color.neutral400,
    marginTop: 28,
    marginBottom: 14,
    marginHorizontal: 20,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 48,
  },
  rowtextstyle: {
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    fontSize: 18,
    color: color.textblack,
    marginHorizontal: 20,
  },
  marginVertical: {
    marginTop: 24,
  },
  rateexp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  exptex: {
    marginHorizontal: 20,
    fontSize: 18,
    marginVertical: 10,
    color: color.textblack,
    fontFamily: _const.blissRegular,
  },
  report: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  lastUpdatedContainer: {
    marginTop:60,
    left: 15,
  },
  lastUpdateText: {
    fontSize: 16,
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    lineHeight: 20,
    color: color.neutral500,
  },
  disabled: {
    color: color.neutral400
  }
});

export default styles;
