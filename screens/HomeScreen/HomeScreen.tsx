import React from 'react';
import {searchFlickrAPI} from '../../redux/reducers/SearchReducer';
import {NavigationProp} from '@react-navigation/native';
import {RootState, useAppDispatch} from '../../redux/store';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Tile from '../../components/Tile/Tile';
import SearchInput from '../../components/SearchInput/SearchInput';
import {StackNavigatorParams} from '../../navigation/MainNavigation';

interface Props {
  navigation?: NavigationProp<StackNavigatorParams>;
}
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const searchState = useSelector((state: RootState) => state.search);
  function openSearchPage() {
    //Navigate to search page to show previous searches
    navigation && navigation.navigate('SearchScreen');
  }

  return (
    <SafeAreaView>
      <SearchInput
        onFocus={() => openSearchPage()}
        value={searchState.search}
      />
      {searchState.error !== '' && searchState.error !== undefined ? (
        <View style={styles.error}>
          <Text>{'Error'}</Text>
        </View>
      ) : (
        <FlatList
          data={searchState.photo}
          //This makes the flat list 2 columned
          numColumns={2}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({item}) => <Tile item={item} />}
          onEndReachedThreshold={0.5}
          //Calling reducer function here to trigger infinite loading
          onEndReached={async () => {
            await searchFlickrAPI(
              searchState.search,
              dispatch,
              searchState.page + 1,
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  error: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
