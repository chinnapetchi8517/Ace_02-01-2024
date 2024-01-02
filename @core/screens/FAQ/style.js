// FAQ Screen
import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.secondary50,
  },
  faqheaderstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: 18
  },
  title: {
    fontFamily: _const.blissBold,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginTop: 28,
    color: color.neutral900,
    marginHorizontal: 18
  },
  subtitle: {
    fontFamily: _const.blissRegular,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 8,
    color: color.neutral900,
    paddingBottom: 26,
    marginHorizontal: 18
  },
  faqContentStyle: {
    marginTop: 24,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary200,
  },
  accordionheaderStyle: {
    borderColor: color.neutral300,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color.white00,
  },
  accordianActive: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomLeftRadius: 0,
    borderBottomWidth: 0,
    borderBottomRightRadius: 0,
    borderColor: color.secondary500,
    backgroundColor: color.secondary200,
  },
  headerText: {
    fontFamily: _const.blissBold,
    fontSize: 18,
    backgroundColor: color.white00,
    fontWeight: '700',
    lineHeight: 27,
    color: color.neutral700,
    width: '85%',
  },
  headerTextActive: {
    backgroundColor: color.secondary200,
  },
  downiconstyle: {
    marginHorizontal: 10,
    marginTop: 8,
  },
  accordioncontentStyle: {
    fontFamily: _const.blissRegular,
    fontSize: 18,
    backgroundColor: color.white00,
    fontWeight: '400',
    lineHeight: 25,
    color: color.neutral600,
    paddingBottom: 8,
    marginTop: -16,
  },
  accordioncontentActive: {
    backgroundColor: color.secondary200,
  },
  accordionContentheaderStyle: {
    borderColor: color.neutral300,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color.white00,
    borderTopLeftRadius: 8,
    borderTopWidth: 1,
    borderTopRightRadius: 8,
  },
  accordionContentActive: {
    borderColor: color.secondary500,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color.secondary200,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    borderTopRightRadius: 0,
  },
  scrollViewContainerStyle: {
    paddingBottom: 30,
    marginHorizontal: 18
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
