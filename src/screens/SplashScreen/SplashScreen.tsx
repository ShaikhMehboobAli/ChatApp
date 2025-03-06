import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Images} from '@assets/images';

const SplashScreen = () => {
  console.log('SplashScreen');
  return (
    <View style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={styles.middleContainer}>
        <Images.SplashLogo />
        <Text style={[styles.logoText, {color: '#000'}]}>
          {/* {t('Q8sportfinder')} */}
          hello
        </Text>
      </View>

      <View style={styles.footerContainer}>
        {/* <Images.CompanyLogo /> */}
        <Text style={[styles.footerText, {color: '#eee'}]}>
          {/* {t('Poweredbyempower')} */}
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
