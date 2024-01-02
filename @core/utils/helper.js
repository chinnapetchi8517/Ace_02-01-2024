import moment from 'moment';
import {MMKV} from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';
import {Platform, NativeModules} from 'react-native';
import _isEmpty from 'lodash/isEmpty';
import DeviceInfo from 'react-native-device-info';
import _const from '../constant/const';
import graphQLApi from '../service/graphQLApi';
import {LOGOUT} from '../query/login';
import * as RootNavigation from '../utils/rootnavigationroutes';

export const faqContent = [
  {
    id: 1,
    title: 'Can I create or modify KPIs within the app?',
    info: 'No, this app is specifically designed for visualizing and tracking existing KPIs. It does not offer the functionality to create or edit KPIs. Users can view and analyze KPI data provided by the organization.',
  },
  {
    id: 2,
    title: 'How can I access and view KPIs in the app?',
    info: 'You can access and view KPIs by logging into the app using your authorized credentials. Once logged in, you will have access to pre-defined KPIs and their visual representations on the dashboard.',
  },
  {
    id: 3,
    title: 'Is it possible to customize or filter the KPIs I see in the app?',
    info: 'Yes, you can typically customize the view of KPIs by applying filters or selecting specific KPI categories. This allows you to focus on the KPIs that are most relevant to your role or responsibilities.',
  },
  {
    id: 4,
    title: 'How often is the KPI data updated in the app?',
    info: 'KPI data is typically refreshed everyday. Users can expect to see data refreshed on a predetermined schedule, ensuring that the information remains up to date.',
  },
  {
    id: 5,
    title: 'Is my KPI data secure in the app?',
    info: 'The app is designed with security in mind. It employs encryption and other security measures to protect the KPI data. Your data is stored and transmitted securely to maintain data integrity and confidentiality.',
  },
  {
    id: 6,
    title: 'Can I access historical KPI data in the app?',
    info: 'Historical KPI data may be available for reference and trend analysis. This enables users to track performance over time and make informed decisions based on historical data.',
  },
  {
    id: 7,
    title:
      'Can I customize the KPIs or dashboards to match my specific role or responsibilities within the bank?',
    info: 'The app is designed to display KPIs that are tailored to your role or department within the bank. These KPIs are predefined by administrators to ensure they are relevant to your responsibilities and objectives.',
  },
  {
    id: 8,
    title:
      'Are there any features for setting alerts or notifications related to KPI thresholds?',
    info: 'Yes, the app provides alert and notification features. You can set up alerts to be notified when KPIs reach specific thresholds. This functionality allows you to stay informed and take action as needed.',
  },
];

export const formatNumber = (value, isDecimal) => {
  const absoluteValue = Math.abs(value); // Get the absolute value

  if (absoluteValue >= 1000000000) {
    return ` ${(absoluteValue / 1000000000).toFixed(isDecimal ? 1 : 0)}B`;
  } else if (absoluteValue >= 1000000) {
    return ` ${(absoluteValue / 1000000).toFixed(isDecimal ? 1 : 0)}M`;
  } else if (absoluteValue >= 1000) {
    return `${(absoluteValue / 1000).toFixed(isDecimal ? 1 : 0)}K`;
  } else {
    return absoluteValue?.toString();
  }
};

export const getLast12Months = () => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-indexed, where January is 0
  const currentYear = currentDate.getFullYear();

  const last12Months = [];

  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Ensure the month is within [0, 11]
    const year =
      currentYear - (Math.floor((currentMonth - i) / 12) < 0 ? 1 : 0);
    const formattedMonth = `${months[monthIndex]}'${year
      .toString()
      .substring(2)}`;
    last12Months.push(formattedMonth);
  }

  return last12Months;
};

export const getCurrentDateFormat = () => {
  return moment().format('DD MMM YYYY');
};

export const getUniqueDeviceId = async () => {
  let deviceId = null;
  if (Platform.OS === 'ios') {
    deviceId = await DeviceInfo.getUniqueId();
  } else {
    deviceId = await DeviceInfo.getAndroidId();
  }
  return deviceId;
};

export const formatStringToArray = (data = '') => {
  return data.split(',');
};

export const logOut = async (isLogout = false) => {
  const storage = new MMKV();
  let userData =
    storage.getString(_const.userInfo) &&
    JSON.parse(storage.getString(_const.userInfo));
  try {
    const response = await NetInfo.fetch(_const.logoutEndpoint, {
      method: 'GET',
    });
    let variables = {
      user_id: userData?.id,
    };
    if (isLogout) {
      graphQLApi(LOGOUT, variables)
        .then(res => {
          if (res) {
            if (!_isEmpty(response)) {
              RootNavigation.navigate(_const.login);
              storage.clearAll();
              // navigation().dispatch(
              //   CommonActions.reset({
              //     index: 0,
              //     routes: [{name: _const.login}],
              //   }),
              // );
            } else {
            }
          }
        })
        .catch(err => {});
    } else {
      if (!_isEmpty(response)) {
        RootNavigation.navigate(_const.login);
        storage.clearAll();
        // navigation().dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: _const.login}],
        //   }),
        // );
      } else {
      }
    }
  } catch (error) {}
};

// export const formatChartData = (
//   dataitem,
//   monthsArray,
//   currentMonthIndex,
//   keyValue,
// ) => {
//   const data = [];

//   for (let i = 0; i < monthsArray.length; i++) {
//     const monthIndex = (currentMonthIndex + i) % 12;

//     // Extracting month and year from the month string
//     const [, monthName, year] = /(\w+)'(\d+)/.exec(monthsArray[monthIndex]);

//     // Constructing the correct key based on the month and year
//     const key = `${keyValue}${i + 1}`;

//     const value = dataitem[key];

//     if (value !== undefined) {
//       data.push({
//         x: monthsArray[monthIndex],
//         y: value,
//       });
//     }
//   }

//   return data.reverse();
// };

export const formatChartData = (
  data,
  months,
  currentIndex,
  key,
  intialValue,
  totalCount,
) => {
  const formattedData = [];

  const values = data[key];

  // Check if values is an array before attempting to iterate
  if (Array.isArray(values)) {
    for (let i = intialValue; i < totalCount; i++) {
      const index = i % values.length;
      const monthIndex = (currentIndex + index) % 12;
      const month = months[monthIndex];

      formattedData.push({
        x: month,
        y: key === 'total_outflow' ? -values[index] : values[index],
      });
    }
  }

  return formattedData.reverse();
};

export const removeKey=(obj, keyToRemove)=> {
  const updatedObj = {...obj}; // Create a shallow copy of the original object
  delete updatedObj[keyToRemove]; // Remove the specified key
  return updatedObj;
  }
