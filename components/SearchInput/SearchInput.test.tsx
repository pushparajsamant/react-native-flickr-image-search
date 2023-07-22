import React from 'react';
import renderer from 'react-test-renderer';
import SearchInput from './SearchInput';
jest.mock('react-native-device-info', () => {
  return {
    hasNotch: () => true,
  };
});
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
test('Search Input Component renders correctly with close and submit button', () => {
  const tree = renderer
    .create(
      <SearchInput
        onSearch={() => {}}
        showClear={true}
        showSubmit={true}
        value={''}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test('Search Input Component renders correctly without close and submit button', () => {
  const tree = renderer
    .create(
      <SearchInput
        onSearch={() => {}}
        showClear={false}
        showSubmit={false}
        value={''}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
test('Search Input Component renders correctly with placeholder', () => {
  const tree = renderer
    .create(
      <SearchInput
        onSearch={() => {}}
        placeholder={'Search Text'}
        value={''}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
