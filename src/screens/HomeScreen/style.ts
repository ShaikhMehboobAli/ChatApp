import {FontFamily} from '@constants/font-family';
import {StyleSheet} from 'react-native';

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
    alignItems: 'center',
    // paddingBottom: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    // justifyContent: 'center',
    gap: 5,
    marginBottom: 20,
    flex: 1,
  },
  logoText: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: '#000',
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
  userInfoMainContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  userInfoContainer: {
    justifyContent: 'center',
  },
  userInfo: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: '#000',
    textTransform: 'capitalize',
  },
  userInfoSub: {
    fontSize: 17,
    fontFamily: FontFamily.semiBold,
    color: '#000',
  },
  searchBarContainer: {
    flexDirection: 'row',
    borderWidth: 0.6,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#f0f1f2',
    height: 38,
  },
  searchBar: {flex: 1, marginLeft: 5, color: '#000'},
  cardContainer: {
    padding: 5,
    minHeight: 50,
    backgroundColor: '#f2f5f3',
    marginVertical: 2,
    borderWidth: 0.5,
    borderColor: '#c9c9c9',
    borderRadius: 5,
  },
  emptyText: {textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666'},
  cardSubContainer: {justifyContent: 'space-between', flex: 1},
  cardNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNameTxt: {
    color: '#000',
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
    textTransform: 'capitalize',
  },
  cardCreatedAt: {
    color: '#000',
    fontSize: 9,
    fontFamily: FontFamily.light,
    textTransform: 'lowercase',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  profileIcon: {
    backgroundColor: '#eee',
    borderRadius: 50,
    padding: 7,
    marginRight: 8,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  indicatorContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
});
