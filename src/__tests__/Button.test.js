import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../components/Button';

describe('Button', () => {
  it('renders without crashing', () => {
    shallow(<Button onClick={() => {}}>Dismiss</Button>);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(
      <Button onClick={() => {}}>Dismiss</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders children when passed in', () => {
    const element = shallow(<Button onClick={() => {}}>Done</Button>);
    expect(element.text()).toBe('Done');
  });
});
