import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

export type StackNavigatorParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'HomeScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};
export default MainNavigation;
