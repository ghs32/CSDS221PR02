import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(linkElement).toBeInTheDocument();
});

class bob extends React.component{
  constructor(props) {
    super(props);
    state = {
      date: new Date()
    };
  }
}