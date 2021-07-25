import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import InputSearch from './SearchInput'
afterEach(cleanup)

it('CheckboxWithLabel changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <InputSearch   onChange={(e) => console.log(e)} defaultSearch='default' placeholder='input search'/>,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});