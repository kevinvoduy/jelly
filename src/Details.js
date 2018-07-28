import React from 'react';
import {
  Alert,
  Animated,
  Button,
  Dimensions,
  ListView,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const Screen = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Details extends React.Component {
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
    const data = this.props.navigation.getParam('data');

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.hlHeader}>
            <Text style={styles.highlight}>Limited Time Remaining!</Text>
            <Text style={styles.highlight}>Up to {data.options[0].discountPercent}% off!</Text>
          </View>

        <View style={styles.hlHeader}>
          <Text style={styles.highlight}>{data.shortAnnouncementTitle}</Text>
          <View>
            <Text style={styles.highlight}>Now {data.options[0].price.formattedAmount}</Text>
            <Text style={styles.highlightRed}>{data.options[0].discountPercent}% OFF</Text>
          </View>
        </View>

        <View style={styles.blurb}>
          <Text style={styles.blurbHeader}>Highlights</Text>
          <Text style={styles.blurbDetail}>{data.title}</Text>
        </View>

        <View style={styles.blurb}>
          <Text style={styles.blurbHeader}>About this deal</Text>
          <Text style={styles.blurbDetail}>{data.finePrint}</Text>
        </View>

        <View style={styles.blurb}>
          <Text style={styles.blurbHeader}>Fine print</Text>
          <Text style={styles.blurbDetail}>{data.finePrint}</Text>
        </View>
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
    const data = this.props.navigation.getParam('data');
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Animated.Image
            style={[styles.backgroundImage, {
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
            source={{uri: data.largeImageUrl}}
          />

          <ListView
            dataSource={this.state.data}
            renderRow={this.renderRow.bind(this)}
            renderHeader={this.renderHeader.bind(this)}
            renderScrollComponent={this.renderScroll.bind(this)}
          />
        </View>

        <Button
          title='Buy'
          onPress={() => Alert.alert('Purchased', 'No take backs!')}
          color='tomato'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: Screen.width,
    height: Screen.width / 750 * 450,
    position: 'absolute',
  },
  hlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingBottom: 8,
    paddingTop: 8,
  },
  highlight: {
    width: 140,
    textAlign: 'center',
    alignItems: 'center',
  },
  highlightRed: {
    backgroundColor: 'salmon',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'salmon',
    overflow: 'hidden',
  },
  blurb: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  blurbHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  blurbDetail: {
    paddingBottom: 8,
  },
  header: {
    height: 240,
  },
});
