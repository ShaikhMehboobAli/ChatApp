import {FontFamily} from '@constants/font-family';
import {createRoom} from '@utils/apis/PostApiCall';
import {routes} from '@utils/constants';
import {navigate} from '@utils/navigation';
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
} from 'react-native';
import Toast from 'react-native-toast-message';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

interface CustomModalProps {
  visible: boolean;
  setVisible: (e: boolean) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({setVisible, visible}) => {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
        console.log('helo', res);

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
              <Text style={styles.modalText}>Create A Room</Text>
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
                Room Name
              </Text>

              <TextInput
                value={name}
                placeholder="Enter room name"
                placeholderTextColor={'#a1a1a1'}
                onChangeText={setName}
                style={{
                  borderWidth: 0.6,
                  borderRadius: 5,
                  alignItems: 'center',
                  backgroundColor: '#f0f1f2',
                  height: 38,
                  fontSize: 13,
                  // paddingLeft: 5,
                  color: '#000',
                }}
              />
            </View>
            <TouchableOpacity
              disabled={loading}
              onPress={() => handleCreateRoom()}
              style={[
                styles.closeButton,
                !name && {backgroundColor: '#6d6e6d'},
              ]}>
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text style={styles.buttonText}>Add</Text>
              )}
            </TouchableOpacity>
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
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
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

export default CustomModal;
