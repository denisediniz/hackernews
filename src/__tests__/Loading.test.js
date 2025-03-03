import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Loading from '../components/Loading';

describe('Loading', () => {
  it('renders without crashing', () => {
    shallow(<Loading />);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(<Loading />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
