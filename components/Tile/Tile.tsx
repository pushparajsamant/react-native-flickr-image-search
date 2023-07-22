import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/styles/scale';
import {ImageType} from '../../redux/types';
interface Props {
  item: ImageType;
}
const Tile: React.FC<Props> = ({item}) => {
  const imageURI = `https://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
  //console.log(imageURI);
  return <Image source={{uri: imageURI}} style={styles.image} />;
};
export default Tile;
const styles = StyleSheet.create({
  image: {
    height: 100,
    width: '48%',
    margin: horizontalScale(4),
  },
});
