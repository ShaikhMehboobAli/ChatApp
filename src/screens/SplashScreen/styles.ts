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
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  logoText: {
    // fontFamily: FontFamily.jakartaBold,
    fontSize: 24,
    color: '#000',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    // fontFamily: FontFamily.bold,
  },
});
