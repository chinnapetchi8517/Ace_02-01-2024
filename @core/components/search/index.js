import {View, TextInput} from 'react-native';
import styles from './styles';
import Images from '../../assets';
import color from '../../constant/color';
export default Search = ({
  value,
  setValue,
  placeholder,
  containerStyles,
  inputstyle,
}) => {
  return (
    <View style={[styles.wrapper, {...containerStyles}]}>
      <Images.SearchIcon
        width={20}
        height={20}
        fill={color.neutral500}
        marginRight={8}
      />
      <TextInput
        style={[styles.textInput, {...inputstyle}]}
        placeholder={placeholder}
        placeholderTextColor={color.neutral300}
        value={value}
        onChangeText={text => setValue(text)}
      />
      {value != '' ? (
        <Images.Cancel
          width={18}
          height={18}
          fill={color.neutral500}
          left={24}
          onPress={() => setValue('')}
        />
      ) : null}
    </View>
  );
};
