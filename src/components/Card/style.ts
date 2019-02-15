import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  card: {
    flex: 1,
    margin: 60,
    bottom: 100,
    height: 'auto',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background2,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  image: {
    backgroundColor: colors.nice,
    flex: 1,
  },
  info: {
    flex: 1,
  },
});
