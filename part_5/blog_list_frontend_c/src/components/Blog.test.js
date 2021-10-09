// 5.13 Step 1: Check component display a blog renders blog's
//  title and author, but does not render
//  its url or number of likes by default
import Blog from './Blog';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

describe('<Blog />', () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: 'Lee Kian Yang is Good',
      author: 'Lee Kian Yang',
      url: 'www.abd.com',
      likes: 0,
      user: {
        name: 'Author',
        username: 'kylee',
        id: '123'
      }
    };

    const currentSessionUser = {
      username: 'kylee'
    };

    mockHandler = jest.fn();

    component = render(
      <Blog blog={blog} addLike={mockHandler} currentSessionUser={currentSessionUser}>
        <div></div>
      </Blog>
    );
  });

  test('renders default content', () => {
    const div = component.container.querySelector('.blog');

    // Need to have blog author and title
    expect(div).toHaveTextContent(
      // 'Lee Kian Yang is Good', 'Lee Kian Yang'
      'Lee Kian Yang is Good',
      'Author'
    );

    // Not have blog likes and url
    expect(div).not.toHaveTextContent(
      0,
      'www.abd.com'
    );
    expect(component.container.querySelector('.togglableBlogDetails')).toHaveStyle('display: none');
  });

  // 5.14 Step 2: Show url and likes when button is clicked
  test('clicking the button calls event handler and displays url and likes', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    const div = component.container.querySelector('.togglableBlogDetails');
    expect(div).not.toHaveStyle('display: none');
    expect(div).toHaveTextContent('www.abd.com', 0);
  });

  // 5.15 Step 3: If like button is clicked twice, event handler is called twice
  test('clicken like button twice calls event handler twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
