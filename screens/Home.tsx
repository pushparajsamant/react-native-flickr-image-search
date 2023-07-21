import React, {useState} from 'react';
import {searchFlickrAPI} from '../redux/reducers/SearchReducer';
import {NavigationProp} from '@react-navigation/native';
import {RootState, useAppDispatch} from '../redux/store';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';
import Tile from '../components/Tile';
import SearchInput from '../components/SearchInput';
import {StackNavigatorParams} from '../navigation/MainNavigation';

interface Props {
  navigation: NavigationProp<StackNavigatorParams>;
}
const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  //const [photoList, setPhotoList] = useState([]);
  const searchState = useSelector((state: RootState) => state.search);
  //const [search, setSearch] = useState('');
  const handleSearch = async (val: string) => {
    //setSearch(val);
    await searchFlickrAPI(val, dispatch, false);
  };

  function openSearchPage() {
    //Navigate to search page to show previous searches
    navigation.navigate('Search');
  }

  return (
    <SafeAreaView>
      <SearchInput
        onSearch={(val: string) => handleSearch(val)}
        onFocus={() => openSearchPage()}
        value={searchState.search}
      />
      <FlatList
        data={searchState.photo}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Tile item={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => searchFlickrAPI('test', dispatch, true)}
      />
      {/*<Button*/}
      {/*  title={'click'}*/}
      {/*  onPress={() => searchFlickrAPI('test', dispatch, true)}*/}
      {/*/>*/}
    </SafeAreaView>
  );
};
export default Home;
