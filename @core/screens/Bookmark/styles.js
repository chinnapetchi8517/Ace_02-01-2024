import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: color.secondary100,
  },
  titleViewstyle: {
    backgroundColor: color.secondary200,
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: _const.blissBold,
    color: color.neutral900,
    fontWeight: '700',
  },
  cardText: {
    fontSize: 20,
    fontFamily: _const.blissMedium,
    lineHeight: 26,
    color: color.neutral900,
  },
  cardsubtext: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: _const.blissRegular,
    color: color.neutral500,
    lineHeight: 21,
  },
  separatorstyle: {
    marginTop: 16,
  },
  search: {
    marginVertical: 24,
  },
  input: {
    fontFamily: _const.blissRegular,
    fontSize: 16,
  },
  itemViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.secondary200,
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderRadius: 14,
  },
  noResultFound: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginLeft: 20
  },
  noResultDescription: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: _const.blissMedium,
    lineHeight: 27,
    marginTop: 24,
    textAlign: 'center'
  },
  loaderContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary50
  },
  titleContainer: {
    width: '90%'
  }
});

export default styles;
