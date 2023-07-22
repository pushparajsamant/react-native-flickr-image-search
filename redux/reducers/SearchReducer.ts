import {createSlice} from '@reduxjs/toolkit';
import {searchFlikr} from '../../api/Search';
import {ImageType, PhotosState} from '../types';
import {AppDispatch} from '../store';

const initialState: PhotosState = {
  page: 1,
  pages: 0,
  perpage: 0,
  total: 0,
  photo: {} as ImageType[],
  error: undefined,
  search: '',
  oldSearches: {} as string[],
};

export const searchFlickrAPI = async (
  searchTerm: string,
  dispatch: AppDispatch,
  pageNumber: number,
) => {
  try {
    const flikrData = await searchFlikr(searchTerm, pageNumber);
    const {photos} = flikrData ?? {};
    if (pageNumber > 1) {
      // We are requesting the next page for load
      dispatch(getNextItems(photos));
    } else {
      //We are requesting a new search
      dispatch(searchNew({photoData: photos, search: searchTerm}));
    }
  } catch (e: any) {
    //console.log(e.message);
    dispatch(errored('Could not load data'));
  }
};
const Search = createSlice({
  name: 'SearchSlice',
  initialState: initialState,
  reducers: {
    searchNew: (state, action) => {
      const joinedOldSearches = Array.isArray(state.oldSearches)
        ? [...state.oldSearches, action.payload.search]
        : [action.payload.search];
      return {
        ...state,
        ...action.payload.photoData,
        ...{
          search: action.payload.search,
          oldSearches: [...new Set(joinedOldSearches)],
        },
        ...{error: ''},
      };
    },
    getNextItems: (state, action) => {
      const joinedPhotos = [...state.photo, ...action.payload.photo];
      console.log(joinedPhotos.length);
      return {
        ...state,
        ...action.payload,
        ...{photo: joinedPhotos},
        ...{error: ''},
      };
    },

    clearItems: () => initialState,
    clearSearchTerm: state => {
      //console.log('clearing search term');
      //When the search term is cleared we will clear the state except the oldSearches
      return {...initialState, ...{oldSearches: state.oldSearches}};
    },
    errored: (state, action) => {
      console.log(action.payload);
      return {...state, ...{error: action.payload}};
    },
    deleteSearchItem: (state, action) => {
      const oldSearches = state.oldSearches.filter(
        item => item !== action.payload,
      );
      return {
        ...state,
        ...{oldSearches: oldSearches},
      };
    },
  },
});

export const {
  searchNew,
  getNextItems,
  clearSearchTerm,
  clearItems,
  errored,
  deleteSearchItem,
} = Search.actions;

export default Search.reducer;
