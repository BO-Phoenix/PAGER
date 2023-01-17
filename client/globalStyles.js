import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#f0f',
  },
  header: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    height: '1',
  },
  headerText: {
    fontSize: 18,
    color: '#f0f',
  },
  footer: {
    backgroundColor: '#000',
    flex: 2,
    alignItems: 'center',
    height: '1',
  },
  footerText: {
    fontSize: 18,
    color: '#f0f',
  },
});

export default globalStyles;
