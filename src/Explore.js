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
import food from './json/food-drink.json';
import local from './json/los-angeles.json';
import retail from './json/retail.json';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Explore extends React.Component {
  static navigationOptions = {
    title: 'Explore',
    header: null,
  };
  constructor() {
    super();
    this.state = {
      food: ds.cloneWithRows(food.deals),
      retail: ds.cloneWithRows(retail.deals),
      local: ds.cloneWithRows(local.deals),
      scrollX: new Animated.Value(0),
    };
  }

  renderRow(row) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Detail', { data: row, title: row.title })}>
        <View style={{flex: 1}}>
          <Image
            resizeMode='contain'
            source={{uri: row.largeImageUrl}}
            style={{
              width: '100%',
              height: '100%',
              marginRight: 8,
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Explore</Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
          <Text style={styles.subHeading}>Bonuses</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Discount', { category: 'Bonuses'})}>
            <Text style={{fontSize: 14, color: 'gray'}}>See All</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.food}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{flex: 1}}
          horizontal={true}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
          <Text style={styles.subHeading}>Cashbacks</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Discount', { category: 'Cashbacks'})}>
            <Text style={{fontSize: 14, color: 'gray'}}>See All</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.retail}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{flex: 1}}
          horizontal={true}
        />

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
          <Text style={styles.subHeading}>Local</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Discount', { category: 'Local'})}>
            <Text style={{fontSize: 14, color: 'gray'}}>See All</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.local}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          style={{flex: 1}}
          horizontal={true}
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
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  card: {
    // height: 144,
    width: 330,
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
    backgroundColor: 'white',
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
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
