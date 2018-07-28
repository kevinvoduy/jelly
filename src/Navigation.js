import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';


import Discounts from './Discounts';
import Details from './Details';
import Explore from './Explore';

class Discount extends React.Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableBounce,
    title: 'Discounts',
  };

  render() {
    return <Discounts />;
  }
}

class ExploreMore extends React.Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableBounce,
    title: 'Explore',
    header: {
      visible: false,
    }
  };
  render() {
    return <Explore />
  }
}

class Detail extends React.Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableBounce,
    title: 'Explore',
    header: {
      visible: false,
    }
  };
  render() {
    return <Details />
  }
}


const ExploreStack = createStackNavigator({
  ExploreMore: Explore,
  Detail: Details,
  Discount: Discounts,
}, { headerMode: 'none' })

export default createBottomTabNavigator({
  Explore: ExploreStack,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Explore') {
        iconName = `ios-paper-plane${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarPosition: 'bottom',
})