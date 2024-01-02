import {StyleSheet} from 'react-native';

import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 23.11,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  snackbar: {
    backgroundColor: color.neutral800,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontFamily: _const.blissRegular,
    lineHeight: 24,
    width: '85%',
  },
  undoButton: {
    color: color.secondary500,
    fontSize: 16,
    fontFamily: _const.blissRegular,
    lineHeight: 24,
  },
});
export default styles;
