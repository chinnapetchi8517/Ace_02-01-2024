import {StyleSheet} from 'react-native';
import color from '../../../constant/color';
import _const from '../../../constant/const';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 32,
  },
  label: {
    height: 51,
    width: '100%',
    color: color.neutral700,
    fontFamily: _const.blissRegular,
    fontSize: 16,
    fontWeight: '400',
  },
  input: {
    backgroundColor: color.white,
    height: 51,
    borderRadius: 8,
    color: color.neutral900,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: color.gray,
    padding: 16,
    fontFamily: _const.blissRegular,
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 8, 
  },
  errorLabel: {
    color: color.error500,
    fontFamily: _const.blissRegular,
    fontSize: 16,
    fontWeight: '400',    
  },
  errorContainer: {
    flexDirection: "row",
    gap: 8
  }
});

export default styles;
