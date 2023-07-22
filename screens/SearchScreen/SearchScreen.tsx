import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import SearchInput from '../../components/SearchInput/SearchInput';
import {
  clearSearchTerm,
  deleteSearchItem,
  searchFlickrAPI,
} from '../../redux/reducers/SearchReducer';
import {RootState, useAppDispatch} from '../../redux/store';
import {NavigationProp} from '@react-navigation/native';
import {StackNavigatorParams} from '../../navigation/MainNavigation';
import {useSelector} from 'react-redux';
import SearchItem from '../../components/SearchItem/SearchItem';

interface Props {
  navigation: NavigationProp<StackNavigatorParams>;
}

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const searchState = useSelector((state: RootState) => state.search);
  async function handleSearch(val: string) {
    console.log(val);
    navigation.goBack();
    //dispatch action which will update search value and also do the query to the API
    await searchFlickrAPI(val, dispatch, 1);
  }
  function handleDeleteSearchItem(val: string) {
    dispatch(deleteSearchItem(val));
  }
  return (
    <SafeAreaView>
      <SearchInput
        onSearch={handleSearch}
        value={searchState.search}
        clearValue={() => {
          dispatch(clearSearchTerm());
        }}
        showClear={true}
        showSubmit={true}
      />
      <FlatList
        data={searchState.oldSearches}
        renderItem={({item}) => (
          <SearchItem
            onTap={(val: string) => handleSearch(val)}
            searchText={item}
            onDelete={(val: string) => handleDeleteSearchItem(val)}
          />
        )}
        inverted={true}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
