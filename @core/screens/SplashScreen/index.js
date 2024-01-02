import {View, Image, Platform} from 'react-native';
import Images from '../../assets/index';
import React from 'react';
import styles from './styles';
import isEmpty from '../../utils/empty_checks';
import {MMKV} from 'react-native-mmkv';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import _const from '../../constant/const';
import {refresh} from 'react-native-app-auth';

// Query
import {GET_MONTH} from '../../query/home';

// API
import graphQLApi from '../../service/graphQLApi';

const SplashScreen = () => {
  const storage = new MMKV();
  const [launch, setLaunch] = useState(false);
  const navigation = useNavigation();

  const loadApp = async () => {
    return setTimeout(() => {
      setLaunch(true);
    }, 1500);
  };

  useEffect(() => {
    if (launch) {
      if (isEmpty(storage.getString(_const.authToken))) {
        navigation.replace(_const.login);
        /* If login going with email & password use _const.loginAD */
        return;
      } else {
        refreshTokens();
      }
    } else {
      loadApp();
    }
    storage.set(_const.headerCache, '0');
    storage.set(_const.filterDataCache, JSON.stringify([]));
    storage.set(_const.filterParamsCache, JSON.stringify({}));
    storage.set(_const.selectFilterCache, JSON.stringify([]));
  }, [launch]);

  const refreshTokens = async () => {
    const getRefreshTokenId = storage.getString(_const.refreshToken);
    const config = {
      issuer: _const.issuer,
      clientId: _const.iosApplicationId,
      redirectUrl: _const.iosRedirectUrl,
      scopes: _const.scope,
      iosPrefersEphemeralSession: true,
    };
    const expirationTime = JSON.parse(storage.getString(_const.authToken));
    if (isTokenExpired(expirationTime.accessTokenExpirationDate)) {
      const newRefresh = await refresh(config, {
        refreshToken: getRefreshTokenId,
      }).catch(function (err) {});
      storage.set(_const.refreshToken, newRefresh.refreshToken);
      navigation.replace(_const.bottomTab);
    } else {
      navigation.replace(_const.bottomTab);
    }
  };

  const isTokenExpired = expirationTime => {
    return expirationTime < Date.now();
  };

  return (
    <View>
      <Image style={styles.imageStyle} source={Images.splashImage} />
    </View>
  );
};

export default SplashScreen;
