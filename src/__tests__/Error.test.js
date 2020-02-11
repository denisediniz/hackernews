import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Error from '../components/Error';

describe('Error', () => {
  it('renders without crashing', () => {
    shallow(<Error />);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(<Error />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
