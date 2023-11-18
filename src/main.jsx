import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './/context/store.js';
import { PrimeReactProvider } from 'primereact/api';
import { locale, addLocale } from 'primereact/api';
import esLocale from './assets/es.json';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';  
import './styles/ComponentStyles.css';

addLocale('es', esLocale);
locale('es');

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
  </Provider>
)


