import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  modalstyle: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
  modalContainer: {
    height: 620,
    backgroundColor: color.white00,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  modalCloseIconContainer: {
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    // paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: _const.blissBold,
    lineHeight: 31,
    color: color.primary600,
    marginRight: 20,
    textTransform: 'capitalize',
  },
});

export default styles;
