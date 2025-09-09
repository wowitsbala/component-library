import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../src/Button';

test('renders button with label', () => {
  render(<Button label="Click me" />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});