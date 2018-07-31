import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
 } from 'react-native';
 import { Ionicons } from '@expo/vector-icons';
 import cards from './json/cards.json';

 export default class Credit extends React.Component {
    state = {
      cards: cards.data,
      scrollY: new Animated.Value(0),
      fullname: null,
      last4: null,
      expiration: null,
      number: null,
    }

   static navigationOptions = ({ naviation }) => {
     return {
      title: 'Credit Cards',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
    }
  }

  _addCard() {
    if (this.state.fullname && this.state.number) {
      this.setState({
        cards: [...this.state.cards, {
          id: this.state.number.toString().slice(this.state.number.length - 4),
          fullname: this.state.fullname,
          last4: this.state.number.toString().slice(this.state.number.length - 4),
          expiration: this.state.expiration,
        }]
      })
      this.setState({
        id: null,
        fullname: null,
        last4: null,
        expiration: null,
      })
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderRow = ({item}) =>  (
      <TouchableOpacity style={styles.card} activeOpacity={.7}>
        <Text style={{color: '#fff', marginBottom: 16, fontSize: 24}}>
          {item.issuer}
        </Text>

        <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
          **** **** **** {item.last4}
        </Text>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={{color: '#fff', fontSize: 12}}>
            EXPIRES
          </Text>
          <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
            {item.expiration}
          </Text>
        </View>
      </TouchableOpacity>
  )

  _renderScroll = () => (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll= {
        Animated.event([{
          nativeEvent: { contentOffset: { y: this.state.scrollY }},
        }], {
          useNativeDriver: true,
        })
      }
      horizontal={true}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='dark-content'
        />
        <Text style={styles.header}>
          My Cards
        </Text>

        <FlatList
          data={this.state.cards}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          renderScrollComponent={this._renderScroll}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />

        <View style={{flexDirection: 'row', height: 28, alignItems: 'center'}}>
          <View style={{
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            paddingTop: 2,
            width: width / 3,
            }}
          />
          <Text style={{marginHorizontal: 16}}>
            or
          </Text>
          <View style={{
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            paddingTop: 2,
            width: width / 3,
            }}
          />
        </View>

        <View>
          <Text style={{alignSelf: 'center', paddingVertical: 8, fontWeight: 'bold'}}>
            Add New Card
          </Text>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={[
                styles.scanCard, {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }
              ]}
              activeOpacity={.7}
            >
              <Text style={{paddingRight: 12, color: '#fff'}}>
                Scan Card
              </Text>
              <Ionicons name='ios-camera-outline' size={28} color='#fff' />
            </TouchableOpacity>
          </View>


            <Text style={styles.inputLabel}>
              Name On Card
            </Text>
            <TextInput
              placeholder={'e.g. John Doe'}
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              onChangeText={(fullname) => this.setState({fullname})}
            />

            <Text style={styles.inputLabel}>
              Card Number
            </Text>
            <TextInput
              placeholder={'1234 5678 9012 3456'}
              style={styles.input}
              underlineColorAndroid='rgba(0,0,0,0)'
              onChangeText={(number) => this.setState({number})}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text>
                  CVV
                </Text>
                <TextInput
                  placeholder={'856'}
                  style={[styles.input, {width: width / 3 }]}
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
              </View>

              <View>
                <Text>
                  Expires
                </Text>
                <TextInput
                  placeholder={'2022'}
                  style={[styles.input, {width: width / 3 }]}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  onChangeText={(expiration) => this.setState({expiration})}
                />
              </View>
            </View>
        </View>

        <TouchableOpacity activeOpacity={.7} onPress={() => this._addCard() }>
          <Text style={styles.addCard}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
 }

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
    flex: 1,
  },
  header: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 36,
    marginLeft: 20,
    marginTop: 0,
    paddingTop: 0,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'slateblue',
    borderRadius: 16,
    height: height / 5,
    width: height / 5 * 1.7,
    justifyContent: 'flex-end',
    marginLeft: 20,
    marginVertical: 20,
    padding: 16,
    overflow: 'hidden',
  },
  scanCard: {
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    marginBottom: 20,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  input: {
    backgroundColor: '#f3f3f3',
    marginVertical: 4,
    padding: 8,
    width: width * .75,
  },
  addCard: {
    alignSelf: 'center',
    backgroundColor: 'mediumaquamarine',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'mediumaquamarine',
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 80,
    marginVertical: 16,
    overflow: 'hidden',
   },
 })