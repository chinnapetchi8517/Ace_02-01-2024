import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: color.white00,
    borderWidth: 1,
    borderColor: color.neutral200,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  textInput: {
    fontFamily: _const.blissRegular,
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 16,
    color: color.neutral900,
    flex: 0.9,
  },
  disabled: {
    backgroundColor: color.neutral400,
    color: color.white00,
  },
  hide: {
    display: 'none',
  },
});

export default styles;
