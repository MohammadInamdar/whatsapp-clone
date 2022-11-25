import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reducer from './Reducer';
import { StateProvider } from './StateProvider';
import { initialState } from './Reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <StateProvider initialState={initialState} reducer={reducer}>
     <App />
   </StateProvider>
  </React.StrictMode>
);

