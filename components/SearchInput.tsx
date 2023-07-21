import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../assets/styles/scale';

interface Props {
  onSearch: Function;
  placeholder?: string;
  onFocus?: any | undefined;
  value?: any | undefined;
}
const SearchInput: React.FC<Props> = ({
  onSearch,
  placeholder,
  onFocus,
  value,
}) => {
  useEffect(() => {
    setSearch(value);
    return () => {};
  }, [value]);
  const textInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const handleFocus = () => {
    textInputRef.current.focus();
  };
  function handleSearch(value: React.SetStateAction<string>) {
    setSearch(value);
  }
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        style={styles.searchViewContainer}
        onPress={handleFocus}>
        {/*<FontAwesomeIcon icon={faSearch} color={'#25C0FF'} size={22} />*/}
        <TextInput
          ref={textInputRef}
          style={styles.searchInput}
          value={search}
          onFocus={onFocus}
          placeholder={placeholder}
          onChangeText={value => handleSearch(value)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => onSearch(search)}>
        <Text style={{color: '#FFF'}}>{'GO'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
const styles = StyleSheet.create({
  searchViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CAF0F8',
    paddingHorizontal: horizontalScale(6),
    backgroundColor: '#CAF0F8',
    height: verticalScale(50),
    flexGrow: 3,
    borderRadius: horizontalScale(15),
  },
  searchInput: {
    flex: 1,
    marginLeft: horizontalScale(6),
    height: '100%',
    fontFamily: 'Inter',
    fontSize: fontScale(18),
    lineHeight: fontScale(16),
    color: '#000',
    paddingHorizontal: horizontalScale(16),
  },
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(10),
    gap: 5,
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  searchButton: {
    backgroundColor: '#03045E',
    height: verticalScale(50),
    width: horizontalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: horizontalScale(15),
  },
});
