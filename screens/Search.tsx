import React from 'react';
import {SafeAreaView} from 'react-native';
import SearchInput from '../components/SearchInput';
import {searchFlickrAPI} from '../redux/reducers/SearchReducer';
import {RootState, useAppDispatch} from '../redux/store';
import {NavigationProp} from '@react-navigation/native';
import {StackNavigatorParams} from '../navigation/MainNavigation';
import {useSelector} from 'react-redux';

interface Props {
  navigation: NavigationProp<StackNavigatorParams>;
}

const Search: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const searchState = useSelector((state: RootState) => state.search);
  async function handleSearch(val: string) {
    console.log(val);
    await searchFlickrAPI(val, dispatch, false);
    navigation.goBack();
    //dispatch action which will update search value and also do the query to the API
  }
  return (
    <SafeAreaView>
      <SearchInput onSearch={handleSearch} value={searchState.search} />
    </SafeAreaView>
  );
};

export default Search;
