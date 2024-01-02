import React,{useEffect}  from 'react';
import styles from './styles';
import {View, Text, Pressable, BackHandler} from 'react-native';
import Images from '../../assets';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import _const from '../../constant/const';

const NoNetworkScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackButton = () => {
      if (shouldPreventBack()) {
        return true; 
      }
      return false; 
    };
    BackHandler.addEventListener(_const.hardwareBackPressKey, handleBackButton);

    return () => {
      BackHandler.removeEventListener(_const.hardwareBackPressKey, handleBackButton);
    };
  }, []); 
  const shouldPreventBack = () => {
    return true; 
  };

  const onClickTryAgain = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      const noNetworkParms = { result: _const.noNetwork };
      navigation.goBack(noNetworkParms);
    }
  };

  return (
    <View style={styles.container}>
      <Images.NoNetwork></Images.NoNetwork>
      <Text style={styles.label}>Check your connection and try again</Text>
      <Pressable
        onPress={() => onClickTryAgain()}>
        <View style={styles.tryAgainConatainer}>
          <Images.Refresh></Images.Refresh>
          <Text style={styles.tryAgain}>Try Again</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default NoNetworkScreen;
