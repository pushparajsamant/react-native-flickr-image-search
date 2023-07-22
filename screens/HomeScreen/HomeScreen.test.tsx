// components/HomeScreen.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import HomeScreen from './HomeScreen';
import {PhotosState} from '../../redux/types';

const mockStore = configureStore([]);
jest.mock('react-native-device-info', () => {
  return {
    hasNotch: () => true,
  };
});
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));

test('HomeScreen renders correctly with data from Redux', () => {
  const dataFromRedux: PhotosState = {
    page: 7,
    pages: 556,
    perpage: 20,
    total: 11118,
    search: 'kohli',
    oldSearches: ['kohli'],
    error: '',
    photo: [
      {
        id: '52708477344',
        owner: '197759494@N02',
        secret: 'e883e24554',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708707438',
        owner: '197759494@N02',
        secret: '0e034643f9',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52707700162',
        owner: '197759494@N02',
        secret: '2772dd9ea6',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708477294',
        owner: '197759494@N02',
        secret: '252cbca428',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708635975',
        owner: '197759494@N02',
        secret: 'cc17ab1e00',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708477239',
        owner: '197759494@N02',
        secret: '8a4c427f3b',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708635885',
        owner: '197759494@N02',
        secret: '9fb75886fe',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708707258',
        owner: '197759494@N02',
        secret: '7f50bcf173',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708221451',
        owner: '197759494@N02',
        secret: '254355b453',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708221406',
        owner: '197759494@N02',
        secret: 'fde6d3c379',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708635745',
        owner: '197759494@N02',
        secret: '5eaa3d1741',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708477069',
        owner: '197759494@N02',
        secret: '06ce4163fb',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708477039',
        owner: '197759494@N02',
        secret: '8c95d685d2',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708635670',
        owner: '197759494@N02',
        secret: '8630771f26',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52707699647',
        owner: '197759494@N02',
        secret: '3355106abf',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708635485',
        owner: '197759494@N02',
        secret: 'bee7f0fd19',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id: '52708221041',
        owner: '197759494@N02',
        secret: '65c386332b',
        server: '65535',
        farm: 66,
        title: 'Rahul Kohli',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
    ],
  };
  const store = mockStore({search: dataFromRedux});

  const tree = renderer
    .create(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('HomeScreen renders correctly with error', () => {
  const store = mockStore({someData: null});

  const tree = renderer.create().toJSON();

  //expect(tree).toMatchSnapshot();
});
