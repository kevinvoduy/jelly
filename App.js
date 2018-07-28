import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Login from './src/Login';
import Home from './src/Home';

export default class App extends React.Component {
  state = {
    isLoggedIn: false,
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Login onLoginPress={() => this.setState({isLoggedIn: true })} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Home onLogoutPress={() => this.setState({isLoggedIn: false })} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
