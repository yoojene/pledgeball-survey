import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import Button from '@mui/material/Button/Button';
import Footer from './components/Footer/Footer';
import Survey from './components/Survey/Survey';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/survey-one',
    element: (
      <div className="App">
        <Header></Header>
        <h1>First page</h1>

        <Footer route={'/survey-two'} title={'Next'}></Footer>
      </div>
    ),
  },
  {
    path: '/survey-two',
    element: (
      <div className="App">
        <Header></Header>
        <h1>second page</h1>
        <Footer route={'/survey-three'} title={'Next'}></Footer>
      </div>
    ),
  },
  {
    path: '/survey-three',
    element: (
      <div className="App">
        <Header></Header>
        <h1>third page</h1>
        <Footer route={'/finish'} title={'Finish'}></Footer>
      </div>
    ),
  },
  {
    path: '/finish',
    element: (
      <div className="App">
        <Header></Header>
        <h1>All Done</h1>
        <Footer route={'/'} title={'Start Again?'}></Footer>
      </div>
    ),
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
