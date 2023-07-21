/**
 * @format
 */

import 'react-native';
import React from 'react';
import thunk from 'redux-thunk';
import searchReducer, {
  searchNew,
  getNextItems,
  searchFlickrAPI,
  errored,
  deleteSearchItem,
  clearSearchTerm,
} from '../redux/reducers/SearchReducer';
import {searchFlikr} from '../api/Search';
import App from '../App';
import configureStore from 'redux-mock-store';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {ImageType} from '../redux/types';

jest.mock('react-native-device-info', () => {
  return {
    hasNotch: () => true,
  };
});
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
jest.mock('../api/Search.ts', () => ({
  searchFlikr: jest.fn(),
}));

it('searchFlickrAPI should dispatch searchNew when sent pageNumber 1', async () => {
  const mockResults = {
    photoData: undefined,
    search: 'example',
  };

  // Mock the API response
  searchFlikr.mockResolvedValueOnce(mockResults);

  const store = mockStore({});

  await searchFlickrAPI('example', store.dispatch, 1);

  const actions = store.getActions();
  expect(actions[0]).toEqual(searchNew(mockResults));
});
it('searchFlickrAPI should dispatch getNextItems when sent pageNumber > 1', async () => {
  const mockResults = undefined;

  // Mock the API response
  searchFlikr.mockResolvedValueOnce(mockResults);

  const store = mockStore({});

  await searchFlickrAPI('example', store.dispatch, 2);

  const actions = store.getActions();
  expect(actions[0]).toEqual(getNextItems(mockResults));
});
it('should handle API request failure', async () => {
  const mockResults = 'Could not load data';

  // Mock the API response
  searchFlikr.mockRejectedValue(mockResults);

  const store = mockStore({});

  await searchFlickrAPI('example', store.dispatch, 2);

  const actions = store.getActions();
  expect(actions[0]).toEqual(errored(mockResults));
});
it('should handle adding search item', () => {
  const initialState = {
    page: 1,
    pages: 0,
    perpage: 0,
    total: 0,
    photo: {} as ImageType[],
    error: undefined,
    search: '',
    oldSearches: {} as string[],
  };
  const action = searchNew({photoData: undefined, search: 'example'});
  const newState = searchReducer(initialState, action);
  expect(newState.oldSearches).toEqual(['example']);
});
it('should handle deleting search item', () => {
  const initialState = {
    page: 1,
    pages: 0,
    perpage: 0,
    total: 0,
    photo: {} as ImageType[],
    error: undefined,
    search: '',
    oldSearches: ['example'],
  };
  const action = deleteSearchItem('example');
  const newState = searchReducer(initialState, action);
  expect(newState.oldSearches).toEqual([]);
});
it('should clear search item but keep history', () => {
  const initialState = {
    page: 1,
    pages: 0,
    perpage: 0,
    total: 0,
    photo: {} as ImageType[],
    error: undefined,
    search: 'example1',
    oldSearches: ['example2', 'example3'],
  };
  const action = clearSearchTerm();
  const newState = searchReducer(initialState, action);
  expect(newState.oldSearches).toEqual(['example2', 'example3']);
  expect(newState.search).toEqual('');
});
it('renders correctly', () => {
  renderer.create(<App />);
});
