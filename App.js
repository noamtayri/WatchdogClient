import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './components/HomeScreen/HomeScreen';
import DetailsScreen from './components/DetailsScreen/DetailsScreen';
import PredictScreen from './components/PredictScreen/PredictScreen';
import ActivityScreen from './components/ActivityScreen/ActivityScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Predict: PredictScreen,
    Activity: ActivityScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}