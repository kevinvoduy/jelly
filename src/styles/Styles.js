import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  heading: {
    fontSize: 36,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  card: {
    height: 200,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowOffset:{
      width: 0,
      height: 6,
    },
    shadowColor: 'black',
    shadowOpacity: .2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: 'black',
    fontSize: 30
  }
})

export default styles;