import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

interface Props {
  searchText: string;
  onTap: Function;
  onDelete: Function;
}

const SearchItem: React.FC<Props> = ({searchText, onTap, onDelete}) => {
  return (
    <TouchableOpacity onPress={() => onTap(searchText)}>
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{searchText}</Text>
        <Pressable onPress={() => onDelete(searchText)}>
          <FontAwesomeIcon icon={faClose} color={'grey'} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
const styles = StyleSheet.create({
  containerStyle: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 20,
  },
});
