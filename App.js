import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import configureStore from './src/store/configureStore';
import { Ionicons } from '@expo/vector-icons';

const FindPlaceStack = createStackNavigator(
  {
    FindPlace: {
      screen: FindPlaceScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Find Place',
          headerLeft: (
            <Ionicons
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        };
      }
    },
    PlaceDetail: { screen: PlaceDetailScreen }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const SharePlaceStack = createStackNavigator({
  SharePlace: {
    screen: SharePlaceScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Share Place',
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FindPlaceStack,
    SharePlaceStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStackNavigator }
});

const AppSwitchNavigator = createSwitchNavigator({
  Auth: { screen: AuthScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const store = configureStore();

export default (RootComponent = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
