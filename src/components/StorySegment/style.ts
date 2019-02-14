import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: colors.nice,
    shadowOffset: { width: 50, height: 90 },
    shadowColor: colors.black,
    shadowOpacity: 0.8,
    borderBottomColor: colors.background2,
    elevation: 100,
  },
});
