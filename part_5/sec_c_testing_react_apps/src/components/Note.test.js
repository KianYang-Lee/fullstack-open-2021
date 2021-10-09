// Verifies that the component renders the contents of the note

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Note from './Note';
import { prettyDOM } from '@testing-library/dom';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  // Renders the component with render method provided by
  //  react-testing-library
  const component = render(
    <Note note={note} />
  );

  // // Print HTML rendered by the component to the console
  // component.debug();

  // // Only printing parts of the component
  const li = component.container.querySelector('li');
  console.log(prettyDOM(li));


  // Method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  // Method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  // Method 3
  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

// Clicking button in test
test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  // event handler is a mock function defined with Jest
  const mockHandler = jest.fn();

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  );

  // Button based on text from rendered component
  const button = component.getByText('make not important');
  fireEvent.click(button);

  // Mock function has been called exactly once
  expect(mockHandler.mock.calls).toHaveLength(1);
});