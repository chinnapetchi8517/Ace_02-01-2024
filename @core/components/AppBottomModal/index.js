import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {appActiveOpacity} from '../../constant';
import Modal from 'react-native-modal';
import Images from '../../assets';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = (width, height) => (width < height ? 350 : 500);
const guidelineBaseHeight = (width, height) => (width < height ? 680 : 350);
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const scale = size => {
  const {width, height} = Dimensions.get('window');
  return (width / guidelineBaseWidth(width, height)) * size;
};
// vericalscale - for vertical..
const verticalScale = size => {
  const {width, height} = Dimensions.get('window');
  return (height / guidelineBaseHeight(width, height)) * size;
};

export const BottomModal = ({
  onDrop,
  visible,
  children,
  FooterBtntxt1,
  FooterBtntxt2,
  onFooterBtntxt1,
  onFooterBtntxt2,
  viewStyle,
  title,
}) => {
  return (
    <Modal
      style={styles.modalstyle}
      isVisible={visible}
      hasBackdrop={true}
      onBackdropPress={onDrop}
      onBackButtonPress={onDrop}
      backdropColor={'transparent'}
      statusBarTranslucent
      useNativeDriverForBackdrop={true}
      backdropOpacity={0.4}
      //animationIn={'fadeIn'}
      avoidKeyboard={true}
      animationInTiming={30}
      animationOutTiming={1}
      animationOut={'fadeOut'}>
      <View style={styles.modalviewstyle}>
        <View
          style={{
            ...styles.containerView,
            ...viewStyle,
            flex: 0,
            maxHeight: '85%',
          }}>
          <View style={styles.grayLine} />
          <View style={styles.childrenView}>
            <TouchableOpacity onPress={onDrop} style={styles.closebtn}>
              <Images.Close></Images.Close>
            </TouchableOpacity>
            <Text style={styles.feed}>{title}</Text>
            {children}
            {(FooterBtntxt1 || FooterBtntxt2) && (
              <View style={styles.confirmView}>
                {FooterBtntxt1 && (
                  <TouchableOpacity
                    activeOpacity={appActiveOpacity}
                    onPress={onFooterBtntxt1}
                    style={styles.signInBtn}>
                    <Text style={[styles.btnTxt]}>{FooterBtntxt1}</Text>
                  </TouchableOpacity>
                )}
                {FooterBtntxt2 && (
                  <TouchableOpacity
                    activeOpacity={appActiveOpacity}
                    onPress={onFooterBtntxt2}
                    style={styles.signInBtn}>
                    <Text style={[styles.btnTxt]}>{FooterBtntxt2}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
