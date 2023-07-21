import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Search from '../screens/Search';

export type StackNavigatorParams = {
  Home: undefined;
  Search: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null}}
      initialRouteName={'Home'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
export default MainNavigation;
