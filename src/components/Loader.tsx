import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React from 'react';
const Loader = props => {
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            // flex: 1,
            padding: 5,
            borderRadius: 50,
            elevation: 12,
            shadowColor: '#110942',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
          },
          Platform.OS === 'android' && {
            backgroundColor: '#fff',
          },
        ]}>
        <ActivityIndicator color={'#110942'} size="large" />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(17,9,66,0.4))',
  },
});
