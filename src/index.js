import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './ducks/store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#56c7d6',
        main: '#0096a5',
        dark: '#006876',
        contrastText: '#000',
      },
      secondary: {
        light: '#f05545',
        main: '#b71c1c',
        dark: '#7f0000',
        contrastText: '#fff',
      },
    },
  });

ReactDOM.render(
<MuiThemeProvider theme = {theme}>
    <Provider store = {store}>
        <App />
    </Provider>
</MuiThemeProvider>
, document.getElementById('root'));
// registerServiceWorker();
