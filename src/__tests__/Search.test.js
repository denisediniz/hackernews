import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Search from '../components/Search';

describe('Search', () => {
  const props = {
    value: 'redux',
    onChange: () => {},
    onSubmit: () => {},
    children: 'redux'
  };

  it('renders without crashing', () => {
    shallow(<Search {...props}>Search</Search>);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(<Search {...props}>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
