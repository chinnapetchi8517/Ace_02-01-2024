import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  flex75: {
    flex: 0.75,
  },
  flex1: {
    flex: 1,
  },
  contentontainer: {
    flex: 1,
    backgroundColor: color.secondary50,
    width: '85%',
  },
  container: {
    height: '100%',
    backgroundColor: '#00000059',
    width: '100%',
  },
  textTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 26,
    color: color.neutral900,
  },
  flexColCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textDesc: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: color.neutral900,
  },
  notificationText: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 27,
    color: color.neutral900,
    fontFamily: _const.blissMedium
  },
  optionText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 27,
    color: color.neutral900
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: color.neutral300,
    margin: 15
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph15: {
    paddingHorizontal: 15,
  },
  p20: {
    padding: 20,
  },
  pv25: {
    paddingVertical: 25
  },
  pv10: {
    paddingVertical: 10
  },
  ph20: {
    paddingHorizontal: 20
  },
  pt25: {
    paddingTop: 25
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  alignCenter: {
    alignItems: 'center'
  },
  mv10: {
    marginVertical: 10,
  },
  mv20: {
    marginVertical: 20
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  gap5: {
    gap: 5
  },
  gap10: {
    gap: 10,
  },
  dangerText: {
    color: color.red,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27,
  },
  footerContainer: {
    backgroundColor: color.secondary200,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: '5%'
  },
  footerText: {
    color: color.neutral900,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21
  },
  buildVersionTxt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: color.neutral500
  },
  logoTxt: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: color.neutral600
  }
});

export default styles;
