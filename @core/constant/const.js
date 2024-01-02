import config from "react-native-config";

import { formatStringToArray } from "../utils/helper";

const {
  API_BASE_URL,
  LOG_OUT_ENDPOINT, 
  USER_PROFILE_ENDPOINT, 
  PROFILE_PICTURE_ENDPOINT,
  SCOPE,
  ISSUER,
  IOS_REDIRECT_URL,
  IOS_APPLICATION_ID,
  TENANT_ID,
  HASURA_SECRET_KEY
} = config

const login = 'login';
const splash = 'splash';
const bottomTab = 'bottomTab';
const faq = 'faq';
const feedback = 'feedback';
const privacy = 'privacy';
const termscondition = 'termscondition';
const personalizeKpi = 'personalizeKpi';
const reportissue = 'reportissue';
const noNetwork = 'noNetwork';
const loginAD = 'loginAD';
const dashboardfilter = 'dashboardfilter';
const insights = 'Insights';
const month = 'month';

const blissMedium = 'Bliss-Medium';
const blissBold = 'Bliss-Bold';
const blissLight = 'Bliss-Light';
const blissRegular = 'Bliss-Regular';
const blissHeavy = 'Bliss-Heavy';
const authToken = 'authToken';
const refreshToken = 'refreshToken';
const userInfo = 'userInfo';
const recentSearch = 'recentSearch';
const iosApplicationId = IOS_APPLICATION_ID;
const androidApplkicationId = '03a31784-dcad-487c-9d5c-e5025dc3a476';
const tenantId = TENANT_ID;
const ios = 'ios';
const android = 'android';
const apiBaseUrl = API_BASE_URL;
const admin_key = HASURA_SECRET_KEY;
const userProfileEndpoint = USER_PROFILE_ENDPOINT;
const profilePictureEndpoint = PROFILE_PICTURE_ENDPOINT;
const logoutEndpoint = LOG_OUT_ENDPOINT;
const scope = formatStringToArray(SCOPE);
const issuer = ISSUER;
const iosRedirectUrl = IOS_REDIRECT_URL;
const androidRedirectUrl = 'com.crayondata.acemobile://com.crayondata.acemobile/android/callback';
const serviceUnavailable = 503;
const hardwareBackPressKey = 'hardwareBackPress';
const bookmarkCache = 'bookmarkCache';
const kpiCache = 'kpiCache';
const headerCache = 'headerCache';
const searchHistoryCache = 'searchHistoryCache';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const level2SliderCache = 'level2SliderCache';
const filterDataCache = 'FilterData'
const filterParamsCache = 'filterParams'
const selectFilterCache = 'selectedFilter'
const accessDenied = 'access-denied'

// Mock Data for Template Components

const monthToDate = {
  targetValue: '12K',
  value: '22.2B',
  isIncrement: true,
  isMonth: true,
  isTargetIncrement: false,
  previousValue: '100M',
};
const yearToDate = {
  targetValue: '12K',
  value: '22.2B',
  isIncrement: false,
  isMonth: false,
  isTargetIncrement: true,
  previousValue: '100M',
};

const growthMonth = {
  value: '25M',
  isIncrement: true,
  isMonth: true,
  varianceValue: '12k',
};

const growthYear = {
  value: '25M',
  isIncrement: false,
  isMonth: false,
  varianceValue: '12k',
};

const asYesterday = {
  value: '22.2B',
  isIncrement: true,
  planName: '. Plan',
  varianceValue: '100M',
};


const stack1data=[
  {x:"branch",y:60},{
   x:"dev",y:10
  },{x:"red",y:12},{x:"test",y:18}
  ];
  const stack2data=[
    {x:"branch",y:50},{
     x:"dev",y:10
    },{x:"red",y:12},{x:"test",y:18}
    ];

  const stack3data=[
      {x:"branch",y:20},{
       x:"dev",y:10
      },{x:"red",y:12},{x:"test",y:18}
      ];
   const allLineData=[
    [{ x: `jun'23`, y: 2 }, { x: `jul'23`, y: 4 },{ x: `Aug'23`, y: 7 },{ x: `Sep'23`, y: 4 }, { x: `Oct'23`, y: 6 }],
    [{ x: `jun'23`, y: 3 }, { x: `jul'23`, y: 5 },{ x: `Aug'23`, y: 5 },{ x: `Sep'23`, y: 8 }, { x: `Oct'23`, y: 7 }],
    [{ x: `jun'23`, y: 1 }, { x: `jul'23`, y: 6 },{ x: `Aug'23`, y: 4 },{ x: `Sep'23`, y: 3 }, { x: `Oct'23`, y: 1 }],
   ]   
  
  const nameScale=["Last Year","MTD","YTD","Total Month"]
  const colorScale=['#FACC14', '#13C2C2', '#1890FF', '#FBD437']
  const selectorOptions = ["option1", "option2", "option3"]
export default {
  //api
  //OAuth Endpoints
  userProfileEndpoint,
  profilePictureEndpoint,
  logoutEndpoint,
  scope,
  issuer,
  iosRedirectUrl,
  androidRedirectUrl,
  admin_key,
  apiBaseUrl,

  //key
  authToken,
  userInfo,
  refreshToken,
  recentSearch,
  serviceUnavailable,
  hardwareBackPressKey,
  selectorOptions,
  accessDenied,

  //CacheKey
  kpiCache,
  searchHistoryCache,
  bookmarkCache,
  level2SliderCache,
  headerCache,
  filterDataCache,
  filterParamsCache,
  selectFilterCache,
  //id
  iosApplicationId,
  androidApplkicationId,
  tenantId,

  //routes
  login,
  splash,
  bottomTab,
  faq,
  feedback,
  privacy,
  termscondition,
  personalizeKpi,
  reportissue,
  noNetwork,
  loginAD,
  dashboardfilter,
  insights,
  month,

  // fonts
  blissMedium,
  blissBold,
  blissLight,
  blissRegular,
  blissHeavy,

  //application
  ios,
  android,

  //regex
  emailRegex,

  //mockData
  monthToDate,
  yearToDate,
  growthMonth,
  growthYear,
  asYesterday,
  stack1data,
  stack2data,
  stack3data,
  allLineData,
  nameScale,
  colorScale
};
