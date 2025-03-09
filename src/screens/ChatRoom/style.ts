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
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 10,
  },

  btn: {
    height: 70,
    width: 70,
    backgroundColor: '#26751d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
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

  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
  },
  subContainerBox: {
    flex: 1,
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
});
