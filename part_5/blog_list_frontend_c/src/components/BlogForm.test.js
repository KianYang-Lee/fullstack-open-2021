import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

// 5.16 Step 4
test('Form calls event handler with right params when a new blog is created', () => {
  const mockHandler = jest.fn();

  const component = render(
    <BlogForm createBlog={mockHandler} />
  );

  component.debug();
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');


  const form = component.container.querySelector('form');
  fireEvent.change(title, {
    target: { value: 'This is blog title' }
  });
  fireEvent.change(author, {
    target: { value: 'This is blog author' }
  });
  fireEvent.change(url, {
    target: { value: 'This is blog url' }
  });
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe('This is blog title');
  expect(mockHandler.mock.calls[0][0].author).toBe('This is blog author');
  expect(mockHandler.mock.calls[0][0].url).toBe('This is blog url');
});