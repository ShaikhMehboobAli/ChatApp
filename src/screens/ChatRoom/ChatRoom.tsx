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
import {goBack, navigate} from '@utils/navigation';
import {styles} from './style';
import {FontFamily} from '@constants/font-family';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showErrorToast, showSuccessToast} from '@utils/toaster/Alerts';
import {loginUser} from '@utils/apis/PostApiCall';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {fetchMessageList} from '@utils/redux/actions/authActions';
import {MESSAGE_LIST} from '@utils/redux/types';
import ActiveMemberModal from '@components/ActiveMemberModal';

const ChatRoom = props => {
  const {params} = useRoute();
  const id = params?.id || '';
  const roomDetail = params?.roomDetail;
  const [sendMessage, setSendMessage] = useState<string>('');
  const ws = useRef(null);
  const dispatch = useDispatch();
  const {messageList, messageListLoading, userDetail} = useSelector(
    (state: {auth: any}) => state.auth,
  );
  const [allMessages, setAllMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeUser, setActiveUser] = useState([]);
  console.log('activeUser', id, roomDetail);

  useEffect(() => {
    joinRoom();
    return () => {
      if (ws.current) {
        console.log('Closing WebSocket for user:');
        ws.current.close();
        dispatch({
          type: MESSAGE_LIST,
          data: [],
        });
      }
    };
  }, [id]);

  let retryCount = 0;
  const maxRetries = 5;

  const connectWebSocket = id => {
    retryCount++;

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected.');
      return;
    }

    if (retryCount >= maxRetries) {
      console.error('Max reconnection attempts reached.');
      showErrorToast({
        message:
          'Unable to connect to the chat server. Please try again later.',
      });
      return;
    }

    ws.current = new WebSocket(
      `wss://chat-api-k4vi.onrender.com/ws/${id}/${userDetail.username}`,
    );

    ws.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    ws.current.onerror = error => {
      console.error('WebSocket error:', error.message);
      if (
        error.message?.includes(
          'Network error: Unable to connect to the chat server. Please check your internet connection.',
        )
      ) {
        showErrorToast({message: error.message});
        // Alert.alert("Network error: Unable to connect to the chat server. Please check your internet connection.");
      } else {
        Alert.alert('WebSocket encountered an error. Retrying in 5 seconds...');
        setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
      }
    };

    ws.current.onmessage = event => {
      const newMessage = JSON.parse(event.data);

      setActiveUser(newMessage?.users);
      switch (newMessage.event) {
        case 'join': {
          if (newMessage.username !== userDetail.username) {
            console.log(
              `${newMessage.username} has joined the chat.`,
              userDetail.username,
              newMessage,
              newMessage.username !== userDetail.username,
            );
            showSuccessToast({
              message: `${newMessage.username} has joined the chat.`,
              subTitle: 'New Member joined ' + roomDetail.name,
            });
          }
          break;
        }
        case 'leave': {
          if (newMessage.username !== userDetail.username) {
            console.log(
              `${newMessage.username} has leaved the chat.`,
              userDetail.username,
              newMessage,
              newMessage.username !== userDetail.username,
            );
            showSuccessToast({
              message: `${newMessage.username} has leave the chat.`,
              subTitle: 'A member leave ' + roomDetail.name,
            });
          }
          break;
        }
        case 'message': {
          console.log(
            'New message:',
            newMessage?.message?.username,
            // newMessage?.id !== userDetail?.id,
            // newMessage?.username,
            // userDetail?.username,
          );
          if (
            // !!newMessage?.message?.content &&
            newMessage?.message?.username !== userDetail?.username
          ) {
            setAllMessages(prev => [newMessage?.message, ...prev]);
          }
          break;
        }
        default:
          break;
      }
    };
  };

  useEffect(() => {
    setAllMessages(messageList);
  }, [messageList]);

  const handleSendMessage = () => {
    if (sendMessage) {
      const newMessage = {
        id: allMessages[0]?.id + 1 || 1,
        content: sendMessage,
        event: 'message',
        username: userDetail?.username,
        user_id: userDetail?.id,
        created_at: new Date().toISOString().split('.')[0],
      };
      ws.current.send(JSON.stringify(newMessage));
      setAllMessages(prev => [newMessage, ...prev]);
      console.log('message sended----', newMessage);
      setSendMessage('');
    }
  };

  const joinRoom = async () => {
    // setRoomId(id);
    connectWebSocket(id);
    dispatch(fetchMessageList(id));
  };

  if (messageListLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={styles.subContainer}>
        <View style={styles.subContainerBox}>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => {
              goBack();
            }}>
            <Ionicons name="arrow-back" size={23} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.roomText}>{roomDetail?.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#b3e8bc',
            borderRadius: 100,
            width: 40,
            height: 40,
            marginRight: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.medium,
              color: '#0f8c26',
              marginRight: 2,
            }}>
            {activeUser?.length || 0}
          </Text>
          <Ionicons name="radio-button-on" size={13} color={'#0f8c26'} />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <FlatList
          data={allMessages}
          inverted
          renderItem={({item}) => (
            <View
              style={[
                {
                  //   maxWidth: '90%',
                  display: 'flex',
                  //   justifyContent: 'center',
                  flexDirection: 'row',
                },

                item?.user_id !== userDetail?.id
                  ? {
                      alignItems: 'flex-start',
                      paddingRight: 15,
                    }
                  : {
                      // alignItems: 'flex-end',
                      // paddingLeft: 15,
                      marginLeft: 'auto',
                    },
              ]}>
              {item?.user_id !== userDetail?.id && (
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    backgroundColor: '#6d6d6e ',
                    marginTop: 'auto',
                    marginBottom: 5,
                    marginRight: 5,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#cacccc'}}>
                    {item?.username[0] || '?'}
                  </Text>
                </View>
              )}
              <View
                style={[
                  {
                    //
                    backgroundColor: '#6d6d6e',
                    marginBottom: 5,
                    padding: 5,
                    //   width: 'auto',
                  },
                  item?.user_id !== userDetail?.id
                    ? {
                        borderWidth: 0.6,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      }
                    : {
                        borderWidth: 0.6,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        backgroundColor: '#147526',
                      },
                ]}>
                {item?.user_id !== userDetail?.id && (
                  <Text
                    style={[
                      {
                        fontSize: 11,
                        fontFamily: FontFamily.semiBold,
                        color: '#cccecf',
                        // display:'none'
                      },
                      item?.user_id === userDetail?.id && {display: 'none'},
                    ]}>
                    {item?.username || ''}
                  </Text>
                )}
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: FontFamily.regular,
                    fontSize: 12,
                    lineHeight: 13,
                    letterSpacing: 0.3,
                    marginTop: 3,
                  }}>
                  {item?.content}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0.6,
          borderRadius: 5,
          alignItems: 'center',
          backgroundColor: '#f0f1f2',
          minHeight: 40,
          marginHorizontal: 7,
          marginBottom: 7,
        }}>
        <TextInput
          value={sendMessage}
          onChangeText={setSendMessage}
          style={{flex: 1, marginLeft: 5, color: '#000', maxHeight: 60}}
          placeholder="Enter Message..."
          placeholderTextColor={'#9c9c9c'}
          multiline
          numberOfLines={1}
        />
        {sendMessage && (
          <Ionicons
            onPress={handleSendMessage}
            name="send"
            size={23}
            color={'#2290ab'}
            style={{
              // padding: 5,
              paddingRight: 5,
            }}
          />
        )}
      </View>

      <ActiveMemberModal
        setVisible={setVisible}
        visible={visible}
        items={activeUser}
      />
    </SafeAreaView>
  );
};

export default ChatRoom;
