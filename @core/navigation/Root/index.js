import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Paths from '../screen_path';
import _const from '../../constant/const';
import { navigationRef } from '../../utils/rootnavigationroutes';

function RootNavigator() {
  const Root = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef} > 
      <Root.Navigator
        initialRouteName={_const.splash}
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          gestureEnabled: false,
        }}>
        <Root.Screen name={_const.splash} component={Paths.SplashScreen} />
        <Root.Screen name={_const.login} component={Paths.Login} />
        <Root.Screen name={_const.bottomTab} component={Paths.BottomTab} />
        <Root.Screen name={_const.faq} component={Paths.Faq} />
        <Root.Screen name={_const.feedback} component={Paths.Feedback} />
        <Root.Screen name={_const.privacy} component={Paths.Privacy} />
        <Root.Screen
          name={_const.personalizeKpi}
          component={Paths.PersonalizeKpi}
        />
        <Root.Screen
          name={_const.termscondition}
          component={Paths.TermCondition}
        />
        <Root.Screen
          name={_const.reportissue}
          component={Paths.ReportIssue}
        />
        <Root.Screen name={_const.noNetwork} component={Paths.NoNetwork} />
        <Root.Screen name={_const.loginAD} component={Paths.LoginAD} />
        <Root.Screen name={_const.insights} component={Paths.Insight} />

      </Root.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
