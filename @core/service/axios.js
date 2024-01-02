// Axios Api
import axios from 'axios';
import {MMKV} from 'react-native-mmkv';
import Config from 'react-native-config';

import _const from '../constant/const';
import {getUniqueDeviceId, logOut} from '../utils/helper';
import { Alert } from 'react-native';

const storage = new MMKV();

const instance = axios.create({
  baseURL: Config.API_BASE_URL
});

instance.interceptors.request.use(config => {
  if (storage.getString(_const.authToken)) {
    const authToken = JSON.parse(storage.getString(_const.authToken));
    config.headers['az-id-token'] = `Bearer ${authToken.idToken}`;
    config.headers['az-access-token'] = `Bearer ${authToken.accessToken}`;
    config.headers['ace-device-uuid'] = getUniqueDeviceId();
  }
  return config;
});

instance.interceptors.response.use(
  res => handleSuccess(res),
  err => handleError(err),
);

const  handleSuccess=(response) =>{
  if (response?.data?.errors?.[0]?.extensions?.code == _const.accessDenied) {
    Alert.alert('Session Expired');
    logOut();
  } else {
    return response;
  }
}

const handleError = error => {
  if (error?.data?.errors?.[0]?.extensions?.code == _const.accessDenied) {
    Alert.alert('Session Expired');
    logOut();
  }
};

export default instance;
