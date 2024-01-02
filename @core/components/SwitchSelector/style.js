import { StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  container : {
    borderColor: color.neutral200,
    borderWidth: 2,
    borderRadius: 8.93,
    width:126
  },
  textStyle: {
    fontSize: 14,
    fontFamily: _const.blissMedium,
    fontWeight: '500',
    lineHeight: 21,
    color: color.neutral500,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: _const.blissMedium,
    fontWeight: '700',
    lineHeight: 21,
    color: color.white,
  },
});

export default styles;
