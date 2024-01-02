import {StyleSheet, StatusBar} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  headerTitle: {
    color: color.neutral900,
    fontSize: 18,
    fontFamily: _const.blissMedium,
    fontWeight: '500',
  },
  titleContainer: {flexDirection: 'row', alignItems: 'center'},
  backContainer: {
    width: 32,
    height: 32,
    backgroundColor: color.white00,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    height: 66,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: color.secondary200,
    // marginTop: 20,
  },
  container: {
    //height: '100%',
    backgroundColor: color.secondary50,
    alignItems: 'center',
    // paddingBottom: 60
  },
});

export default styles;
