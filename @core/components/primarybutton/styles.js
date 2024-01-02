import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height:48,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.highlight500,
  },
  label: {
    fontFamily: _const.blissRegular,
    fontSize: 18,
    fontWeight: '700',
    color:color.white00
  },
  disabled:{
    backgroundColor:color.neutral400,
    color:color.white00
  }
});

export default styles;
