import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../assets/styles/scale';
import {faCircleXmark, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

interface Props {
  onSearch?: Function;
  placeholder?: string;
  onFocus?: any | undefined;
  value?: any | undefined;
  clearValue?: any | undefined;
  showClear?: boolean;
  showSubmit?: boolean;
}

const SearchInput: React.FC<Props> = ({
  onSearch,
  placeholder,
  onFocus,
  value,
  clearValue,
  showClear,
  showSubmit,
}) => {
  useEffect(() => {
    // This will ensure that the searched term is visible on both pages. Value is collected from the reducer by parent
    setSearch(value);
    //Focus on the input field only on the Search Screen
    if (onFocus === undefined) {
      handleFocus();
    }
    return () => {};
  }, [value, onFocus]);
  const textInputRef = useRef(null);
  const [search, setSearch] = useState('');
  const handleFocus = () => {
    textInputRef.current && textInputRef.current.focus();
  };
  function handleSearch(searchValue: React.SetStateAction<string>) {
    setSearch(searchValue);
  }
  function handleClearValue() {
    //Clears local value in state and also calls dispatch to clear in reducer
    setSearch('');
    clearValue();
  }

  return (
    <View style={styles.searchBar}>
      <View style={styles.searchViewContainer}>
        <FontAwesomeIcon icon={faSearch} color={'#25C0FF'} size={22} />
        <TextInput
          ref={textInputRef}
          style={styles.searchInput}
          value={search}
          onFocus={onFocus}
          autoCorrect={false}
          placeholder={placeholder}
          onChangeText={searchValue => handleSearch(searchValue)}
        />
        {showClear && search.length > 0 && (
          <TouchableOpacity onPress={() => handleClearValue()}>
            <FontAwesomeIcon icon={faCircleXmark} color={'grey'} />
          </TouchableOpacity>
        )}
      </View>
      {showSubmit && (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            if (search.length > 3) {
              onSearch && onSearch(search);
            }
          }}>
          <FontAwesomeIcon icon={faSearch} color={'#03045E'} size={22} />
        </TouchableOpacity>
      )}
    </View>
  );
};
SearchInput.defaultProps = {
  placeholder: 'Search',
  showClear: false,
  showSubmit: false,
  onSearch: () => {},
};
export default SearchInput;
const styles = StyleSheet.create({
  searchViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CAF0F8',
    paddingHorizontal: horizontalScale(10),
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
    fontSize: fontScale(16),
    lineHeight: fontScale(18),
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
    height: verticalScale(50),
    width: horizontalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
