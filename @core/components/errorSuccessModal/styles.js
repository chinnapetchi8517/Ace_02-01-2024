import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  errorSuccessModalCloseIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: color.neutral100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 24,
    right: 2,
  },
  errorSuccessModalContainer: {
    height: 397,
    backgroundColor: color.white00,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  errorSuccessModalMessageText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    lineHeight: 27,
    textAlign: 'center',
    marginBottom: 50,
    marginHorizontal: 50,
    color: color.neutral700,
  },
  modalstyle: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
});

export default styles;
