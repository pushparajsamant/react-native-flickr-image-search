import {createSlice} from '@reduxjs/toolkit';
import store, {AppDispatch} from '../store';
import axios from 'axios';

export interface ImageType {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface PhotosState {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: [ImageType];
  error: string | undefined;
  search: string;
}
interface PhotosResponse {
  photos: PhotosState;
  stat: string;
}
const initialState: PhotosState = {
  page: 1,
  pages: 0,
  perpage: 0,
  total: 0,
  photo: {} as [ImageType],
  error: undefined,
  search: '',
};

export const searchFlickrAPI = async (
  searchTerm: string,
  dispatch: AppDispatch,
  nextPage: boolean,
) => {
  try {
    let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=11c40ef31e4961acf4f98c8ff4e945d7&format=json&nojsoncallback=1&text=${searchTerm}&per_page=20`;
    let pageNumber = store.getState().search.page;
    if (nextPage) {
      pageNumber++;
    }
    url += `&page=${pageNumber}`;
    console.log(url);
    //TODO: Move API call to API folder
    const response = await axios.get<PhotosResponse>(url);
    if (response.data.stat === 'ok') {
      if (nextPage) {
        dispatch(getNextItems(response.data.photos));
      } else {
        dispatch(
          searchNew({photoData: response.data.photos, search: searchTerm}),
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
};
const Search = createSlice({
  name: 'SearchSlice',
  initialState: initialState,
  reducers: {
    searchNew: (state, action) => {
      return {
        ...state,
        ...action.payload.photoData,
        ...{search: action.payload.search},
      };
    },
    getNextItems: (state, action) => {
      const joinedPhotos = [...state.photo, ...action.payload.photo];
      console.log(joinedPhotos.length);
      return {...state, ...action.payload, ...{photo: joinedPhotos}};
    },
    clearItems: () => initialState,
    errored: (state, action) => {
      return {...state, ...{error: action.payload}};
    },
  },
});

export const {searchNew, getNextItems, clearItems} = Search.actions;

export default Search.reducer;
