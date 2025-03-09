import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
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
import {loginUser} from '@utils/apis/PostApiCall';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
  console.log('SplashScreen');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleLogin = () => {
    if (name.trim() === '') {
      showErrorToast({message: 'Please Enter Name'});
      return;
    } else if (name.trim().length < 3) {
      showErrorToast({message: 'Name must be at least 3 character'});
    }
    setLoading(true);
    const payload = {
      username: name,
    };
    loginUser(payload, dispatch)
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
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
          disabled={loading}
          style={styles.btn}
          onPress={() => {
            handleLogin();
          }}>
          {loading ? (
            <ActivityIndicator size={'large'} color={'#fff'} />
          ) : (
            <Ionicons name="arrow-forward-outline" size={26} color={'#fff'} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
