import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
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
import {useDispatch, useSelector} from 'react-redux';
import {fetchRoomList} from '@utils/redux/actions/authActions';

const HomeScreen = () => {
  //   console.log('SplashScreen');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();
  const {roomList} = useSelector(({auth}) => auth);

  useEffect(() => {
    dispatch(fetchRoomList());
  }, []);

  const handleLogin = () => {
    if (name.trim() === '') {
      showErrorToast({message: 'Please Enter Name'});
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
      <View style={styles.middleContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '25%',
          }}>
          <Images.LoginLogo />
        </View>
        <Text style={[styles.logoText]}>HomeScreen </Text>
        <FlatList
          data={roomList}
          renderItem={({item}) => (
            <Text style={{color: 'black'}}>{item.name}</Text>
          )}
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          disabled={loading}
          style={styles.btn}
          onPress={() => {
            dispatch(fetchRoomList());
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

export default HomeScreen;
