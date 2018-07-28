import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Navigation from './Navigation';

export default class Home extends React.Component {
  static navigationOptions = {
    headerMode: 'screen'
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation onLogoutPress={() => this.setState({isLoggedIn: false })}  />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45,
    width: '100%',
  }
});