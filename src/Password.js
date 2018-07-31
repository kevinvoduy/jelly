import React from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
 } from 'react-native';

export default class Password extends React.Component {
  static navigationOptions = ({ naviation }) => {
    return {
      title: 'Change Password',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    }
  }

  state = {
     password: '',
     visibility: true,
   }

   _passwordStrength = () => {
    const exellent = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})");
    const strong = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const medium = new RegExp("^(?=.*[a-z])(?=.{8,})");

    if (this.state.password.length === 0) {
      return;
    } else if (exellent.test(this.state.password)) {
      return <Text style={{color: 'forestgreen'}}>Excellent!</Text>
    } else if (strong.test(this.state.password)) {
      return <Text style={{color: 'dodgerblue'}}>Strong</Text>
    } else if (medium.test(this.state.password)) {
      return <Text style={{color: 'dodgerblue'}}>Moderate</Text>
    } else {
      return <Text style={{color: 'tomato'}}>Weak</Text>
    }
  }

  _renderVisibility = () => {
    if (this.state.visibility) {
      return <Text>Show</Text>;
    } else {
      return <Text>Hide</Text>;
    }
  }

  _toggleVisibilty = () => {
    this.setState({ visibility: !this.state.visibility });
  }

  render() {
    return(
      <View style={styles.container}>
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
          />
          <TouchableOpacity onPress={() => this._toggleVisibilty()}>
            {this._renderVisibility()}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text>Password Strength: </Text>
          <Text>{this._passwordStrength()}</Text>
        </View>
      </View>
    )
  }
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 48,
    fontWeight: '300',
  },
  passwordField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  input: {
    paddingVertical: 8,
    fontSize: 18,
  }
});