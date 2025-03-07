import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Images} from '@assets/images';
import {routes} from '@utils/constants';
import {navigate} from '@utils/navigation';

const SplashScreen = () => {
  console.log('SplashScreen');
  return (
    <View style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={styles.middleContainer}>
        <Images.SplashLogo />
        <Text style={[styles.logoText]}>Yo Chat</Text>
        <Text style={[styles.descText]}>Chat with your group at ease</Text>
      </View>

      <TouchableOpacity
        style={[styles.footerContainer]}
        onPress={() => {
          navigate(routes.LoginScreen);
        }}>
        <Text style={[styles.footerText]}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
