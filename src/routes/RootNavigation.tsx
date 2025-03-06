import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Platform, Text, View} from 'react-native';
import {routes} from '../utils/constants/routes';
import {navigationRef} from '../utils/navigation';
import SplashScreen from '@screens/SplashScreen';

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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
