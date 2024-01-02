// Header Styles
import {StyleSheet} from 'react-native';

// Constants
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    flexGrow: 1,
  },
  avatarConatiner: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 5,
    borderColor: '#ebedee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '500',
    fontFamily: _const.blissRegular,
    color: color.neutral900,
    width: 197,
    marginHorizontal: 16,
    marginTop: 24,
    lineHeight: 36.4,
  },
  description: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: 5,
  },
  listContent: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: color.secondary200,
  },
  listTitleInfo: {
    width: 'auto',
  },
  selectedtitleInfo: {
    borderBottomColor: color.primary500,
    borderBottomWidth: 4,
    color: color.primary500,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: color.neutral800,
    fontFamily: _const.blissRegular,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: color.primary500,
    fontFamily: _const.blissBold,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: _const.blissRegular,
    color: color.neutral900,
    lineHeight: 20.8,
    textAlign: 'center',
  },
  headerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: color.secondary200,
  },
  dotView: {position: 'absolute', right: 0, bottom: 15},
  listWrapper: {
    backgroundColor: color.secondary200,
    paddingHorizontal: 4,
    paddingTop: 12,
  },
  bgSecondary200: {backgroundColor: color.secondary200},
  alignItemsCenter: {alignItems: 'center'},
});

export default styles;
