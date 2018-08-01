import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';


import Discounts from './Discounts';
import Details from './Details';
import Explore from './Explore';
import Profile from './Profile';
import Credit from './Credit';
import Password from './Password';

class Discount extends React.Component {
  render() {
    return <Discounts />;
  }
}

class ExploreMore extends React.Component {
  render() {
    return <Explore />
  }
}

class Detail extends React.Component {
  render() {
    return <Details />
  }
}

class ProfileScreen extends React.Component {
  render() {
    return <Profile />
  }
}

class CreditScreen extends React.Component {
  render() {
    return <Credit />
  }
}

class PasswordScreen extends React.Component {
  render() {
    return <Password />
  }
}

const ProfileStack = createStackNavigator({
  ProfileScreen: Profile,
  PasswordScreen: Password,
  CreditScreen: Credit,
})

const ExploreStack = createStackNavigator({
  ExploreMore: Explore,
  Detail: Details,
  Discount: Discounts,
})

export default createBottomTabNavigator({
  Profile: ProfileStack,
  Explore: ExploreStack,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Explore') {
        iconName = `ios-paper-plane${focused ? '' : '-outline'}`;
      } else if (routeName === 'Profile') {
        iconName = `ios-planet${focused ? '' : '-outline'}`;
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