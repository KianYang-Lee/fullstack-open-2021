import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  // This gets call before each test
  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    );
  });

  // Verify Togglable component renders its child component
  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined();
  });

  // Verify child component of Togglable is not visible initially
  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  // Verify the child component is visible after the button is pressed
  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    // Or this works too
    // const button = component.container.querySelector('button')
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  // Verify visible content can be hidden by clicking second button of component
  test('toggled content can be close', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    // // But this is not advisable to search button by order, instead
    // //  best to find elements based on their text
    // const closeButton = component.container.querySelector(
    //   'button:nth-child(2)'
    // );
    const closeButton = component.getByText('cancel');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});