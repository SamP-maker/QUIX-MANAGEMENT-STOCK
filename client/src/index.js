import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Globalstyle} from './style/global/globalstyles';
import {ThemeProvider} from 'styled-components';
import Theme from './style/theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import injectGlobalStyles from './style/theme/injectTheme';
import store from '../src/redux/store';


injectGlobalStyles();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

     <Provider store={store}>
                  <ThemeProvider theme={Theme}>

                                     <Globalstyle/>
                                                <BrowserRouter>
                                                               <App />
                                                </BrowserRouter>

                  </ThemeProvider>
      </Provider>
);
