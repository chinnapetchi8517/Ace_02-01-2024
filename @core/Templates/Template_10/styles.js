import {StyleSheet} from 'react-native';
import _const from '../../constant/const';
import color from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: 8,
    // backgroundColor: color.white,
    // borderColor: color.neutral300,
    // borderWidth: 0.5,
    width: '100%',
    paddingTop: 18,
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: _const.blissMedium,
    fontWeight: '700',
    lineHeight: 27,
    color: color.primary600,
    textAlign: 'left',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderStyle: 'solid',
    borderColor: color.neutral500,
    borderTopWidth: 1,
    flex: 1,
    width: '100%',
    height: 1,
    paddingBottom: 24,
  },
  body: {
    gap: 16,
    paddingBottom: 16,
  },
});

export default styles;
