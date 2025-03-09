import {FontFamily} from '@constants/font-family';
import {StyleSheet} from 'react-native';
// import {lightTheme} from '../../utils/styles/theme';
// import {ThemeColors} from '../../utils/theme-hook/useThemeColors';
// import {FontFamily} from '../../utils/constants/font-family';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  middleContainer: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 10,
  },
  footerContainer: {
    marginHorizontal: 10,
    borderRadius: 5,
    gap: 5,
    marginBottom: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: '#000',
    marginTop: 16,
  },
  btn: {
    height: 48,
    width: '70%',
    backgroundColor: '#d11b27',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
  },
  descText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: '#1e1e1e',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: '#eee',
  },

  textInput: {
    color: '#4e5152',
    fontFamily: FontFamily.regular,
    fontSize: 13,
    marginTop: 5,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#aed4a9',
    borderRadius: 5,
    padding: 10,
    color: '#000',
    marginVertical: 5,
  },

  subContainerBox: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    color: 'black',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
  },
  textDesc: {textAlign: 'center', marginTop: 15},
  inputContainerView: {flex: 1, marginHorizontal: 10, marginTop: 15},
  statsContainer: {
    marginTop: 20,
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalUserContainer: {
    flex: 1,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 6,
  },
  totalUserTxt: {
    fontSize: 19,
    fontFamily: FontFamily.semiBold,
    color: '#000',
  },
  totalUserTxtNo: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: '#000',
  },
  totalRoomsContainer: {
    flex: 1,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 6,
  },
  totalRoomNoTxt: {
    fontSize: 19,
    fontFamily: FontFamily.semiBold,
    color: '#000',
  },
  totalRoomTxt: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: '#000',
  },
  logout: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
});
