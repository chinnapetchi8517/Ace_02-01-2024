import {StyleSheet} from 'react-native';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  legendWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent:'space-evenly',
    paddingBottom:14
  },
  legendContainer: {
    flexDirection: 'row',
    width:'100%',
    flexWrap:'wrap',
    justifyContent:'space-evenly'
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legend_label: {
    fontSize: 12,
    fontFamily: _const.blissRegular,
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default styles;
