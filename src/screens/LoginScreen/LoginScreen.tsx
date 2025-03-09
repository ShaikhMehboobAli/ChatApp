import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '@assets/images';
import {styles} from './style';
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

  const bounceValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(10)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    const bounceAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -10, // Move up
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0, // Move back to original position
            duration: 500,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    bounceAnimation();
    inputRef.current?.focus();
  }, []);

  const handleLogin = () => {
    if (name.trim() === '') {
      showErrorToast({message: 'Please Enter Username'});
      return;
    } else if (name.trim().length < 3) {
      showErrorToast({message: 'Name must be at least 3 character'});
    } else if (name.trim().includes(' ')) {
      showErrorToast({message: 'Name should be a single word (no spaces)'});
      return;
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
      <View style={[styles.middleContainer]}>
        <Animated.View
          style={[
            styles.logoContainer,
            {transform: [{translateY: bounceValue}]},
          ]}>
          <Images.LoginLogo />
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: translateYAnim}],
          }}>
          <Text style={[styles.logoText]}>Login </Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: translateYAnim}],
          }}>
          <Text style={[styles.descText, styles.textInput]}>
            Enter to your account by just typing username. {'\n'}No more hassale
            for creating account
          </Text>
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.nameTxt,
          {
            opacity: fadeAnim,
            transform: [{translateY: translateYAnim}],
          },
        ]}>
        <Text style={[styles.descText]}>Username</Text>
        <TextInput
          ref={inputRef}
          value={name}
          onChangeText={setName}
          style={styles.inputBox}
          placeholder="Enter your username"
          placeholderTextColor={'#a8a8a8'}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.footerContainer,
          // {
          //   opacity: fadeAnim,
          //   transform: [{translateY: translateYAnim}],
          // },
        ]}>
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
      </Animated.View>
    </SafeAreaView>
  );
};

export default LoginScreen;
