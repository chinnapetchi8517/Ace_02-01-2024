// Card Component
import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    // backgroundColor: color.secondary200,
  },
  cardContent: {
    paddingVertical: 21,
    paddingHorizontal: 18,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardTitle: {
    fontFamily: _const.blissMedium,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 23,
    flexGrow: 1,
  },
  cardBody: {
    flexDirection: 'row'
  },
  leftContainer: {
    width: '35%',
    // borderWidth: 1,
    marginTop: 20,
    flexDirection: 'column'
  },
  descriptionConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  descriptionText: {
    fontFamily: _const.blissMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: color.error500,
    marginLeft: 5
  },
  descriptionTextIncrement: {
    color: color.success600
  },
  rightContainer: {
    width: '55%',
    // borderWidth: 1,
    marginLeft: 47,
    marginTop: 20
  },
  value: {
    fontFamily: _const.blissBold,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    color: color.neutral900,
  }
});

export default styles;
