// ErrorSuccessModal Component
import React, {useCallback, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';

// Component
import Primarybutton from '../primarybutton';

// Constant
import color from '../../constant/color';

// Images
import Images from '../../assets/index';

// Style
import styles from './styles';

const ErrorSuccessModal = ({
  animationOut = 'fadeOut',
  avoidKeyboard = true,
  buttonLabel = null,
  errorSuccessMessage = null,
  isVisible = false,
  onBackPress = () => {},
  onButtonPress = () => {},
  onClose = () => {},
  type = 'success',
  useNativeDriverForBackdrop = true,
}) => {
  const [btLabel, setBtLabel] = useState(null);
  const [messageText, setMessageText] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadPropsBasedOnType();
    }, [type]),
  );

  const loadPropsBasedOnType = () => {
    switch (type) {
      case 'error':
        setBtLabel(buttonLabel ? buttonLabel : 'Try Again');
        setMessageText(
          errorSuccessMessage
            ? errorSuccessMessage
            : 'Sorry! Unable to record the data!',
        );
        break;

      case 'success':
      default:
        setBtLabel(buttonLabel ? buttonLabel : 'Go Back');
        setMessageText(
          errorSuccessMessage
            ? errorSuccessMessage
            : 'The data has been recorded successfully!',
        );
        break;
    }
  };

  const renderImages = () => {
    switch (type) {
      case 'error':
        return <Images.Error marginTop={21} />;

      case 'success':
      default:
        return <Images.Success width={167} height={144} marginTop={21} />;
    }
  };

  return (
    <Modal
      style={styles.modalstyle}
      onBackdropPress={onBackPress}
      onBackButtonPress={onBackPress}
      useNativeDriverForBackdrop={useNativeDriverForBackdrop}
      isVisible={isVisible}
      avoidKeyboard={avoidKeyboard}
      animationInTiming={30}
      animationOutTiming={1}
      animationOut={animationOut}>
      <View style={styles.errorSuccessModalContainer}>
        <Pressable
          style={styles.errorSuccessModalCloseIconContainer}
          onPress={onClose}>
          <Images.Cancel width={10} height={10} fill={color.black100} />
        </Pressable>
        {renderImages()}
        <Text style={styles.errorSuccessModalMessageText}>{messageText}</Text>
        <Primarybutton label={btLabel} onPress={onButtonPress} />
      </View>
    </Modal>
  );
};

export default ErrorSuccessModal;
