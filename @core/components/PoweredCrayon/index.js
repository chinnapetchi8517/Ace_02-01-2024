import * as React from 'react';
import styles from './styles';
import { View, Text} from 'react-native';
import Images from '../../assets';
const CrayonLogo = ()=> {
    return (
        <View style={styles.container}>
          <Text styles={styles.label}>Powered by</Text>
          <Images.CrayonLogo />
        </View>
      );
}
export default CrayonLogo;