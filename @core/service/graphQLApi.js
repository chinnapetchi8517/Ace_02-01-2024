import axios from './axios';
import _const from '../constant/const';
import NetInfo from '@react-native-community/netinfo';

const graphQLApi = (query, variables, navigation) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          axios
            .post('', {
              query,
              variables,
            })
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          navigation.navigate(_const.noNetwork);
          reject(_const.serviceUnavailable);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default graphQLApi;
