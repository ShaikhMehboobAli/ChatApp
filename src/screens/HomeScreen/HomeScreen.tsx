import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
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
import {useDispatch, useSelector} from 'react-redux';
import {fetchRoomList} from '@utils/redux/actions/authActions';
import {CustomSvgData} from '@assets/images/svg/CustomSvg';
import {FontFamily} from '@constants/font-family';

import {format, isToday, isYesterday} from 'date-fns';
import {navigate} from '@utils/navigation';
import {routes} from '@utils/constants';
import CustomModal from '@components/CustomModal';
import CountdownTimer from '@components/ExpiryCountDown';

const formatTimestamp = timestamp => {
  const date = new Date(timestamp);

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';

  return format(date, 'dd, MMM yy');
};

const HomeScreen = () => {
  //   console.log('SplashScreen');
  const [name, setName] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const {roomList, userDetail, roomListLoading} = useSelector(
    (state: {auth: any}) => state.auth,
  );
  const [visible, setVisible] = useState(false);

  const intervalRef = useRef(null);

  const fetchData = useCallback(
    e => {
      dispatch(fetchRoomList(e));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData('loader');

    intervalRef.current = setInterval(() => {
      fetchData('noLoader');
    }, 40000);

    return () => clearInterval(intervalRef.current);
  }, [fetchData]);

  const sortedRoomList = useMemo(() => {
    return [...roomList].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
  }, [roomList]);

  const filteredRoomList = useMemo(() => {
    return sortedRoomList.filter(room =>
      room.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [sortedRoomList, searchText]);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={() => {
          navigate(routes.ChatRoom, {id: item.id, roomDetail: item});
        }}
        activeOpacity={0.7}
        style={styles.cardContainer}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 12,
                fontFamily: FontFamily.semiBold,
                textTransform: 'capitalize',
              }}>
              {item?.name}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 9,
                fontFamily: FontFamily.light,
                textTransform: 'lowercase',
              }}>
              {formatTimestamp(item?.created_at)}
            </Text>
          </View>
          <CountdownTimer expiresAt={item?.expires_at} />
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={[styles.middleContainer, {flex: 1}]}>
        <View style={styles.userInfoMainContainer}>
          <CustomSvgData.Logo.myLogo height={90} width={70} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfo}>Hi, {userDetail?.username}</Text>
            <Text style={styles.userInfoSub}>Welcome Back</Text>
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchBar}
            placeholder="Search Group..."
            placeholderTextColor={'#9c9c9c'}
          />
          <Ionicons
            name="search-circle"
            size={28}
            color={'#000'}
            style={{
              // padding: 5,
              paddingRight: 5,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <Text style={[styles.logoText]}>Chats </Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Ionicons name="add-circle" size={30} color={'#26751d'} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          {roomListLoading ? (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <FlatList
              data={filteredRoomList}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No chats available</Text>
              }
              removeClippedSubviews={true}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={100}
            />
          )}
        </View>
      </View>
      <CustomModal setVisible={setVisible} visible={visible} />
    </SafeAreaView>
  );
};

export default HomeScreen;
