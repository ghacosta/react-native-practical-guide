import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import AuthLoadingScreen from './src/screens/AuthLoading/AuthLoading';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import CustomDrawer from './src/components/CustomDrawer/CustomDrawer';
import configureStore from './src/store/configureStore';

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

const AppTabNavigator = createBottomTabNavigator(
  {
    FindPlace: {
      screen: FindPlaceStack,
      navigationOptions: {
        tabBarLabel: 'Find Place',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-map" size={30} color={tintColor} />
        )
      }
    },
    SharePlace: {
      screen: SharePlaceStack,
      navigationOptions: {
        tabBarLabel: 'Share Place',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-share-alt" size={30} color={tintColor} />
        )
      }
    }
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

const AppStackNavigator = createStackNavigator(
  {
    AppTabNavigator: AppTabNavigator
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

const AppDrawerNavigator = createDrawerNavigator(
  {
    Places: {
      screen: AppStackNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-paper" size={30} color={tintColor} />
        )
      }
    },
    Auth: {
      screen: AuthScreen,
      params: { token: null },
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-log-out" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    contentComponent: CustomDrawer,
    contentOptions: {
      activeTintColor: '#EC734D'
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading: { screen: AuthLoadingScreen },
  Auth: { screen: AuthScreen },
  App: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const store = configureStore();

export default (RootComponent = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
