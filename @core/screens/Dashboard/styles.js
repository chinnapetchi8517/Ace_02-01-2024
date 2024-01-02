import {StyleSheet} from 'react-native';

// Constant
import color from '../../constant/color';

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: color.primary500,
    borderRadius: 60 / 2,
    bottom: 120,
    padding: 12,
    position: 'absolute',
    right: 20,
    shadowColor: color.blackRussian,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
  },
  flatlistInner: {
    width: '100%',
    marginTop: 31,
    paddingBottom: 60,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: color.secondary50
  },
  flatlistOuter: {
    marginTop: 26,
    paddingHorizontal: 16,
    marginBottom:116
  },
});

export default styles;
