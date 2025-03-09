import {FontFamily} from '@constants/font-family';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ChatBubble = ({item, userDetail}) => {
  const isMyMessage = item?.user_id === userDetail?.id;

  return (
    <View
      style={[
        styles.flex,
        isMyMessage
          ? {marginLeft: 'auto'}
          : {alignItems: 'flex-start', paddingRight: 15},
      ]}>
      {!isMyMessage && (
        <View style={styles.userFirstLetter}>
          <Text style={{color: '#cacccc'}}>{item?.username?.[0] || '?'}</Text>
        </View>
      )}

      <View
        style={[
          styles.chatContainer,
          isMyMessage ? styles.myself : styles.otherUser,
        ]}>
        {!isMyMessage && (
          <Text style={styles.userName}>{item?.username || ''}</Text>
        )}
        <Text style={styles.messageTxt}>{item?.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userFirstLetter: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#6d6d6e ',
    marginTop: 'auto',
    marginBottom: 5,
    marginRight: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    //
    backgroundColor: '#6d6d6e',
    marginBottom: 5,
    padding: 5,
  },
  otherUser: {
    borderWidth: 0.6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  myself: {
    borderWidth: 0.6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#147526',
    padding: 10,
  },
  userName: {
    fontSize: 11,
    fontFamily: FontFamily.semiBold,
    color: '#cccecf',
    // display:'none'
  },
  messageTxt: {
    color: '#fff',
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.3,
    marginTop: 3,
  },
});
