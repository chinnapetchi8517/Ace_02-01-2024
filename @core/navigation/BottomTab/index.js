/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {KeyboardAvoidingView, Platform, View, Image} from 'react-native';
import Icons from '../../assets/index';
import color from '../../constant/color';
import AlertScreen from '../../screens/Alerts/index';
import Dashboard from '../../screens/Dashboard/index';
import Assisant from '../../screens/Search/index';
import Bookmark from '../../screens/Bookmark/index';
import Profile from '../../screens/Profile/index';
import Level2 from '../../screens/Level2';
import _const from '../../constant/const';
import Level3 from '../../screens/Level3';
import Level4 from '../../screens/Level4';
import Filter from '../../screens/Filter';
import TabButton from '../../components/TabButtons';
import {BlurView} from '@react-native-community/blur';
const Tab = createBottomTabNavigator();

function TabNavigator({navigation, route}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 88,
            paddingHorizontal: 16,
            paddingBottom: Platform.OS == 'ios' ? 22 : 0,
            position: 'absolute',
          },
          tabBarBackground: () =>
            Platform.OS === 'ios' ? (
              <BlurView
                blurType="light"
                style={{width: '100%', height: '100%'}}>
              </BlurView>
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: color.secondary100,
                }}
              />
            ),
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarButton: props => (
              <TabButton
                {...props}
                label={'Dashboard'}
                icon={
                  <Icons.DashboardIcon
                    width={24}
                    height={24}
                    fill={
                      props.accessibilityState.selected
                        ? color.white
                        : color.primary500
                    }
                  />
                }
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Assisant}
          options={{
            unmountOnBlur: true,
            tabBarButton: props => (
              <TabButton
                {...props}
                label={'Search'}
                icon={
                  <Icons.SearchIcon
                    width={24}
                    height={24}
                    fill={
                      props.accessibilityState.selected
                        ? color.white
                        : color.primary500
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            unmountOnBlur: true,
            tabBarButton: props => (
              <TabButton
                {...props}
                label={'Bookmark'}
                icon={
                  <Icons.Bookmark
                    width={24}
                    height={24}
                    fill={
                      props.accessibilityState.selected
                        ? color.white
                        : color.primary500
                    }
                  />
                }
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault(); // <-- this function blocks navigating to screen
            },
          }}
        />
        <Tab.Screen
          name="Alerts"
          component={AlertScreen}
          options={{
            tabBarButton: props => (
              <TabButton
                {...props}
                label={'Alerts'}
                icon={
                  <Icons.AlertIcon
                    width={24}
                    height={24}
                    fill={
                      props.accessibilityState.selected
                        ? color.white
                        : color.primary500
                    }
                  />
                }
              />
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault(); // <-- this function blocks navigating to screen
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarItemStyle: {display: 'none'},
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Level2"
          component={Level2}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarItemStyle: {display: 'none'},
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Level3"
          component={Level3}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarItemStyle: {display: 'none'},
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Level4"
          component={Level4}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarItemStyle: {display: 'none'},
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="dashboardfilter"
          component={Filter}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarItemStyle: {display: 'none'},
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}

export default TabNavigator;
