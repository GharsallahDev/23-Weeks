import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store/Store';
import Spinner from './views/spinner/Spinner';
import './_mockApis';
import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </React.StrictMode>,
);
