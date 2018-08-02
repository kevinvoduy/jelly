import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
 } from 'react-native';
 import { Ionicons } from '@expo/vector-icons';

export default class Password extends React.Component {
  static navigationOptions = {
    title: 'Change Password',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
  }

  state = {
    password: '',
    visibility: true,
    test1: false,
    test2: false,
    test3: false,
  }

  _pwTest1 = () => {
    const test1 = this.state.password.length >= 4 ? true : false;
    const icon = `ios-checkmark-circle${test1 ? '' : '-outline'}`;
    const tint = `${test1 ? 'green' : '#000'}`;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 12, marginTop: 30}}>
        <Text style={{fontSize: 14, marginRight: 8}}>
          <Ionicons name={icon} size={24} color={tint} />
        </Text>
        <Text style={{ color: tint, fontSize: 14 }}>Must not contain your name or email</Text>
      </View>
    )
  }

  _pwTest2 = () => {
    const test2 = this.state.password.length >= 8 ? true : false;
    const icon = `ios-checkmark-circle${test2 ? '' : '-outline'}`;
    const tint = `${test2 ? 'green' : '#000'}`;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 12}}>
        <Text style={{fontSize: 14, marginRight: 8}}>
          <Ionicons name={icon} size={24} color={tint} />
        </Text>
        <Text style={{ color: tint, fontSize: 14 }}>Contain at least 8 characters</Text>
      </View>
    )
  }

  _pwTest3 = () => {
    const test3 = strong.test(this.state.password);
    const icon = `ios-checkmark-circle${test3 ? '' : '-outline'}`;
    const tint = `${test3 ? 'green' : '#000'}`;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 12}}>
        <Text style={{fontSize: 14, marginRight: 8}}>
          <Ionicons name={icon} size={24} color={tint} />
        </Text>
        <Text style={{ color: tint, fontSize: 14 }}>Contains a symbol and a number</Text>
      </View>
    )
  }

  _passwordStrength = () => {
    if (this.state.password.length === 0) {
      return;
    } else if (exellent.test(this.state.password)) {
      return <Text style={{color: 'green'}}>Excellent!</Text>;
    } else if (strong.test(this.state.password)) {
      return <Text style={{color: 'dodgerblue'}}>Strong</Text>;
    } else if (medium.test(this.state.password)) {
      return <Text style={{color: 'dodgerblue'}}>Moderate</Text>;
    } else {
      return <Text style={{color: 'tomato'}}>Weak</Text>;
    }
  }

  _renderVisibility = () => {
    if (this.state.visibility) {
      return <Text style={{ color: '#9d9d9d' }}>Show</Text>;
    } else {
      return <Text style={{ color: '#9d9d9d' }}>Hide</Text>;
    }
  }

  _toggleVisibilty = () => {
    this.setState({ visibility: !this.state.visibility });
  }

  render() {
    return(
      <KeyboardAvoidingView style={styles.container} behavior={'padding'} enabled>
        <Text style={styles.header}>
          Create your password
        </Text>

        <View style={styles.passwordField}>
          <TextInput
            placeholder={'New Password'}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(password) => this.setState({password})}
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={this.state.visibility}
            textContentType={'password'}
            placeholderTextColor={'#9d9d9d'}
          />
          <TouchableOpacity onPress={() => this._toggleVisibilty()}>
            {this._renderVisibility()}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', paddingVertical: 8}}>
          <Text style={{ fontSize: 14, color: '#9d9d9d' }}>
            {'Password Strength: '}
              </Text>
          <Text style={{ fontSize: 14 }}>
            {this._passwordStrength()}
          </Text>
        </View>

        {this._pwTest1()}
        {this._pwTest2()}
        {this._pwTest3()}

      </KeyboardAvoidingView>
    )
  }
};

// password regex
const exellent = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})");
const strong = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const medium = new RegExp("^(?=.*[a-z,A-Z])(?=.{8,})");

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 48,
    fontWeight: '500',
  },
  passwordField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  input: {
    fontSize: 18,
    marginTop: 8,
    paddingVertical: 12,
    width: width * .75,
  }
});