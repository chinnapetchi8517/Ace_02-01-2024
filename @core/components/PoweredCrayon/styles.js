import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 20,
  },
  label: {
    fontFamily: _const.blissRegular,
    color: color.neutral600,
    fontSize: 16,
    fontWeight: '400',
    
  },
});

export default styles;