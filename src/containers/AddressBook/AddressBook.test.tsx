import React from 'react';
import ReactDOM from 'react-dom';
import AddressBook from './AddressBook';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddressBook maxPage={10} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
