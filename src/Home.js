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
      <Navigation onLogoutPress={() => this.setState({isLoggedIn: false })}  />
    )
  }
};