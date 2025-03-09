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
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    // paddingBottom: 20,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#218210',
    marginBottom: 20,
  },
  logoText: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: '#000',
    marginTop: 16,
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
});
