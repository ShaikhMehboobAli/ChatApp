import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '@assets/images';
import {goBack} from '@utils/navigation';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {allStats, logout} from '@utils/redux/actions/authActions';

const ProfileScreen = () => {
  const [name, setName] = useState<string>('');
  const dispatch = useDispatch();
  const {allStatsData, userDetail} = useSelector(
    (state: {auth: any}) => state.auth,
  );

  useEffect(() => {
    dispatch(allStats());
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={styles.middleContainer}>
        <View style={[styles.subContainerBox, {marginTop: 15}]}>
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => {
              goBack();
            }}>
            <Ionicons name="arrow-back" size={23} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.roomText}>Your Profile</Text>
        </View>
        <View style={styles.logoContainer}>
          <Images.LoginLogo />
        </View>
        <Text style={[styles.descText, styles.textInput, styles.textDesc]}>
          This is your profile over view and stats
        </Text>
      </View>
      <View style={styles.inputContainerView}>
        <Text style={[styles.descText]}>Name</Text>
        <TextInput
          value={userDetail?.username}
          editable={false}
          onChangeText={setName}
          style={styles.inputBox}
          placeholder="Enter your name"
          placeholderTextColor={'#a8a8a8'}
        />

        <View style={styles.statsContainer}>
          <View style={styles.totalUserContainer}>
            <Text style={styles.totalUserTxt}>
              {allStatsData?.total_users || 0}
            </Text>
            <Text style={styles.totalUserTxtNo}>Total Active Users</Text>
          </View>
          <View style={styles.totalRoomsContainer}>
            <Text style={styles.totalRoomNoTxt}>
              {allStatsData?.total_rooms || 0}
            </Text>
            <Text style={styles.totalRoomTxt}>Total Active Rooms</Text>
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            dispatch(logout());
          }}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
