import React from 'react';
import {
  Image,
  View,
  Text,
  ListView,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
 } from 'react-native';
import bonus from './json/food-drink.json';
import cashback from './json/retail.json';
import local from './json/los-angeles.json';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Discounts extends React.Component {
  state = {
    Bonuses: ds.cloneWithRows(bonus.deals),
    Cashbacks: ds.cloneWithRows(cashback.deals),
    Local: ds.cloneWithRows(local.deals),
    scrollY: new Animated.Value(0),
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fff',
    },
    title: 'Discounts'
  }

  renderRow(row) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Detail', { data: row })}>
        <View style={{flex: 1}}>
          <Image
            resizeMode='contain'
            source={{uri: row.largeImageUrl}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 15,
            }}
          />
        </View>

        <View style={styles.details}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{row.shortAnnouncementTitle}</Text>
          <Text style={{fontSize: 56, fontWeight: 'bold', color: '#fff'}}>{row.options[0].discountPercent}%</Text>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>{row.announcementTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderHeader() {
    return <View style={styles.header} />;
  }

  renderScroll(props) {
    return (
      <Animated.ScrollView
        {...props}
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
            style={[styles.backgroundImage, {
              opacity: this.state.scrollY.interpolate({
                inputRange: [0, 250],
                outputRange: [1, 0],
              }),
              transform: [{
                scale: this.state.scrollY.interpolate({
                  inputRange: [-200, 0, 1],
                  outputRange: [1.4, 1, 1],
                }),
              },
              {
                translateY: this.state.scrollY.interpolate({
                  inputRange: [0, 250],
                  outputRange: [0, -60],
                }),
              }],
            }]}
            source={require('./images/slate.png')}
          />

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 16 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 8 }}>Special Offers</Text>
            <View style={{ backgroundColor: 'dodgerblue', borderRadius: 8, borderWidth: 1, borderColor: 'dodgerblue', overflow: 'hidden', width: 16, height:  16, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>4</Text>
            </View>
          </View>
          <View>
            <Text>Global</Text>
          </View>
        </View>

        <ListView
          dataSource={this.state[this.props.navigation.getParam('category')]}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          renderScrollComponent={this.renderScroll.bind(this)}
        />
      </View>
    );
  }
};

const Screen = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 36,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
    paddingLeft: 12,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  backgroundImage: {
    width: Screen.width,
    height: Screen.width / 750 * 1364,
    position: 'absolute',
  },
  header: {
    height: 0,
  },
  card: {
    height: 180,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: '#000',
    shadowOffset:{
      width: 0,
      height: 6,
    },
    shadowColor: 'black',
    shadowOpacity: .2,
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});