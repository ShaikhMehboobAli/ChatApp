import React from 'react';
import {StyleSheet, View} from 'react-native';

export const ChatPlaceHolder = () => {
  return (
    <View>
      <View style={[styles.commonStyle, {width: 160, marginTop: 10}]} />
      <View style={[styles.commonStyle, {width: 80}]} />
      <View style={[styles.commonStyle, {width: 90, marginLeft: 'auto'}]} />
      <View style={[styles.commonStyle, {width: 120}]} />
      <View style={[styles.commonStyle, {width: 130, marginLeft: 'auto'}]} />
      <View style={[styles.commonStyle, {width: 90, marginLeft: 'auto'}]} />
      <View style={[styles.commonStyle, {width: 60}]} />
      <View style={[styles.commonStyle, {width: 200}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  commonStyle: {
    height: 28,
    width: 60,
    backgroundColor: '#dfebdd',
    marginBottom: 5,
    borderRadius: 5,
  },
});
