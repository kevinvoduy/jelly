import React from 'react';
import {
  Animated,
  Dimensions,
  TextInput,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
 } from 'react-native';
 import { Ionicons } from '@expo/vector-icons';
 import picture from './images/user.jpeg';

 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ds.cloneWithRows([{name:'kevin'}]),
      scrollY: new Animated.Value(0),
    };
  }

  renderHeader() {
    return <View style={styles.header} />;
  }

  renderRow() {
    return (
      <View style={styles.settingsTab}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Kevin Vo</Text>
        <Text style={{fontSize: 16,}}>Los Angeles, California</Text>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <Text style={{fontSize: 16, marginRight: 12}}><Ionicons name='ios-happy-outline' size={24} color='#000' /></Text>
          <TextInput
            placeholder='Full Name'
            style={styles.inputs}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#000'
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 16, marginLeft: 3, marginRight: 16}}><Ionicons name='ios-pin-outline' size={24} color='#000' /></Text>
          <TextInput
            placeholder='Location'
            style={styles.inputs}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#000'
          />
        </View>

        <TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, marginRight: 15}}><Ionicons name='ios-cart-outline' size={24} color='#000' /></Text>
            <Text style={{fontSize: 16, paddingVertical: 8}}>Purchases</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, marginRight: 14}}><Ionicons name='ios-image-outline' size={24} color='#000' /></Text>
            <Text style={{fontSize: 16, paddingVertical: 8}}>Upload Image</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, marginRight: 12}}><Ionicons name='ios-close-circle-outline' size={24} color='tomato' /></Text>
            <Text style={{fontSize: 16, paddingVertical: 8}}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderScroll() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll= {
          Animated.event([{
            nativeEvent: { contentOffset: { y: this.state.scrollY }},
          }], {
            useNativeDriver: true,
          })
        }
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={picture}
          style={[styles.image, {
            transform: [{
              scale: this.state.scrollY.interpolate({
                inputRange: [-200, 0, 1],
                outputRange: [1.4, 1, 1],
              }),
            },
            {
              scale: this.state.scrollY.interpolate({
                inputRange: [0, 400],
                outputRange: [1.3, .91],
              }),
            },
            {
              translateY: this.state.scrollY.interpolate({
                inputRange: [0, 250],
                outputRange: [0, -110],
              }),
            }],
          }]}
        />

        <ListView
            dataSource={this.state.data}
            renderRow={this.renderRow.bind(this)}
            renderHeader={this.renderHeader.bind(this)}
            renderScrollComponent={this.renderScroll.bind(this)}
          />
      </View>
    )
  }
};

const Screen = Dimensions.get('window');
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: Screen.width,
    height: Screen.width / 750 * 1150,
    position: 'absolute',
  },
  settingsTab: {
    backgroundColor: '#fff',
    width: Screen.width,
    borderWidth: 1,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderColor: '#fff',
    paddingHorizontal: 30,
    paddingBottom: 38,
    paddingTop: 28,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: .4,
    shadowRadius: 12,
  },
  header: {
    paddingTop: Screen.height - Screen.height / 5,
  },
  inputs: {
    fontSize: 16,
    paddingVertical: 8,
    width: '100%',
  },
})