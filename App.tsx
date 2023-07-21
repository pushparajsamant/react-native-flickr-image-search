/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux/store';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import MainNavigation from './navigation/MainNavigation';
import Home from './screens/Home';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  //const dispatch = useAppDispatch();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // useEffect(() => {
  //   searchFlickrAPI('test', dispatch);
  // }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
