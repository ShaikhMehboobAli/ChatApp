import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {goBack} from '@utils/navigation';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showErrorToast, showSuccessToast} from '@utils/toaster/Alerts';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {fetchMessageList} from '@utils/redux/actions/authActions';
import {MESSAGE_LIST} from '@utils/redux/types';
import ActiveMemberModal from '@components/ActiveMemberModal';
import {ChatBubble} from '@components/ChatBubble';
import {ChatPlaceHolder} from '@components/ChatPlaceHolder';

const UNABLE_TO_CONNECT =
  'Unable to connect to the chat server. Please try again later.';
const NETWORK_ERROR =
  'Network error: Unable to connect to the chat server. Please check your internet connection.';
const RETRYING_WEBHOOK = 'WebSocket encountered an error. Retrying...';
const HAS_JOINED = 'has joined the chat.';
const MEMBER_JOINED = 'New Member joined ';
const HAD_LEFT = 'has left the chat.';
const MEMBER_LEFT = 'A member left ';
const CHAR_SERVER = 'Chat server is disconnected. Please try again.';

const ChatRoom = props => {
  const {params} = useRoute();
  const id: any = params?.id || '';
  const roomDetail: any = params?.roomDetail;
  const [sendMessage, setSendMessage] = useState<string>('');
  const ws: any = useRef(null);
  const dispatch = useDispatch();
  const {messageList, messageListLoading, userDetail} = useSelector(
    (state: {auth: any}) => state.auth,
  );
  const [allMessages, setAllMessages] = useState<Array<any>>([]);
  const [visible, setVisible] = useState(false);
  const [activeUser, setActiveUser] = useState([]);

  let retryCount = 0;
  const maxRetries = 5;

  useEffect(() => {
    joinRoom();
    return () => {
      if (ws.current) {
        // console.log('Closing WebSocket for user:');
        ws.current.close();
        // ws.current = null;
        dispatch({
          type: MESSAGE_LIST,
          data: [],
        });
      }
    };
  }, [id]);

  const connectWebSocket = id => {
    retryCount++;

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // console.log('WebSocket is already connected.');
      return;
    }

    if (retryCount >= maxRetries) {
      // console.error('Max reconnection attempts reached.');
      showErrorToast({
        message: UNABLE_TO_CONNECT,
      });
      return;
    }

    ws.current = new WebSocket(
      `wss://chat-api-k4vi.onrender.com/ws/${id}/${userDetail.username}`,
    );

    ws.current.onopen = () => {
      // console.log('WebSocket connection established.');
      retryCount = 0;
    };

    ws.current.onclose = () => {
      // console.log('WebSocket connection closed.');
      retryCount++;
      if (retryCount < maxRetries) {
        setTimeout(() => connectWebSocket(id), 5000);
      }
    };

    ws.current.onerror = error => {
      // console.error('WebSocket error:', error.message);
      if (error.message?.includes('Unable to resolve host')) {
        showErrorToast({
          message: NETWORK_ERROR,
        });
      } else {
        if (retryCount === 1) {
          Alert.alert(RETRYING_WEBHOOK);
        }
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(() => connectWebSocket(id), 5000);
        }
      }
    };

    ws.current.onmessage = event => {
      const newMessage = JSON.parse(event.data);

      setActiveUser(newMessage?.users);
      switch (newMessage.event) {
        case 'join': {
          if (newMessage.username !== userDetail.username) {
            showSuccessToast({
              message: `${newMessage.username} ${HAS_JOINED}`,
              subTitle: MEMBER_JOINED + roomDetail.name,
            });
          }
          break;
        }
        case 'leave': {
          if (newMessage.username !== userDetail.username) {
            showSuccessToast({
              message: `${newMessage.username} ${HAD_LEFT}`,
              subTitle: MEMBER_LEFT + roomDetail.name,
            });
          }
          break;
        }
        case 'message': {
          // console.log('New message:', newMessage?.message?.username);
          if (newMessage?.message?.username !== userDetail?.username) {
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
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      showErrorToast({
        message: CHAR_SERVER,
      });
      return;
    }
    if (sendMessage && sendMessage.trim() !== '') {
      const newMessage = {
        id: allMessages[0]?.id + 1 || 1,
        content: sendMessage.trim(),
        event: 'message',
        username: userDetail?.username,
        user_id: userDetail?.id,
        created_at: new Date().toISOString().split('.')[0],
      };

      try {
        ws.current.send(JSON.stringify(newMessage));
        setAllMessages(prev => [newMessage, ...prev]);
        setSendMessage('');
        // console.log('Message sent:', newMessage);
      } catch (error) {
        showErrorToast({message: 'Failed to send message. Try again.'});
      }
    }
  };

  const joinRoom = async () => {
    connectWebSocket(id);
    dispatch(fetchMessageList(id));
  };

  const renderItem = useCallback(
    ({item}: any) => <ChatBubble item={item} userDetail={userDetail} />,
    [userDetail],
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={[styles.subContainer, {backgroundColor: '#ebebeb'}]}>
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
          style={styles.activeUserBtn}>
          <Text style={styles.activeUserTxt}>{activeUser?.length || 0}</Text>
          <Ionicons name="radio-button-on" size={13} color={'#0f8c26'} />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        {messageListLoading ? (
          <View style={{flex: 1}}>
            <ChatPlaceHolder />
          </View>
        ) : (
          <FlatList
            data={allMessages}
            inverted
            keyExtractor={item => item?.id?.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
      <View style={styles.messageInputTextContainer}>
        <TextInput
          value={sendMessage}
          onChangeText={setSendMessage}
          style={styles.messageInputTxt}
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
            style={styles.icon}
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
