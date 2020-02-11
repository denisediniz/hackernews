import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Table from '../components/Table';

describe('Table', () => {
  const props = {
    onDismiss: () => {},
    list: [
      {
        title: 'Build Yourself a Redux',
        url: 'https://zapier.com/engineering/how-to-build-redux/',
        author: 'jdeal',
        num_comments: 155,
        points: 395,
        objectID: '14273549'
      },
      {
        title: 'Things to learn in React before using Redux',
        url: 'https://www.robinwieruch.de/learn-react-before-using-redux/',
        author: 'callumlocke',
        num_comments: 104,
        points: 370,
        objectID: '14811577'
      }
    ],
    sortKey: 'TITLE',
    isSortReverse: false
  };

  it('renders without crashing', () => {
    shallow(<Table {...props} />);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two itens in list', () => {
    const element = shallow(<Table {...props} />);
    expect(element.find('article').length).toBe(2);
  });
});
