import { render, screen } from '@testing-library/react';
import LightButton from './components/LightButton/LightButton'
import SkillTag from './components/SkillTag/SkillTag'

test('light button', () => {
  render(<LightButton>Test Button</LightButton>);
  const linkElement = screen.getByText(/Test Button/i);
  expect(linkElement).toBeInTheDocument();
});

test('skill tag', () => {
  render(<SkillTag>Test</SkillTag>);
  const linkElement = screen.getByText(/#Test/i);
  expect(linkElement).toBeInTheDocument();
});
