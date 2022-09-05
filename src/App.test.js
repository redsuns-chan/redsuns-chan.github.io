import { render, screen } from '@testing-library/react';
import App from './App';

test('showing my name', () => {
  render(<App />);
  const linkElement = screen.getByText(/RedSuns Chan/i);
  expect(linkElement).toBeInTheDocument();
});
