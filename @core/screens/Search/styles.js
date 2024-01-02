import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: color.secondary100,
  },

  search: {
    marginTop: 24,
  },
  input: {
    fontFamily: _const.blissRegular,
    fontSize: 16,
  },
  recentText: {
    fontSize: 16,
    fontFamily: _const.blissMedium,
    color: color.neutral600,
    marginHorizontal: 12,
  },
  viewStyle: {
    flexDirection: 'row',
    // marginTop: 33,
  },
  notext: {
    fontSize: 18,
    fontFamily: _const.blissMedium,
    color: color.neutral400,
    lineHeight: 27,
    marginTop: 8,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 93,
  },
  clear: {
    fontSize: 16,
    fontFamily: _const.blissBold,
    color: color.primaryColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 33,
  },
  centerView2: {
    alignItems: 'center',
    marginTop: 246,
  },
  metrics: {
    paddingHorizontal: 8,
    borderRadius: 50,
    height: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.neutral700,
  },
  selectedmetrics: {
    backgroundColor: color.primary500,
    borderColor: color.primary500,
  },
  itemtext: {
    fontSize: 16,
    fontFamily: _const.blissRegular,
    marginHorizontal: 6,
    color: color.neutral700,
    textTransform: 'capitalize'
  },
  rowstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrap: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
  },
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    gap: 16,
  },
  searchReslutContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.neutral200,
    flexWrap: 'wrap',
  },
  lastChild: {
    borderBottomWidth: 0,
  },
  itemViewStyle: {
    marginTop: 16,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27,
    color: color.neutral900,
    fontFamily: _const.blissRegular,
  },
  noResultFound: {
    width: '100%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginLeft: 20,
  },
  noResultDescription: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: _const.blissMedium,
    lineHeight: 27,
    marginTop: 24,
    textAlign: 'center',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary50
  }
});

export default styles;
