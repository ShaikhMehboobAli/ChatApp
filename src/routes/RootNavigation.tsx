import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Platform, Text, View} from 'react-native';
import {navigationRef} from '../utils/navigation';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen';
import {routes} from '@utils/constants';

const RootStack = createNativeStackNavigator();
type RootNavigationProps = {};
const RootNavigation: FC<RootNavigationProps> = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={routes.SplashScreen}
        // screenOptions={screenOptions}
      >
        <RootStack.Screen
          name={routes.SplashScreen}
          options={{
            headerShown: false,
          }}
          component={SplashScreen}
        />
        <RootStack.Screen
          name={routes.LoginScreen}
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
