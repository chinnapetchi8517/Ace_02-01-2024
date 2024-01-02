import {StyleSheet} from 'react-native';
import color from '../../constant/color';
import _const from '../../constant/const';

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 50,
    width: '90%',
    color: color.primaryColor,
    backgroundColor: '#fff',
    borderRadius: appBorderRadius,
    fontSize: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: color.gray,
    padding: 10,
  },
});

export default styles;
