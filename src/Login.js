import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={require('./images/join-landing.png')}
          style={styles.background}
          resizeMode='cover'
        />
        <KeyboardAvoidingView style={styles.login} behavior="padding" enabled>

          <View style={{flex: 3}}>
            <Text style={styles.title}>PeanutButter</Text>
            <Text style={styles.tagline}>Save without the fuss</Text>
          </View>

          <View style={{flex: 1}}>
            <TextInput
              placeholder='Username'
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
            />
            <TextInput
              placeholder='Password'
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
            />

            <Button
              onPress={this.props.onLoginPress}
              title='Submit'
              color='black'
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const Screen = Dimensions.get('window');
const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    paddingTop: 180,
    color: '#fff',
  },
  tagline: {
    fontSize: 20,
    paddingBottom: 240,
    color: '#fff',
  },
  input: {
    paddingHorizontal: 6,
    fontSize: 18,
    marginBottom: 8,
    width: 300,
  },
  background: {
    width: Screen.width,
    height: Screen.width / 750 * 1150,
    position: 'absolute',
  },
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});