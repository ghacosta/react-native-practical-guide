import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import DashboardScreen from './src/screens/Dashboard/Dashboard';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import configureStore from './src/store/configureStore';
import { Ionicons } from '@expo/vector-icons';

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FindPlace: { screen: FindPlaceScreen },
    SharePlace: { screen: SharePlaceScreen }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
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
