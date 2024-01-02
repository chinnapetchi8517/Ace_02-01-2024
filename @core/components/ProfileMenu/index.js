import React, {useMemo, useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import {MMKV} from 'react-native-mmkv';

import Images from '../../assets';
import color from '../../constant/color';
import _const from '../../constant/const';
import styles from './styles';
import {appActiveOpacity} from '../../constant';
import {getCurrentDateFormat, logOut} from '../../utils/helper';
import {BottomModal} from '../AppBottomModal';

export default function ProfileMenu({navigation, updateModalStatus}) {
  const storage = new MMKV();
  const userInfo = JSON.parse(storage.getString(_const.userInfo));
  const lastUpdatedDate = useMemo(() => getCurrentDateFormat(), []);
  const [enableNotificationModal, setEnableNotificationModal] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);

  const {
    Outlineactivity,
    Outlinebell,
    Outlinefaq,
    Outlinefeedback,
    Outlinereport,
    Outlineprivacy,
    Outlineterms,
    Signout,
    CrayonLogo,
    Switch_off,
    Switch_on,
    ProfileIcon,
  } = Images;

  const profileMenuOptions = [
    {
      Icon: Outlineactivity,
      title: 'Personalise KPIs and Metrics',
      toRoute: _const.personalizeKpi,
      navigatedFrom: 'Profile',
    },
    {
      Icon: Outlinebell,
      title: 'Notification Settings',
    },
    {
      Icon: Outlinefaq,
      title: 'FAQs',
      toRoute: _const.faq,
    },
    {
      Icon: Outlinefeedback,
      title: 'Give us Feedback',
      toRoute: _const.feedback,
    },
    {
      Icon: Outlinereport,
      title: 'Report an issue',
      toRoute: _const.reportissue,
    },
    {
      Icon: Outlineprivacy,
      title: 'Privacy',
      toRoute: _const.privacy,
    },
    {
      Icon: Outlineterms,
      title: 'Terms & Conditions',
      toRoute: _const.termscondition,
    },
  ];

  const onPressItem = (toRoute = '', navigatedFrom = '') => {
    if (toRoute && toRoute !== 'personalizeKpi') {
      closeModal(); // Closing the modal before navigating to another screen.
      if (navigatedFrom) {
        navigation.navigate(toRoute, {
          navigatedFrom: navigatedFrom,
        });
      } else {
        navigation.navigate(toRoute);
      }
    } else {
      // Handling here for notification modal.
      // setEnableNotificationModal(true);
    }
  };

  const closeModal = () => {
    updateModalStatus(false);
  };

  const onPressSignOut = () => {
    updateModalStatus(false);
    logOut(true);
  };

  return (
    <View style={styles.container}>
      <Pressable style={[styles.contentontainer, styles.pt25]}>
        <View style={[styles.flexRowAlignCenter, styles.mt30, styles.ph20]}>
          <ProfileIcon height={40} width={40} fill={color.neutral800} />
          <View style={[styles.ph15]}>
            <Text style={styles.textTitle}>{userInfo.displayName}</Text>
            <Text style={styles.textDesc}>{userInfo.jobTitle}</Text>
          </View>
        </View>
        <View style={styles.borderLine} />
        <View style={[styles.flexColCenter, styles.ph20]}>
          {profileMenuOptions.map((item, index) => {
            const {title, Icon, toRoute, navigatedFrom} = item;
            return (
              <Pressable
                key={index}
                activeOpacity={appActiveOpacity}
                onPress={() => onPressItem(toRoute, navigatedFrom)}
                style={[
                  styles.justifyBetween,
                  styles.flexRowAlignCenter,
                  styles.mv10,
                ]}>
                <View style={[styles.flexRowAlignCenter]}>
                  <Icon fill={color.blue100} width={24} height={24} />
                  <Text
                    style={[
                      styles.optionText,
                      styles.ph10,
                      {
                        color:
                          title === 'Notification Settings' ||
                          title === 'Personalise KPIs and Metrics'
                            ? color.neutral400
                            : color.neutral900,
                      },
                    ]}>
                    {title}
                  </Text>
                </View>
              </Pressable>
            );
          })}
          <Pressable
            onPress={onPressSignOut}
            style={[styles.flexRowAlignCenter, styles.mt20]}>
            <Signout width={18} height={18} fill={color.red} />
            <Text style={[styles.dangerText, styles.ph10]}>Sign Out</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.flex1,
            styles.alignCenter,
            styles.justifyEnd,
            styles.mv20,
            styles.gap5,
          ]}>
          {/* have to update this as dynamically after initial deployment */}
          <Text style={[styles.buildVersionTxt]}>{`Version 1.0.2`}</Text>
          <View style={[styles.flexRowAlignCenter]}>
            <Text style={[styles.ph10, styles.logoTxt]}>Powered by</Text>
            <CrayonLogo />
          </View>
        </View>
        <View style={[styles.footerContainer]}>
          <Text
            style={
              styles.footerText
            }>{`Last Data Refresh on ${lastUpdatedDate}`}</Text>
        </View>
        <BottomModal
          onDrop={() => setEnableNotificationModal(!enableNotificationModal)}
          title={'Notification Settings'}
          visible={enableNotificationModal}>
          <View style={styles.ph15}>
            <Pressable
              activeOpacity={appActiveOpacity}
              onPress={() => {
                setPushNotifications(!pushNotifications);
              }}
              style={[styles.flexRowAlignCenter, styles.justifyBetween]}>
              <Text style={styles.notificationText}>
                Push Notification Alerts
              </Text>
              {pushNotifications ? <Switch_on /> : <Switch_off />}
            </Pressable>
            <View style={styles.borderLine} />
            <Pressable
              activeOpacity={appActiveOpacity}
              onPress={() => {
                setInAppNotifications(!inAppNotifications);
              }}
              style={[styles.flexRowAlignCenter, styles.justifyBetween]}>
              <Text style={styles.notificationText}>
                In-App Notification Alerts
              </Text>
              {inAppNotifications ? <Switch_on /> : <Switch_off />}
            </Pressable>
          </View>
        </BottomModal>
      </Pressable>
    </View>
  );
}
