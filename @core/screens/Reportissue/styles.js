import {Dimensions, StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: color.secondary50,
  },
  content: {
    marginHorizontal: 18,
  },
  headerstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  backButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary200,
  },
  title: {
    fontFamily: _const.blissBold,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31.2,
    marginTop: 28,
    color: color.neutral900,
  },
  subtitle: {
    fontFamily: _const.blissRegular,
    fontSize: 18,
    fontWeight: '400',
    marginTop: 8,
    color: color.neutral900,
    lineHeight: 27,
  },
  commentView: {
    marginTop: 32,
  },
  commentText: {
    fontFamily: _const.blissMedium,
    fontSize: 18,
    fontWeight: '500',
    color: color.neutral700,
    lineHeight: 23.4,
  },
  textAreaContainer: {
    marginTop: 8,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: color.white00,
    borderColor: color.neutral300,
    height: 150,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: _const.blissLight,
    fontWeight: '200',
    lineHeight: 24,
    color: color.black100
  },
  textInputFocus: {
    borderWidth: 1,
    borderColor: color.primary500,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 16,
    backgroundColor: color.secondary100,
    paddingHorizontal: 16,
  },
  scrollViewContainerStyle: {
    paddingBottom: 100,
  },
  errortext: {
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: color.red,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 12,
    alignSelf: 'stretch',
  },
});

export default styles;
