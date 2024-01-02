// Profiel Screen
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Pressable,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
// Style
import styles from './styles';
import color from '../../constant/color';
import Images from '../../assets';
import {appActiveOpacity} from '../../constant';
import {CommonActions} from '@react-navigation/native';
import _const from '../../constant/const';
import {BottomModal} from '../../components/AppBottomModal';
import {MMKV} from 'react-native-mmkv';
import Icons from '../../assets/index';


const ProfileScreen = ({navigation, route}) => {
  const storage = new MMKV();
  const userInfo = JSON.parse(storage.getString(_const.userInfo));
  const [isNotification, setisNotification] = useState(false);
  const [pushenable, setpushenable] = useState(false);
  const [appnotification_enable, setappnotification_enable] = useState(false);
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    const currentDate = moment();
    const formattedDateString = currentDate.format('DD MMM YYYY, HH:mm [GST]');
    setLastUpdatedDate(formattedDateString);
  }, []);

  return (
    <SafeAreaView backgroundColor={color.white}>
      <StatusBar
        backgroundColor={color.secondary50}
        barStyle={'dark-content'}
      />
      <View style={styles.wrapper}>
        <View style={{...styles.profileheaderstyle, ...styles.margin}}>
          <Icons.ProfileIcon width={64} height={64} fill={color.neutral800} />
          <View style={styles.margin}>
            <Text style={styles.title}>{userInfo.displayName}</Text>
            <Text style={styles.subtitle}>{userInfo.jobTitle}</Text>
          </View>
        </View>
        <View style={{...styles.linestyle, ...styles.margin}}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <Text style={{...styles.titlestyle}}>General</Text>
              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  navigation.navigate(_const.personalizeKpi, {
                    navigatedFrom: 'Profile',
                  });
                }}
                style={styles.row}>
                <Images.Report fill={color.neutral900} width={24} height={24} />
                <Text style={styles.rowtextstyle}>
                  Personalise KPIs and Metrics
                </Text>
              </Pressable>
              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  setisNotification(false);
                }}
                style={{...styles.row, ...styles.marginVertical}}>
                <Images.Notifi fill={color.neutral400} width={24} height={24} />

                <Text style={[styles.rowtextstyle, styles.disabled]}>
                  Notification Settings
                </Text>
              </Pressable>
              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  navigation.navigate(_const.faq);
                }}
                style={{...styles.row, ...styles.marginVertical}}>
                <Images.Faq_profile
                  fill={color.neutral900}
                  width={24}
                  height={24}
                />
                <Text style={styles.rowtextstyle}>FAQs</Text>
              </Pressable>
            </View>
            <View>
              <Text style={{...styles.titlestyle}}>Feedback</Text>
              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  navigation.navigate(_const.feedback);
                }}
                style={styles.row}>
                <Images.Feedback
                  fill={color.neutral900}
                  width={24}
                  height={24}
                />
                <Text style={styles.rowtextstyle}>Give us Feedback</Text>
              </Pressable>
            </View>
            <View>
              <Text style={{...styles.titlestyle}}>Report</Text>
              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  navigation.navigate(_const.reportissue);
                }}
                style={styles.row}>
                <Images.Feedback
                  fill={color.neutral900}
                  width={24}
                  height={24}
                />
                <Text style={styles.rowtextstyle}>Report an issue</Text>
              </Pressable>
            </View>
            <View>
              <Text style={{...styles.titlestyle}}>legal</Text>

              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  navigation.navigate(_const.privacy);
                }}
                style={styles.row}>
                <Images.Privacy
                  fill={color.neutral900}
                  width={24}
                  height={24}
                />
                <Text style={styles.rowtextstyle}>Privacy</Text>
              </Pressable>
              <Pressable
                activeOpacity={appActiveOpacity}
                onPress={() => {
                  navigation.navigate(_const.termscondition);
                }}
                style={{...styles.row, ...styles.marginVertical}}>
                <Images.Terms fill={color.neutral900} width={24} height={24} />
                <Text
                  style={{
                    ...styles.rowtextstyle,
                  }}>
                  Terms & Conditions
                </Text>
              </Pressable>
            </View>
            <Pressable
              activeOpacity={appActiveOpacity}
              onPress={async () => {
                const response = await fetch(_const.logoutEndpoint, {
                  method: 'GET'
                });
                if (response.ok) {
                  storage.clearAll();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: _const.login}],
                    }),
                  );
                } else {
                }
              }}
              style={{...styles.signOut}}>
              <Images.Signout fill={color.error500} width={24} height={24} />
              <Text
                style={{...styles.rowtextstyle, ...{color: color.error500}}}>
                Sign Out
              </Text>
            </Pressable>
          </View>
          <View style={styles.lastUpdatedContainer}>
            <Text style={styles.lastUpdateText}>
              Last Data Refresh on {lastUpdatedDate}
            </Text>
          </View>
        </ScrollView>
        <BottomModal
          onDrop={() => setisNotification(!isNotification)}
          title={'Notification Settings'}
          visible={isNotification}>
          <View>
            <Pressable
              activeOpacity={appActiveOpacity}
              onPress={() => {
                setpushenable(!pushenable);
                // setIsfeedback1(false), setIsfeedback(true);
                //setisNotification(false);
              }}
              style={styles.rateexp}>
              <Text style={styles.exptex}>Push Notification Alerts</Text>
              {pushenable ? (
                <Images.Switch_on></Images.Switch_on>
              ) : (
                <Images.Switch_off></Images.Switch_off>
              )}
            </Pressable>
            <View style={{...styles.linestyle, ...styles.margin}}></View>

            <Pressable
              activeOpacity={appActiveOpacity}
              onPress={() => {
                setappnotification_enable(!appnotification_enable);
                //setIsfeedback1(true), setIsfeedback(false);
                //setisNotification(false);
              }}
              style={styles.rateexp}>
              <Text style={styles.exptex}>In-App Notification Alerts</Text>
              {appnotification_enable ? (
                <Images.Switch_on></Images.Switch_on>
              ) : (
                <Images.Switch_off></Images.Switch_off>
              )}
            </Pressable>
          </View>
        </BottomModal>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
