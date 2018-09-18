import React from 'react';
import ReactDOM from 'react-dom';
import BoardSquare from './boardSquare';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BoardSquare />, div);
  ReactDOM.unmountComponentAtNode(div);
});
