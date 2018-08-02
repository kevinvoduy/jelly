import React from 'react';
import {
  Animated,
  ListView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import food from './json/food-drink.json';
import local from './json/los-angeles.json';
import retail from './json/retail.json';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Explore extends React.Component {
  constructor() {
    super()
    this.state = {
      food: ds.cloneWithRows(food.deals),
      retail: ds.cloneWithRows(retail.deals),
      local: ds.cloneWithRows(local.deals),
      scrollX: new Animated.Value(0),
    }
  }

  static navigationOptions = {
    title: 'Explore',
    header: null,
  }

  renderRow(row) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.card} onPress={() => this.props.navigation.navigate('Detail', { data: row, title: row.title })}>
          <View style={{flex: 1, flexDirection: 'row',}}>
            <View style={{flex: 2, padding: 18, justifyContent: 'flex-end'}}>
              <Text style={{fontWeight: 'bold'}}>
                {row.shortAnnouncementTitle}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{color: 'gray', marginTop: 8}}>
                    Redeem At
                  </Text>
                  <Text>
                    {row.redemptionLocation}
                  </Text>
                </View>

                <View>
                  <Text style={{color: 'gray', marginTop: 8}}>
                    Price
                  </Text>
                  <Text>
                    {row.options[0].price.formattedAmount}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flex: 1, borderTopRightRadius: 15, borderBottomRightRadius: 15, overflow: 'hidden' }}>
              <Image
                resizeMode='contain'
                source={{uri: row.largeImageUrl}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  position: 'absolute',
                }}
              />
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.4)', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Up to</Text>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#fff'}}>
                  {row.options[0].discountPercent}%
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff'}}>off!</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.secondaryCard}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('Detail', { data: row, title: row.title })}>
            <Text style={{marginRight: 12}}>
              View
            </Text>
            <Text>
              <Ionicons name='ios-open-outline' size={18} color={'indigo'} />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 12}}>
              Bookmark
            </Text>
            <Text>
              <Ionicons name='ios-bookmark-outline' size={18} color={'crimson'} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderHeader() {
    return <View style={styles.header} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./images/slate.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            width: Screen.width,
            height: Screen.height,
            position: 'absolute',
          }}
        />
        <Text style={styles.heading}>
          Explore
        </Text>

        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
          <Text style={styles.subHeading}>Bonuses</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Discount', { category: 'Bonuses'})}>
            <Text style={{fontSize: 14, color: '#f9f9f9'}}>See All</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.food}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{flex: 1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
          <Text style={styles.subHeading}>Cashbacks</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Discount', { category: 'Cashbacks'})}>
            <Text style={{fontSize: 14, color: '#f9f9f9'}}>See All</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.retail}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{flex: 1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
          <Text style={styles.subHeading}>Local Deals</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Discount', { category: 'Local'})}>
            <Text style={{fontSize: 14, color: '#f9f9f9'}}>See All</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.local}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{flex: 1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
};

const Screen = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: Screen.width,
    flex: 1,
    backgroundColor: 'dodgerblue',
    paddingTop: 50,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#fff'
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#fff'
  },
  card: {
    height: Screen.height / 6,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 2,
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 4,
    shadowOffset:{
      width: 0,
      height: 6,
    },
    shadowColor: 'black',
    shadowOpacity: .2,
    width: 330,
  },
  secondaryCard: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 1,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'space-evenly',
    shadowOffset:{
      width: 0,
      height: 4,
    },
    shadowColor: 'black',
    shadowOpacity: .2,
    width: 290,
    zIndex: -1,
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
});

// <View style={styles.details}>
//   <Text style={{color: '#fff', fontWeight: 'bold'}}>{row.shortAnnouncementTitle}</Text>
//   <Text style={{fontSize: 56, fontWeight: 'bold', color: '#fff'}}>{row.options[0].discountPercent}%</Text>
//   <Text style={{color: '#fff', fontWeight: 'bold'}}>{row.announcementTitle}</Text>
// </View>