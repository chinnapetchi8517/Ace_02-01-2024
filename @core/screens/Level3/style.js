import {StyleSheet} from 'react-native';
import color from '../../constant/color';
const styles = StyleSheet.create({
  viewWrapper:{
    marginBottom : 16,
    paddingBottom: 100,
    height: '100%',
  },
  wrapper: {
    marginVertical: 16,
    height: '100%',
    backgroundColor: color.secondary50
  },
  safeAreaWrapper: {
    backgroundColor: color.secondary50
  },
  container:{
    paddingHorizontal: 16,
  },
  filterContainer: {
    backgroundColor: color.primary500,
    borderRadius: 60 / 2,
    bottom: 60,
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
});
export default styles;

