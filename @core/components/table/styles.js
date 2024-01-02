// Table Styles
import {Dimensions, StyleSheet} from 'react-native';

// Constant
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  contentContainerI: {
    backgroundColor: color.white,
    height: 57.5,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: Dimensions.get('window').width * 0.33,
  },
  contentContainerII: {
    backgroundColor: color.white,
    borderColor: color.neutral200,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: Dimensions.get('window').width * 0.33,
  },
  contentLabelContainer: {alignItems: 'flex-start', justifyContent: 'center'},
  contentLabelText: {
    color: color.primary800,
    fontFamily: _const.blissRegular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  contentPrimaryContainer: {
    borderColor: color.neutral200,
    flexDirection: 'row',
  },
  contentValueArrowIconContainer: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentValueChangeHighText: {
    color: color.success600,
    fontFamily: _const.blissRegular,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  contentValueChangeLowText: {
    color: color.error500,
    fontFamily: _const.blissRegular,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  contentValueContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentValueText: {
    color: color.neutral700,
    fontFamily: _const.blissRegular,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  headerContainerI: {
    backgroundColor: color.neutral100,
    borderColor: color.neutral200,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: Dimensions.get('window').width * 0.33,
  },
  headerContainerII: {
    backgroundColor: color.neutral100,
    borderColor: color.neutral200,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: Dimensions.get('window').width * 0.33,
  },
  headerLabelContainer: {flexDirection: 'row', alignItems: 'center'},
  headerLabelText: {
    color: color.primary800,
    fontFamily: _const.blissRegular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  headerLabelVectorIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  marginTop4: {marginTop: 4},
  progressBarContainer: {marginTop: 4},
  tableContainer: {
    backgroundColor: color.white,
    borderColor: color.neutral300,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 1,
  },
  toolTipArrrow: {height: 6, width: 6},
  toolTipContentStyle: {
    backgroundColor: color.neutral900,
    borderRadius: 4,
    width: 117,
  },
  toolTipTextI: {
    color: color.neutral400,
    fontFamily: _const.blissRegular,
    fontSize: 10,
    fontWeight: '400',
    marginTop: 2,
  },
  toolTipTextII: {
    color: color.white,
    fontFamily: _const.blissBold,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  titleText: {
    color: color.primary900,
    fontFamily: _const.blissRegular,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
  },
  templateContainer: {
    width: '100%',
    borderRadius: 8,
    paddingTop: 18,
  },
  search: {
    marginVertical: 24,
  },
  input: {
    color: color.neutral400,
    fontFamily: _const.blissRegular,
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 4,
  },
  noResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  noResultDescription: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: _const.blissRegular,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default styles;
