import {View, StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  roundIcon: {
    borderRadius: 2.5,
    borderStyle: 'dashed',
    borderWidth: 5,
    borderColor: 'red',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  xAxisStyle:{
    tickLabels: {
      fontSize: 11,
      fontFamily: _const.blissMedium,
      fill: color.neutral500,
    },
    axis: {stroke: color.neutral400},
  },
  yAxisStyle:{
    axis: {stroke: 'transparent'},
    tickLabels: {
      fontSize: 11,
      fontFamily: _const.blissMedium,
      fill: color.neutral500,
    },
    grid: {stroke: 'black', strokeOpacity: '0.2', strokeDasharray: 3},
  } 
});

export default styles;
