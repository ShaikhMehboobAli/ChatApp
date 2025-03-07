import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '@assets/images';
import {routes} from '@utils/constants';
import {navigate} from '@utils/navigation';
import {styles} from './style';
import {FontFamily} from '@constants/font-family';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showErrorToast} from '@utils/toaster/Alerts';
const LoginScreen = () => {
  console.log('SplashScreen');
  const [name, setName] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = () => {
    if (name.trim() === '') {
      showErrorToast({message: 'Please Enter Name'});
      return;
    }
    // const response = await axios.post(`${API_BASE}/username`, {username});
  };
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={styles.middleContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '25%',
          }}>
          <Images.LoginLogo />
        </View>
        <Text style={[styles.logoText]}>Login </Text>
        <Text style={[styles.descText, styles.textInput]}>
          Enter to your account by just typing your name. {'\n'}No more hassale
          for creating account
        </Text>
      </View>
      <View style={{flex: 1, marginHorizontal: 10, marginTop: 15}}>
        <Text style={[styles.descText]}>Name</Text>
        <TextInput
          ref={inputRef}
          value={name}
          onChangeText={setName}
          style={styles.inputBox}
          placeholder="Enter your name"
          placeholderTextColor={'#a8a8a8'}
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleLogin();
          }}>
          <Ionicons name="arrow-forward-outline" size={26} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
