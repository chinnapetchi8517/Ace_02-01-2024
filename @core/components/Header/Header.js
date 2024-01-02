// Header Component
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Constant
import color from '../../constant/color';
import _const from '../../constant/const';
// Images
import Images from '../../assets';
// Style
import styles from './HeaderStyle';
import ModalComponent from '../Model/ModalComponent';
import ProfileMenu from '../ProfileMenu';

const Header = props => {
  const {
    animatedValue,
    businessUnit,
    data,
    handleClickBusinessUnit,
    isNewNotifi = false,
    selectedBusinessUnit,
    navigation
  } = props;

  // Ref Variables
  const translation = useRef(new Animated.Value(0)).current;

  // Other Variables
  const firstLetter = data && data?.name?.charAt(0);
  const headerInitialHeight = 120;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    animatedValue.addListener(({value}) => {
      value > headerInitialHeight
        ? Animated.timing(translation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start()
        : translation.setValue(0);
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  });

  const updateModalStatus = (status = false) => {
    setIsModalVisible(status);
  };

  const AnimatedHeader = ({animatedValue}) => {
    const headerHeight = animatedValue.interpolate({
      inputRange: [0, headerInitialHeight + 33],
      outputRange: [headerInitialHeight + 33, 64],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.bgSecondary200,
          {
            height: headerHeight,
          },
        ]}>
        <View style={styles.headerview}>
          <Pressable onPress={() => updateModalStatus(true)}>
            <Images.ProfileIcon
              width={36}
              height={36}
              fill={color.neutral800}
            />
          </Pressable>
          <ModalComponent
            isVisible={isModalVisible}
            updateModalStatus={updateModalStatus}
          >
            <ProfileMenu navigation={navigation} updateModalStatus={updateModalStatus}/>
          </ModalComponent>
          <Animated.View
            style={[
              styles.bgSecondary200,
              {
                opacity: translation,
              },
            ]}>
            <Text style={styles.headerTitle}>Retail Banking Group</Text>
          </Animated.View>
          <Pressable disabled={true}>
            {isNewNotifi && (
              <View style={styles.dotView}>
                <Images.RedSpot marginTop={4} marginLeft={15} />
              </View>
            )}
            <Images.Notifi width={24} height={24} fill={color.neutral400} />
          </Pressable>
        </View>
        <Text style={styles.heading}>Retail Banking Group</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <AnimatedHeader animatedValue={animatedValue} />
      <ScrollView
        style={styles.listWrapper}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <View style={styles.listContent}>
          {businessUnit?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleClickBusinessUnit(index,item)}
                key={index}>
                <View
                  style={[
                    styles.alignItemsCenter,
                    {
                      marginHorizontal: index != 0 ? 20 : 16,
                    },
                  ]}>
                  <Text
                    style={[
                      selectedBusinessUnit === index
                        ? styles.selectedTitle
                        : styles.title,
                    ]}>
                    {item}
                  </Text>
                </View>
                <View
                  style={[
                    styles.listTitleInfo,
                    selectedBusinessUnit === index && styles.selectedtitleInfo,
                    {
                      marginHorizontal: index != 0 ? 19 : 14,
                    },
                  ]}></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Header;
