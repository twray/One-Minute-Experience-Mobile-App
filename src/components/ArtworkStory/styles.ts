import { StyleSheet, Platform, Dimensions } from 'react-native';

export default StyleSheet.create({
  Card: {
    backgroundColor: 'white',
    minHeight: Dimensions.get('screen').height * 0.6,
    borderRadius: 5,
  },
  CardContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  CardHeader: {
    flex: 2,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  CardTextHeadingWrapper: {
    fontSize: 23,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  MediumText: { fontFamily: 'SFCompact-Medium' },
  LightText: { fontFamily: 'SFCompact-Light' },
  NameAndNationality: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 19,
    fontFamily: 'SFCompact-Light',
  },
  HrWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  Hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '33%',
  },
  TextWrapper: { flex: 4, width: '90%' },
  TextView: {
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'SFCompact-Light',
  },
  ImageStyle: {
    flex: 1,
    resizeMode: 'cover',
  },
  ImageView: { flex: 4, overflow: 'hidden' },
  ViewBoxContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  CarouselContainer: { flex: 1, marginBottom: 100, marginTop: 100 },
});
