import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {Platform, Text, View} from 'react-native';
import {navigationRef} from '../utils/navigation';
import SplashScreen from '@screens/SplashScreen';
import LoginScreen from '@screens/LoginScreen';
import {routes} from '@utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import HomeScreen from '@screens/HomeScreen';
import {isAuthenticated} from '@utils/redux/actions/authActions';
import Loader from '../components/Loader';
import {AppDispatch} from '@utils/redux';

const RootStack = createNativeStackNavigator();
type RootNavigationProps = {};
const RootNavigation: FC<RootNavigationProps> = () => {
  const token = useSelector((state: any) => state.auth.userId);
  const isLoading = useSelector((state: any) => state.auth.tokenLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator
          initialRouteName={token ? routes.HomeScreen : routes.LoginScreen}
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
          <RootStack.Screen
            name={routes.HomeScreen}
            options={{
              headerShown: false,
            }}
            component={HomeScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigation;
