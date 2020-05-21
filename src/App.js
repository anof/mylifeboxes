import React from 'react';
import MainLayout from './layout/MainLayout';
import {theme} from './style/theme';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeScreen from './components/HomeScreen';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MainLayout>
        <HomeScreen/>
      </MainLayout>
    </ThemeProvider>
  );
}

export default (App);
