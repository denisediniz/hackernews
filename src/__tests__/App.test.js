import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App, {
  updateSearchTopStoriesState,
  updateResultsStateOnDismiss
} from '../components/App';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('updateSearchTopStoriesState', () => {
  const firstReduxHits = [
    {
      title: 'Build Yourself a Redux',
      url: 'https://zapier.com/engineering/how-to-build-redux/',
      author: 'jdeal',
      num_comments: 155,
      points: 395,
      objectID: '14273549'
    }
  ];

  const secondReduxHits = [
    {
      title: 'Things to learn in React before using Redux',
      url: 'https://www.robinwieruch.de/learn-react-before-using-redux/',
      author: 'callumlocke',
      num_comments: 104,
      points: 370,
      objectID: '14811577'
    }
  ];

  const firstReactHits = [
    {
      title: 'Relicensing React, Jest, Flow, and Immutable.js',
      url: 'https://code.facebook.com/posts/300798627056246',
      author: 'dwwoelfel',
      num_comments: 498,
      points: 2280,
      objectID: '15316175'
    }
  ];

  const firstPrevState = {
    searchKey: 'redux',
    results: null
  };

  const secondPrevState = {
    searchKey: 'redux',
    results: {
      redux: {
        hits: [...firstReduxHits],
        page: 0
      }
    }
  };

  const thirdPrevState = {
    searchKey: 'react',
    results: {
      redux: {
        hits: [...firstReduxHits, ...secondReduxHits],
        page: 1
      }
    }
  };

  const firstReduxResult = {
    results: {
      redux: {
        hits: [...firstReduxHits],
        page: 0
      }
    },
    isLoading: false
  };

  const secondReduxResult = {
    results: {
      redux: {
        hits: [...firstReduxHits, ...secondReduxHits],
        page: 1
      }
    },
    isLoading: false
  };

  const firstMixedResult = {
    results: {
      redux: {
        hits: [...firstReduxHits, ...secondReduxHits],
        page: 1
      },
      react: {
        hits: [...firstReactHits],
        page: 0
      }
    },
    isLoading: false
  };

  it('updates the state correctly with null previous results', () => {
    const returnFn = updateSearchTopStoriesState(
      firstReduxHits,
      0
    )(firstPrevState);

    expect(returnFn).toEqual(firstReduxResult);
  });

  it('updates the state correctly with some previous results for the same term', () => {
    const returnFn = updateSearchTopStoriesState(
      secondReduxHits,
      1
    )(secondPrevState);

    expect(returnFn).toEqual(secondReduxResult);
  });

  it('updates the state correctly with some previous results for a different term', () => {
    const returnFn = updateSearchTopStoriesState(
      firstReactHits,
      0
    )(thirdPrevState);

    expect(returnFn).toEqual(firstMixedResult);
  });
});

describe('updateResultsStateOnDismiss', () => {
  const hits = [
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
  ];

  const searchKey = 'redux';

  const prevState = {
    searchKey,
    results: {
      [searchKey]: {
        hits
      }
    }
  };

  it('matches if the hits array does not contain the removed element', () => {
    const dismissFn = updateResultsStateOnDismiss('14811577')(prevState);

    expect(dismissFn.results.redux.hits).toEqual(
      expect.not.objectContaining(hits[1])
    );
  });
});
