import {View, Text, ActivityIndicator, Alert} from 'react-native';
import Images from '../../assets/index';
import React, {useState} from 'react';
import _get from 'lodash/get';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CrayonIconButton from '../../components/buttons/iconButton';
import CrayonLogo from '../../components/PoweredCrayon';
import {useNavigation} from '@react-navigation/native';
import _const from '../../constant/const';
import {authorize} from 'react-native-app-auth';
import {MMKV} from 'react-native-mmkv';
import color from '../../constant/color';
import NetInfo from '@react-native-community/netinfo';
import graphQLApi from '../../service/graphQLApi';
import {GetUser, InsertUser} from '../../query/users';

// Query
import {GET_AUTH_VALIDATOR} from '../../query/login';
import {GET_MONTH} from '../../query/home';

const Login = ({}) => {
  const storage = new MMKV();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    issuer: _const.issuer,
    clientId: _const.iosApplicationId,
    redirectUrl: _const.iosRedirectUrl,
    scopes: _const.scope,
    iosPrefersEphemeralSession: true,
    additionalParameters: {prompt: 'login'},
  };

  const onClickMicrosoft = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      try {
        setIsLoading(true);
        await authorize(config).then(function (response) {
          storage.set(_const.refreshToken, response.refreshToken);
          storage.set(_const.authToken, JSON.stringify(response));
          graphQLApi(GET_AUTH_VALIDATOR)
            .then(async ({data}) => {
              const profileData = _get(
                data,
                'data.verifyDevice.profileData.data',
                {},
              );
              const userData = _get(data, 'data.verifyDevice.userData', {});
              const decodedToken = _get(
                data,
                'data.verifyDevice.decodedToken',
                {},
              );
              if (decodedToken.code == '' && decodedToken.status) {
                if (userData.code == '' && userData.status) {
                  storage.set(_const.userInfo, JSON.stringify(profileData));
                  await checkUser(profileData?.id);
                } else {
                  setIsLoading(false);
                  Alert.alert(
                    'Looks like you are logged in on 2 devices already!',
                  );
                }
              } else {
                setIsLoading(false);
                Alert.alert('User not found!');
              }
            })
            .catch(err => {});
        });
      } catch (e) {
        setIsLoading(false);
      }
    } else {
      navigation.navigate(_const.noNetwork);
    }
  };

  const checkUser = async userId => {
    let variables = {
      user_id: userId,
    };
    await graphQLApi(GetUser, variables, navigation)
      .then(async res => {
        let userResult = res?.data?.data?.User;
        if (userResult.length === 0) {
          await insertUser(variables);
        } else {
          storage.set(_const.kpiCache, userResult[0].kpi);
          storage.set(_const.bookmarkCache, userResult[0].bookmark);
          storage.set(_const.searchHistoryCache, userResult[0].recent_search);
          navigation.replace(_const.bottomTab);
        }
        getMonths();
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  const getMonths = () => {
    graphQLApi(GET_MONTH)
      .then(res => {
        let monthData = res?.data?.data?.Month?.[0]?.month;
        let monthArray = storage.getString(_const.month);
        if (monthArray && JSON.stringify(monthData) !== monthArray) {
          storage.set(_const.month, JSON.stringify(monthData));
        } else {
          storage.set(_const.month, JSON.stringify(monthData));
        }
      })
      .catch(err => {});
  };

  const insertUser = async variables => {
    await graphQLApi(InsertUser, variables, navigation)
      .then(res => {
        let userResult = res?.data?.data?.InsertUser?.returning?.[0];
        storage.set(_const.kpiCache, userResult.kpi);
        storage.set(_const.bookmarkCache, userResult.bookmark);
        storage.set(_const.searchHistoryCache, userResult.recent_search);
        navigation.replace(_const.bottomTab, {
          navigatedFrom: _const.login,
        });
      })
      .catch(err => {
        setIsLoading(true);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={color.primary500} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{paddingBottom: 50}}>
            <Images.Logo width={212} height={233} />
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.title}>{'Login with your ADIB account'}</Text>
            <CrayonIconButton
              label={'Sign in with Microsoft'}
              onPress={() => {
                onClickMicrosoft();
              }}
            />
            <CrayonLogo></CrayonLogo>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;
