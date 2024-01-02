import {View, Text, ActivityIndicator} from 'react-native';
import Images from '../../assets/index';
import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CrayonIconButton from '../../components/buttons/iconButton';
import CrayonLogo from '../../components/PoweredCrayon';
import {useNavigation} from '@react-navigation/native';
import _const from '../../constant/const';
import {authorize} from 'react-native-app-auth';
import {MMKV} from 'react-native-mmkv';
import axios from 'axios';
import color from '../../constant/color';
import NetInfo from '@react-native-community/netinfo';
import graphQLApi from '../../service/graphQLApi';
import {GetUser, InsertUser} from '../../query/users';
import CrayonInputLabel from '../../components/inputs/inputLabel/inputLabel';
import Primarybutton from '../../components/primarybutton';

const LoginAD = ({}) => {
  const storage = new MMKV();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

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
          axios
            .create({
              baseURL: _const.userProfileEndpoint,
              headers: {
                Authorization: 'Bearer ' + response.accessToken,
              },
            })
            .get()
            .then(async function (userData) {
              storage.set(_const.userInfo, JSON.stringify(userData.data));
              await checkUser(userData.data.id);
            });
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
      })
      .catch(err => {
        setIsLoading(true);
      });
  };

  const insertUser = async variables => {
    await graphQLApi(InsertUser, variables, navigation)
      .then(res => {
        let userResult = res.data.data.insert_user.returning[0];
        storage.set(_const.kpiCache, userResult.kpi);
        storage.set(_const.bookmarkCache, userResult.bookmark);
        storage.set(_const.searchHistoryCache, userResult.recent_search);
        navigation.replace(_const.personalizeKpi, {
          navigatedFrom: _const.login,
        });
      })
      .catch(err => {
        setIsLoading(true);
      });
  };

  const onChangeEmail = value => {
    setEmail(value);
  };

  const onChangePassword = value => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (_const.emailRegex.test(email)) {
      setEmailErrorMessage('');
    } else {
      setEmailErrorMessage('Your email address is Invalid');
    }
    if (Password.length < 3) {
      setPasswordErrorMessage('Your Password is Incorrect');
    } else {
      setPasswordErrorMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={color.primary500} />
        </View>
      ) : (
        <View>
          <View style={styles.container}>
            <Images.Logo width={132} height={145} />
            <Text style={styles.title}>
              Please enter your credentials to access your account
            </Text>
            <CrayonInputLabel
              label={'Email Address'}
              placeholder={'Enter your email ID'}
              value={email}
              onChangeText={onChangeEmail}
              autoCapitalize={'none'}
              errorMessage={emailErrorMessage}
            />
            <CrayonInputLabel
              label={'Password'}
              placeholder={'Enter your Password'}
              secureTextEntry={true}
              value={Password}
              onChangeText={onChangePassword}
              autoCapitalize={'none'}
              errorMessage={passwordErrorMessage}
            />
            <Primarybutton
              label={'Log In'}
              onPress={handleLogin}></Primarybutton>
            <Text style={styles.orStyle}>{'OR'}</Text>
            <CrayonIconButton
              label={'Continue with Microsoft'}
              onPress={() => {
                onClickMicrosoft();
              }}
            />
            <CrayonLogo></CrayonLogo>
          </View>
          <View style={styles.footerContainer}></View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginAD;
