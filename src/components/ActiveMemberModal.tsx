import {FontFamily} from '@constants/font-family';
import {createRoom} from '@utils/apis/PostApiCall';
import {showErrorToast} from '@utils/toaster/Alerts';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

interface CustomModalProps {
  visible: boolean;
  setVisible: (e: boolean) => void;
  items: Array<string>;
}

const ActiveMemberModal: React.FC<CustomModalProps> = ({
  setVisible,
  visible,
  items,
}) => {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {roomList, userDetail} = useSelector(
    (state: {auth: any}) => state.auth,
  );

  useEffect(() => {
    setName('');
  }, [visible]);

  const handleCreateRoom = () => {
    if (!name.trim()) {
      showErrorToast({message: 'Please enter room name'});
      return;
    } else if (name.trim().length < 3) {
      showErrorToast({message: 'Room name must be more then 3 character'});
      return;
    }
    setLoading(true);
    const payload = {
      name,
    };
    createRoom(payload, dispatch)
      .then(res => {
        setVisible(false);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Text style={styles.modalText}>Active Members</Text>
              <Ionicons
                onPress={() => setVisible(false)}
                name="close-circle"
                size={25}
                color={'#000'}
              />
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: FontFamily.medium,
                  fontSize: 12,
                }}>
                Members
              </Text>
              <FlatList
                style={{maxHeight: 0.5 * Dimensions.get('screen').height}}
                data={items}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: '#d1ded3',
                      marginBottom: 4,
                      paddingVertical: 5,
                      paddingHorizontal: 2,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 13,
                        fontFamily: FontFamily.regular,
                      }}>
                      {item} {item === userDetail?.username && '(Me)'}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <Toast />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  openButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 0.9 * Dimensions.get('screen').width,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    maxHeight: 0.7 * Dimensions.get('screen').height,
    // alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 30,
    backgroundColor: '#0e631f',
    padding: 10,
    borderRadius: 8,
  },
});

export default ActiveMemberModal;
